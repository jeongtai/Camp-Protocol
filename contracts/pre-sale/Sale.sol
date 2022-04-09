// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../bond/library/kip/IKIP7.sol";
import "../bond/library/SafeMath.sol";
import "../bond/library/Ownable.sol";
import "../bond/library/kip/SafeKIP7.sol";
import "hardhat/console.sol";
//import "../bond/library/upgradeable/VersionedInitializable.sol";


contract KP_PreSale is Ownable {
    using SafeKIP7 for IKIP7;
    using SafeMath for uint;


    IKIP7 public governanceToken;
    IKIP7 public klayToken;
    ufixed8x1 constant KP_kaly_Ratio = 0.2; // 0,2klay = 1 KP
    address payable private _admin;

    uint256 public KPPrice;
    uint256 public startBlockNumber;
    uint256 public vestingperiod;
    uint256 public getKlayTotalAmount;
    uint256 public presaletime;
    uint256 public vestingAmount;
    uint256 public RatioBuyAmount;

    struct userInfo {
        uint256 payout; // KP remaining to be paid
        //        uint256 vesting; // Blocks left to vest
        uint256 lastBlock; // Last interaction
        //        uint256 pricePaid; // In USDT, for front end viewing
    }

    mapping (address => userInfo) internal addressInfo;

    event Purchase(uint amount, address buyer);
    event Claimed(address indexed recipient, uint256 payout, uint256 remaining);



    // ------------------- function ------------------- //
    function __initialize (
        address _governanceToken,
        address _klayToken,
        address payable _Admin,
        uint256 _vestingAmount,
        uint256 _RatioBuyAmount,
        uint256 _getKlayTotalAmount
    ) external onlyOwner{
        require(
            _Admin != address(0) && _Admin != address(1),
            "initializer: _devAddr must not be address(0) or address(1)"
        );
        governanceToken = IKIP7(_governanceToken);              // KP Token address
        klayToken = IKIP7(_klayToken);          // klay Token address
        _admin = _Admin;                        // admin address
        vestingAmount = _vestingAmount;         // 100만 클레이 예정
        RatioBuyAmount = _RatioBuyAmount;       // 인당 최대 구매 비율, 10000이하로 설정 10000 = 100%
        getKlayTotalAmount = _getKlayTotalAmount; // 초기값 0으로 할당
//        OwnableUpgradeable.__Ownable_init();
//        ReentrancyGuardUpgradeable.__ReentrancyGuard_init();
    }


    function setRatioBuyAmount(uint _RatioBuyAmount) external onlyOwner {
        require(_RatioBuyAmount < 10000, "setRatioBuyAmount: _RatioBuyAmount cannot be more than 10000.");
        require(_RatioBuyAmount > 0, "setRatioBuyAmount: _RatioBuyAmount cannot be less than 0.");
        RatioBuyAmount = _RatioBuyAmount;
    }

    function setStartVesting(uint256 startTime) external onlyOwner {
        startBlockNumber = startTime;
        console.log("startBlockNumber : %s",  startBlockNumber);
    }

    function setvestingperiod(uint256 _vestingperiod) external onlyOwner {
        vestingperiod = _vestingperiod;
        console.log("vestingperiod : %s",  vestingperiod);

    }

    function setPresaletime(uint256 startTime) external onlyOwner {
        presaletime = startTime;
        console.log("presaletime : %s",  presaletime);

    }

    function purchaseByKlay(uint _klayAmount) public {
        require(block.number > presaletime, "You can't mint now");
        // uint256 klayTokenBalance = klayToken.balanceOf(msg.sender);
        // require(_klayAmount <= klayTokenBalance,
        //     "KP PreSale: The tokens' balance is insufficient.");        //balance보다 더 많이 사려고 하는지 확인
        require(getKlayTotalAmount.add(_klayAmount) <= vestingAmount);  //klayAmount가 vestingAmount를 초과하는지 확인
        require(vestingAmount.div(addressInfo[msg.sender].payout.add(_klayAmount)) <= RatioBuyAmount, //?
            "KP PreSale: The purchase amount exceeds the purchase amount per person..");// 한 사람당 구매 비율보다 높은지 확인

        getKlayTotalAmount += _klayAmount; // vesting 물량에서 구매한만큼 빼기


        addressInfo[msg.sender] = userInfo({
        payout: addressInfo[msg.sender].payout.add(_klayAmount),
        lastBlock: startBlockNumber
        //        pricePaid: info.pricePaid
        });  // 이 부분이 조금 확신이 안섦
        klayToken.safeTransferFrom(msg.sender, address(this), _klayAmount);

        emit Purchase(_klayAmount, msg.sender);
    }


    function claim(address _recipient) external {
        userInfo memory info = addressInfo[_recipient];
        uint256 percentVested = percentVestedFor(_recipient); // (blocks since last interaction / vesting term remaining)

        if (percentVested >= 10000) { // if fully vested
            delete addressInfo[_recipient]; // delete address info
            emit Claimed(_recipient, info.payout, 0); // emit pre-sale data

        } else { // if unfinished
            // calculate payout vested
            uint256 payout = info.payout.mul(percentVested).div(10000);

            // store updated deposit info
            addressInfo[_recipient] = userInfo({
            payout: info.payout.sub(payout),
            //            vesting: info.vesting.sub(block.number.sub(info.lastBlock)),
            lastBlock: block.number
            //            pricePaid: info.pricePaid
            });

            governanceToken.safeTransferFrom(address(this), msg.sender, payout);
            emit Claimed(_recipient, payout, addressInfo[_recipient].payout);
        }
    }
    /**
     *  @notice calculate how far into vesting a depositor is
     *  @param _depositor address
     *  @return percentVested_ uint256
     */
    function percentVestedFor(address _depositor) public view returns (uint256 percentVested_) {
        userInfo memory info = addressInfo[_depositor];
        uint256 blocksSinceLast = block.number.sub(info.lastBlock);
        uint256 vesting = (startBlockNumber.add(vestingperiod)).sub(info.lastBlock) ;

        if (vesting > 0) {
            percentVested_ = blocksSinceLast.mul(10000).div(vesting);
        } else {
            percentVested_ = 0;
        }
    }

    function withdraw() external onlyOwner {
        uint klayBalance = klayToken.balanceOf(address(this));
        require((klayBalance > 0), "KP_PreSale: No balance to withdraw.");
        if(klayBalance > 0) {
            klayToken.safeTransfer(msg.sender, klayBalance);
        }
    }
}