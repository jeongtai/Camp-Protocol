// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.7.5;

import '../Uniswap/TransferHelper.sol';
import "../CAMP.sol";
import "../SCAMP.sol";
import "../Oracle/UniswapPairOracle.sol";
import "./SCAMPPoolLibrary.sol";
import "../Owned.sol";
import "../module/ERC20/ERC20.sol";
import "../../bond/library/SafeMath.sol";
import "../Oracle/AssetOracle.sol";


contract SCAMPBank is Owned {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */

    ERC20 private collateral_token;
    address private collateral_address;

    address private SCAMP_contract_address;
    address private CAMP_contract_address;
    CAMP private _CAMP;
    SCAMP private _SCAMP;

    AssetOracle private _assetOracle;
    address public collat_klay_oracle_address;
    address private klay_address;

    uint256 public minting_fee;
    uint256 public redemption_fee;
    uint256 public buyback_fee;
    uint256 public recollat_fee;

    mapping (address => uint256) public redeemCAMPBalances;
    mapping (address => uint256) public redeemCollateralBalances;
    uint256 public unclaimedPoolCollateral;
    uint256 public unclaimedPoolCAMP;
    mapping (address => uint256) public lastRedeemed;

    // Constants for various precisions
    uint256 private constant PRICE_PRECISION = 1e6;
    uint256 private constant COLLATERAL_RATIO_PRECISION = 1e6;
    uint256 private constant COLLATERAL_RATIO_MAX = 1e6;

    // Number of decimals needed to get to 18
    uint256 private immutable missing_decimals;
    
    // Pool_ceiling is the total units of collateral that a pool contract can hold
    uint256 public pool_ceiling = 1000000e18;

    // Stores price of the collateral, if price is paused
    uint256 public pausedPrice = 0;

    // Bonus rate on CAMP minted during recollateralizeSCAMP(); 6 decimals of precision, set to 0.75% on genesis
    uint256 public bonus_rate = 7500;

    // Number of blocks to wait before being able to collectRedemption()
    uint256 public redemption_delay = 1;
    
    // AccessControl state variables
    bool public mintPaused = false;
    bool public redeemPaused = false;

    /* ========== MODIFIERS ========== */


    modifier notRedeemPaused() {
        require(redeemPaused == false, "Redeeming is paused");
        _;
    }

    modifier notMintPaused() {
        require(mintPaused == false, "Minting is paused");
        _;
    }
 
    /* ========== CONSTRUCTOR ========== */
    
    constructor (
        address _SCAMP_contract_address,
        address _CAMP_contract_address,
        address _collateral_address,
        address _creator_address,
        address _oracle
    ) Owned(_creator_address){
        require(
            (_SCAMP_contract_address != address(0))
            && (_CAMP_contract_address != address(0))
            && (_collateral_address != address(0))
            && (_creator_address != address(0))
        , "Zero address detected"); 
        _SCAMP = SCAMP(_SCAMP_contract_address);
        _CAMP = CAMP(_CAMP_contract_address);
        SCAMP_contract_address = _SCAMP_contract_address;
        CAMP_contract_address = _CAMP_contract_address;
        collateral_address = _collateral_address;
        collateral_token = ERC20(_collateral_address);
        missing_decimals = uint(18).sub(collateral_token.decimals());
        _assetOracle = AssetOracle(_oracle);
    }

    /* ========== VIEWS ========== */
    
    // Returns dollar value of collateral held in this SCAMP pool
    
    function collatDollarBalance() public view returns (uint256) {
      return (collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral)).mul(10 ** missing_decimals);//.div(PRICE_PRECISION);
    } 


    // Returns the value of excess collateral held in this SCAMP pool, compared to what is needed to maintain the global collateral ratio
    function availableExcessCollatDV() public view returns (uint256) {
        uint256 total_supply = _SCAMP.totalSupply();
        uint256 cur_collateral_ratio = _SCAMP.current_collateral_ratio();
        uint256 collat_value = collatDollarBalance();

        if (cur_collateral_ratio > COLLATERAL_RATIO_PRECISION) cur_collateral_ratio = COLLATERAL_RATIO_PRECISION; // Handles an overcollateralized contract with CR > 1
        uint256 required_collat_dollar_value_d18 = (total_supply.mul(cur_collateral_ratio)).div(COLLATERAL_RATIO_PRECISION); // Calculates collateral needed to back each 1 SCAMP with $1 of collateral at current collat ratio
        if (collat_value > required_collat_dollar_value_d18) return collat_value.sub(required_collat_dollar_value_d18);
        else return 0;
    }

    /* ========== PUBLIC FUNCTIONS ========== */
    
    // Returns the price of the pool collateral in USD
    function getCollateralPrice() public pure returns (uint256) {
        // uint256 eth_usd_price = _SCAMP.KLAY_usdt_price();
        // return eth_usd_price.mul(PRICE_PRECISION).div(collatKlayOracle.consult(klay_address, PRICE_PRECISION * (10 ** missing_decimals)));
        return 1000000;
    }

    // function setcollatKlayOracle(address _collateral_klay_oracle_address, address _klay_address) external onlyOwner {
    //     collat_klay_oracle_address = _collateral_klay_oracle_address;
    //     collatKlayOracle = UniswapPairOracle(_collateral_klay_oracle_address);
    //     klay_address = _klay_address;
    // }

    // We separate out the 1t1, fractional and algorithmic minting functions for gas efficiency 
    function mint1t1SCAMP(uint256 collateral_amount, uint256 SCAMP_out_min) external notMintPaused {
        uint256 collateral_amount_d18 = collateral_amount * (10 ** missing_decimals);

        require(_SCAMP.current_collateral_ratio() >= COLLATERAL_RATIO_MAX, "Collateral ratio must be >= 1");
        require((collateral_token.balanceOf(address(this))).sub(unclaimedPoolCollateral).add(collateral_amount) <= pool_ceiling, "[Pool's Closed]: Ceiling reached");
        
        (uint256 SCAMP_amount_d18) = SCAMPPoolLibrary.calcMint1t1SCAMP(
            getCollateralPrice(),
            collateral_amount_d18
        ); //1 SCAMP for each $1 worth of collateral

        SCAMP_amount_d18 = (SCAMP_amount_d18.mul(uint(1e6).sub(minting_fee))).div(1e6); //remove precision at the end
        require(SCAMP_out_min <= SCAMP_amount_d18, "Slippage limit reached");

        TransferHelper.safeTransferFrom(address(collateral_token), msg.sender, address(this), collateral_amount);
        _SCAMP.Bank_mint(msg.sender, SCAMP_amount_d18);
    }

    // 0% collateral-backed
    function mintAlgorithmicSCAMP(uint256 CAMP_amount_d18, uint256 SCAMP_out_min) external notMintPaused {
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
        require(_SCAMP.current_collateral_ratio() == 0, "Collateral ratio must be 0");
        
        (uint256 SCAMP_amount_d18) = SCAMPPoolLibrary.calcMintAlgorithmicSCAMP(
            CAMP_price, // X CAMP / 1 USD
            CAMP_amount_d18
        );

        SCAMP_amount_d18 = (SCAMP_amount_d18.mul(uint(1e6).sub(minting_fee))).div(1e6);
        require(SCAMP_out_min <= SCAMP_amount_d18, "Slippage limit reached");

        _CAMP.Bank_burn_from(msg.sender, CAMP_amount_d18);
        _SCAMP.Bank_mint(msg.sender, SCAMP_amount_d18);
    }

    // Will fail if fully collateralized or fully algorithmic
    // > 0% and < 100% collateral-backed
    function mintFractionalSCAMP(uint256 collateral_amount, uint256 CAMP_amount, uint256 SCAMP_out_min) external notMintPaused {
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
        uint256 current_collateral_ratio = _SCAMP.current_collateral_ratio();

        require(current_collateral_ratio < COLLATERAL_RATIO_MAX && current_collateral_ratio > 0, "Collateral ratio needs to be between .000001 and .999999");
        require(collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral).add(collateral_amount) <= pool_ceiling, "Pool ceiling reached, no more SCAMP can be minted with this collateral");

        uint256 collateral_amount_d18 = collateral_amount * (10 ** missing_decimals);
        SCAMPPoolLibrary.MintFF_Params memory input_params = SCAMPPoolLibrary.MintFF_Params(
            _assetOracle.getAssetPrice(CAMP_contract_address),
            getCollateralPrice(),
            CAMP_amount,
            collateral_amount_d18,
            current_collateral_ratio
        );

        (uint256 mint_amount, uint256 CAMP_needed) = SCAMPPoolLibrary.calcMintFractionalSCAMP(input_params);

        mint_amount = (mint_amount.mul(uint(1e6).sub(minting_fee))).div(1e6);
        require(SCAMP_out_min <= mint_amount, "Slippage limit reached");
        require(CAMP_needed <= CAMP_amount, "Not enough CAMP inputted");

        _CAMP.Bank_burn_from(msg.sender, CAMP_needed);
        TransferHelper.safeTransferFrom(address(collateral_token), msg.sender, address(this), collateral_amount);
        _SCAMP.Bank_mint(msg.sender, mint_amount);
    }

    // Redeem collateral. 100% collateral-backed
    function redeem1t1SCAMP(uint256 SCAMP_amount, uint256 COLLATERAL_out_min) external notRedeemPaused {
        require(_SCAMP.current_collateral_ratio() == COLLATERAL_RATIO_MAX, "Collateral ratio must be == 1");

        // Need to adjust for decimals of collateral
        uint256 SCAMP_amount_precision = SCAMP_amount.div(10 ** missing_decimals);
        (uint256 collateral_needed) = SCAMPPoolLibrary.calcRedeem1t1SCAMP(
            getCollateralPrice(),
            SCAMP_amount_precision
        );

        collateral_needed = (collateral_needed.mul(uint(1e6).sub(redemption_fee))).div(1e6);
        require(collateral_needed <= collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral), "Not enough collateral in pool");
        require(COLLATERAL_out_min <= collateral_needed, "Slippage limit reached");

        redeemCollateralBalances[msg.sender] = redeemCollateralBalances[msg.sender].add(collateral_needed);
        unclaimedPoolCollateral = unclaimedPoolCollateral.add(collateral_needed);
        lastRedeemed[msg.sender] = block.number;
        
        // Move all external functions to the end
        _SCAMP.Bank_burn_from(msg.sender, SCAMP_amount);
    }

    // Will fail if fully collateralized or algorithmic
    // Redeem SCAMP for collateral and CAMP. > 0% and < 100% collateral-backed
    function redeemFractionalSCAMP(uint256 SCAMP_amount, uint256 CAMP_out_min, uint256 COLLATERAL_out_min) external notRedeemPaused {
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
        uint256 current_collateral_ratio = _SCAMP.current_collateral_ratio();

        require(current_collateral_ratio < COLLATERAL_RATIO_MAX && current_collateral_ratio > 0, "Collateral ratio needs to be between .000001 and .999999");
        uint256 col_price_usd = getCollateralPrice();

        uint256 SCAMP_amount_post_fee = (SCAMP_amount.mul(uint(1e6).sub(redemption_fee))).div(PRICE_PRECISION);

        uint256 CAMP_dollar_value_d18 = SCAMP_amount_post_fee.sub(SCAMP_amount_post_fee.mul(current_collateral_ratio).div(PRICE_PRECISION));
        uint256 CAMP_amount = CAMP_dollar_value_d18.mul(PRICE_PRECISION).div(CAMP_price);

        // Need to adjust for decimals of collateral
        uint256 SCAMP_amount_precision = SCAMP_amount_post_fee.div(10 ** missing_decimals);
        uint256 collateral_dollar_value = SCAMP_amount_precision.mul(current_collateral_ratio).div(PRICE_PRECISION);
        uint256 collateral_amount = collateral_dollar_value.mul(PRICE_PRECISION).div(col_price_usd);


        require(collateral_amount <= collateral_token.balanceOf(address(this)).sub(unclaimedPoolCollateral), "Not enough collateral in pool");
        require(COLLATERAL_out_min <= collateral_amount, "Slippage limit reached [collateral]");
        require(CAMP_out_min <= CAMP_amount, "Slippage limit reached [CAMP]");

        redeemCollateralBalances[msg.sender] = redeemCollateralBalances[msg.sender].add(collateral_amount);
        unclaimedPoolCollateral = unclaimedPoolCollateral.add(collateral_amount);

        redeemCAMPBalances[msg.sender] = redeemCAMPBalances[msg.sender].add(CAMP_amount);
        unclaimedPoolCAMP = unclaimedPoolCAMP.add(CAMP_amount);

        lastRedeemed[msg.sender] = block.number;
        
        // Move all external functions to the end
        _SCAMP.Bank_burn_from(msg.sender, SCAMP_amount);
        _CAMP.Bank_mint(address(this), CAMP_amount);
    }

    // Redeem SCAMP for CAMP. 0% collateral-backed
    function redeemAlgorithmicSCAMP(uint256 SCAMP_amount, uint256 CAMP_out_min) external notRedeemPaused {
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
        uint256 current_collateral_ratio = _SCAMP.current_collateral_ratio();

        require(current_collateral_ratio == 0, "Collateral ratio must be 0"); 
        uint256 CAMP_dollar_value_d18 = SCAMP_amount;

        CAMP_dollar_value_d18 = (CAMP_dollar_value_d18.mul(uint(1e6).sub(redemption_fee))).div(PRICE_PRECISION); //apply fees

        uint256 CAMP_amount = CAMP_dollar_value_d18.mul(PRICE_PRECISION).div(CAMP_price);
        
        redeemCAMPBalances[msg.sender] = redeemCAMPBalances[msg.sender].add(CAMP_amount);
        unclaimedPoolCAMP = unclaimedPoolCAMP.add(CAMP_amount);
        
        lastRedeemed[msg.sender] = block.number;
        
        require(CAMP_out_min <= CAMP_amount, "Slippage limit reached");
        // Move all external functions to the end
        _SCAMP.Bank_burn_from(msg.sender, SCAMP_amount);
        _CAMP.Bank_mint(address(this), CAMP_amount);
    }

    // After a redemption happens, transfer the newly minted CAMP and owed collateral from this pool
    // contract to the user. Redemption is split into two functions to prevent flash loans from being able
    // to take out SCAMP/collateral from the system, use an AMM to trade the new price, and then mint back into the system.
    function collectRedemption() external {
        require((lastRedeemed[msg.sender].add(redemption_delay)) <= block.number, "Must wait for redemption_delay blocks before collecting redemption");
        bool sendCAMP = false;
        bool sendCollateral = false;
        uint CAMPAmount = 0;
        uint CollateralAmount = 0;

        // Use Checks-Effects-Interactions pattern
        if(redeemCAMPBalances[msg.sender] > 0){
            CAMPAmount = redeemCAMPBalances[msg.sender];
            redeemCAMPBalances[msg.sender] = 0;
            unclaimedPoolCAMP = unclaimedPoolCAMP.sub(CAMPAmount);

            sendCAMP = true;
        }
        
        if(redeemCollateralBalances[msg.sender] > 0){
            CollateralAmount = redeemCollateralBalances[msg.sender];
            redeemCollateralBalances[msg.sender] = 0;
            unclaimedPoolCollateral = unclaimedPoolCollateral.sub(CollateralAmount);

            sendCollateral = true;
        }

        if(sendCAMP){
            TransferHelper.safeTransfer(address(_CAMP), msg.sender, CAMPAmount);
        }
        if(sendCollateral){
            TransferHelper.safeTransfer(address(collateral_token), msg.sender, CollateralAmount);
        }
    }


    // When the protocol is recollateralizing, we need to give a discount of CAMP to hit the new CR target
    // Thus, if the target collateral ratio is higher than the actual value of collateral, minters get CAMP for adding collateral
    // This function simply rewards anyone that sends collateral to a pool with the same amount of CAMP + the bonus rate
    // Anyone can call this function to recollateralize the protocol and take the extra CAMP value from the bonus rate as an arb opportunity
    function recollateralizeSCAMP(uint256 collateral_amount, uint256 CAMP_out_min) external {
        uint256 collateral_amount_d18 = collateral_amount * (10 ** missing_decimals);
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
        uint256 SCAMP_total_supply = _SCAMP.totalSupply();
        uint256 current_collateral_ratio = _SCAMP.current_collateral_ratio();
        uint256 collat_value = collatDollarBalance();

        (uint256 collateral_units, uint256 amount_to_recollat) = SCAMPPoolLibrary.calcRecollateralizeSCAMPInner(
            collateral_amount_d18,
            getCollateralPrice(),
            collat_value,
            SCAMP_total_supply,
            current_collateral_ratio
        ); 

        uint256 collateral_units_precision = collateral_units.div(10 ** missing_decimals);

        uint256 CAMP_paid_back = amount_to_recollat.mul(uint(1e6).add(bonus_rate).sub(recollat_fee)).div(CAMP_price);

        require(CAMP_out_min <= CAMP_paid_back, "Slippage limit reached");
        TransferHelper.safeTransferFrom(address(collateral_token), msg.sender, address(this), collateral_units_precision);
        _CAMP.Bank_mint(msg.sender, CAMP_paid_back);
    }

    // Function can be called by an CAMP holder to have the protocol buy back CAMP with excess collateral value from a desired collateral pool
    // This can also happen if the collateral ratio > 1
    function buyBackCAMP(uint256 CAMP_amount, uint256 COLLATERAL_out_min) external {
        uint256 CAMP_price = _assetOracle.getAssetPrice(CAMP_contract_address);
    
        SCAMPPoolLibrary.BuybackCAMP_Params memory input_params = SCAMPPoolLibrary.BuybackCAMP_Params(
            availableExcessCollatDV(),
            _assetOracle.getAssetPrice(CAMP_contract_address),
            getCollateralPrice(),
            CAMP_amount
        );

        (uint256 collateral_equivalent_d18) = (SCAMPPoolLibrary.calcBuyBackCAMP(input_params)).mul(uint(1e6).sub(buyback_fee)).div(1e6);
        uint256 collateral_precision = collateral_equivalent_d18.div(10 ** missing_decimals);

        require(COLLATERAL_out_min <= collateral_precision, "Slippage limit reached");
        // Give the sender their desired collateral and burn the CAMP
        _CAMP.Bank_burn_from(msg.sender, CAMP_amount);
        TransferHelper.safeTransfer(address(collateral_token), msg.sender, collateral_precision);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function toggleMinting() external {
        require(msg.sender == owner);
        mintPaused = !mintPaused;

        emit MintingToggled(mintPaused);
    }

    function toggleRedeeming() external {
        require(msg.sender == owner);
        redeemPaused = !redeemPaused;

        emit RedeemingToggled(redeemPaused);
    }
    
    // Combined into one function due to 24KiB contract memory limit
    function setPoolParameters(uint256 new_ceiling, uint256 new_bonus_rate, uint256 new_redemption_delay, uint256 new_mint_fee, uint256 new_redeem_fee, uint256 new_buyback_fee, uint256 new_recollat_fee) external onlyOwner {
        pool_ceiling = new_ceiling;
        bonus_rate = new_bonus_rate;
        redemption_delay = new_redemption_delay;
        minting_fee = new_mint_fee;
        redemption_fee = new_redeem_fee;
        buyback_fee = new_buyback_fee;
        recollat_fee = new_recollat_fee;

        emit PoolParametersSet(new_ceiling, new_bonus_rate, new_redemption_delay, new_mint_fee, new_redeem_fee, new_buyback_fee, new_recollat_fee);
    }

    /* ========== EVENTS ========== */

    event PoolParametersSet(uint256 new_ceiling, uint256 new_bonus_rate, uint256 new_redemption_delay, uint256 new_mint_fee, uint256 new_redeem_fee, uint256 new_buyback_fee, uint256 new_recollat_fee);
    event MintingToggled(bool toggled);
    event RedeemingToggled(bool toggled);

}