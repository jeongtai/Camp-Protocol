// SPDX-License-Identifier: MIT
pragma solidity =0.7.5;

import "./module/Common/Context.sol";
import "./module/ERC20/IERC20.sol";
// import "./module/ERC20/ERC20Custom.sol";
import "../bond/library/kip/KIP7.sol";
import "./Owned.sol";
import "./CAMP.sol";
import "./Pools/SCAMPBank.sol";
import "./oracle/UniswapPairOracle.sol";

contract SCAMP is KIP7("stableCAMP", "sCAMP", 18), Owned, Context {
  using SafeMath for uint256;

  UniswapPairOracle private CAMPUSDTOracle;
  UniswapPairOracle private SCAMPUSDTOracle;
  address public creator_address;
  address public controller_address; 
  address public CAMP_address;
  address public usdt_address;
  uint256 public constant genesis_supply = 2000000e18; // 2M SCMAP 선발행

  address public SCAMPBank; //SCAMP Bank address받기
  
  //Bank에 필요한 variables
  uint256 private constant PRICE_PRECISION = 1e6;
  uint256 public current_collateral_ratio;
  uint256 public redemption_fee;
  uint256 public minting_fee; 
  uint256 public SCAMP_step;
  uint256 public refresh_cooldown; 
  uint256 public price_target;
  uint256 public price_band;

  address public default_admin_address;
  bool public collateral_ratio_paused = false;



  /*===============modifiers================== */

  modifier onlyByOwnOrcontroller() {
    require(msg.sender == owner || msg.sender == controller_address, "Not the owner, controller");
    _;
  }

  modifier onlyBank() {
    require(msg.sender == SCAMPBank, "only Bank Contract!");
    _;
  }


  /*=============constructor================*/

  constructor(
    address _creator_address
  ) Owned(_creator_address) {
    creator_address = _creator_address;
    default_admin_address = _msgSender();
    _mint(creator_address, genesis_supply);
    SCAMP_step = 2500;
    refresh_cooldown = 3600;
    price_target = 1000000;
    price_band = 5000;
  }

  /* ========= views =============*/

  function SCAMP_price() public view returns (uint256) {
    uint256 price = uint256(SCAMPUSDTOracle.consult(SCAMP_address, PRICE_PRECISION));
    return price;
  }
  
  function CAMP_price() public view returns (uint256) {
    uint256 price = uint256(CAMPUSDTOracle.consult(CAMP_address, PRICE_PRECISION));
    return price;
  }

  function SCAMP_info() public view returns (uint256, uint256, uint256, uint256, uint256) {
    return (
      SCAMP_price(),
      totalSupply(),
      current_collateral_ratio,
      minting_fee,
      redemption_fee
    );
  }

  /*=========== public functions ============ */
  uint256 public last_call_time;

  function refreshCollateralRatio() public {
    uint256 SCAMP_cur_price = SCAMP_price();
    require(block.timestamp - last_call_time >= refresh_cooldown, "Please wait refresh_cooldown");

    if (SCAMP_cur_price > price_target.add(price_band)) { //SCAMP가격이 만약 목표가보다 높다면
      if(current_collateral_ratio <= SCAMP_step) {
        current_collateral_ratio = 0;
      } else {
        current_collateral_ratio = current_collateral_ratio.sub(SCAMP_step); //담보비율을 낮추자!
      }
    } else if (SCAMP_cur_price < price_target.sub(price_band)) {
      if(current_collateral_ratio.add(SCAMP_step) >= 1000000) {
        current_collateral_ratio = 1000000;
      } else {
        current_collateral_ratio = current_collateral_ratio.add(SCAMP_step);
      }
    }

    last_call_time = block.timestamp;

    emit CollateralRatioRefreshed(current_collateral_ratio);
  }

  /* ============= Restricted Funtions ============ */

  function Bank_burn_from(address b_address, uint256 b_amoount) public onlyBank {
    _burnFrom(b_address, b_amoount);
    emit SCAMPBurned(b_address, msg.sender ,b_amoount);
  }

  function Bank_mint (address m_address, uint256 m_amount) public onlyBank {
    super._mint(m_address, m_amount);
    emit SCAMPMinted(msg.sender, m_address, m_amount);
  }

  function setRedemptionFee(uint256 red_fee) external onlyByOwnOrcontroller {
    redemption_fee = red_fee;
    emit RedemptionFeeSet(red_fee);
  }

  function setMintingFee(uint256 mint_fee) external onlyByOwnOrcontroller {
    minting_fee = mint_fee;
    emit MintingFeeSet(mint_fee);
  }

  function setPriceTarget(uint256 _new_price_target) external onlyByOwnOrcontroller {
    price_target = _new_price_target;
    emit PriceTargetSet(_new_price_target);
  }

  function setSCAMPStep(uint256 _new_step) external onlyByOwnOrcontroller {
    SCAMP_step = _new_step;
    emit SCAMPStepSet(_new_step);
  }

  function setRefreshCooldown(uint256 _new_cooldown) external onlyByOwnOrcontroller {
    refresh_cooldown = _new_cooldown;
    emit RefreshCooldownSet(_new_cooldown);
  }

  function setCAMPAddress(address _CAMP_address) external onlyByOwnOrcontroller {
    require(_CAMP_address != address(0), "Zero address detected");

    CAMP_address = _CAMP_address;
    emit CAMPAddressSet(_CAMP_address);
  }

  function setBankAddress(address _Bank_address) external onlyByOwnOrcontroller {
    require(_Bank_address != address(0), "Zero address detected");

    SCAMPBank = _Bank_address;
    emit BankAddressSet(_Bank_address);
  }

  function setController(address _controller_address) external onlyByOwnOrcontroller {
    require(_controller_address != address(0), "Zero address detected");
 
    controller_address = _controller_address;

    emit ControllerSet(_controller_address);
  }

  function setPriceBand(uint256 _price_band) external onlyByOwnOrcontroller {
    price_band = _price_band;
    emit PriceBandSet(_price_band);
  }

  function setSCAMPUSDTOracle(address _SCAMPUSDTOracle) external onlyByOwnOrcontroller {
    require(_SCAMPUSDTOracle != address(0), "Zero address detected");
    SCAMPUSDTOracle = UniswapPairOracle(_SCAMPUSDTOracle);

    emit SCAMPUSDTOracleSet(_SCAMPUSDTOracle);
  }

  function setCAMPUSDTOracle(address _CAMPUSDTOracle) external onlyByOwnOrcontroller {
    require(_CAMPUSDTOracle != address(0), "Zero address detected");
    CAMPUSDTOracle = UniswapPairOracle(_CAMPUSDTOracle);

    emit CAMPUSDTOracleSet(_CAMPUSDTOracle);
  }

  function toggleCollateralRatio() external onlyByOwnOrcontroller {
    collateral_ratio_paused = !collateral_ratio_paused;

    emit CollateralRatioToggled(collateral_ratio_paused);
  }

      /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for `accounts`'s tokens of at least
     * `amount`.
     */
  function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
    }

  /* ===========EVENTS ==========*/
    // Track SCAMP burned
  event SCAMPBurned(address indexed from, address indexed to, uint256 amount);

  // Track WUSD minted
  event SCAMPMinted(address indexed from, address indexed to, uint256 amount);

  event CollateralRatioRefreshed(uint256 current_collateral_ratio);
  event RedemptionFeeSet(uint256 red_fee);
  event MintingFeeSet(uint256 min_fee);
  event SCAMPStepSet(uint256 new_step);
  event PriceTargetSet(uint256 new_price_target);
  event RefreshCooldownSet(uint256 new_cooldown);
  event CAMPAddressSet(address CAMP_address);
  event ControllerSet(address controller_address);
  event BankAddressSet(address Bank_address);
  event PriceBandSet(uint256 price_band);
  event KLAYUSDTOracleSet(address Klay_oracle_addr, address klay_address);
  event SCAMPUSDTOracleSet(address SCAMP_oracle_addr, address klay_address);
  event CAMPUSDTOracleSet(address CAMP_oracle_addr, address klay_address);
  event CollateralRatioToggled(bool collateral_ratio_paused);

}