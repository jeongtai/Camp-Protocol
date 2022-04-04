// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../bond/library/kip/KIP7.sol";
import "../bond/library/kip/SafeKIP7.sol";
import "../bond/library/SafeMath.sol";
import "../bank/CAMP.sol";


contract KP_PreSale is Ownable {
    using SafeKIP7 for IKIP7;
    using SafeMath for uint;

    enum PurchaseType {
        KP
    }

    IKIP7 public KP;
    IKIP7 public klay;
    address payable private _admin;

    uint public KPPrice;
    uint public klayPrice;

    mapping (address => uint) internal preBuyerKlayAmount;

    event Purchase(uint amount, PurchaseType purchaseType, address buyer);

    constructor(
        address _KPToken,
        address _klayToken,
        address payable _Admin,
        uint _vestingAmount,
        uint _RatioBuyAmount // 100이하로 설정
        ) {
        KPToken = IKIP7(_KPToken);
        klayToken = IERC20(_klayToken);
        _admin = _Admin;
        vestingAmount = _vestingAmount;
        RatioBuyAmount = _RatioBuyAmount;
    }


    // ------------------- function ------------------- //

    function purchaseByKlay(uint _klayAmount) public {
        uint klayTokenAmount = _klayAmount;
        // 음수를 입력값으로 받을 수 없음.
        require(tokenAmount > 0, "KP PreSale: The purchase amount cannot be less than 0.");
        uint klayTokenBalance = klayToken.balanceOf(msg.sender);
        // buyer의 지갑안에 balance보다 더 많이 사려고 하는지 확인
        require(klayTokenAmount <= klayTokenBalance, "KP PreSale: The tokens' balance is insufficient.");
        // 남은 vesting 물량보다 사려는 물량이 많은지 확인
        require(kalyTokenAmount <= vestingAmount, "KP PreSale: The vestingAmount balance is insufficient.");
        // 한 사람당 구매 비율보다 높은지 확인
        require(kalyTokenAmount <= vestingAmount*RatioBuyAmount/100, "KP PreSale: The purchase amount exceeds the purchase amount per person..");
        preBuyerKlayAmount[msg.sender] += klayTokenAmount; // 얼만큼 샀는지 주소마다 저장
        vestingAmount -= klayTokenAmount; // vesting 물량에서 방금 구매한만큼 빼기
//        klayToken.safeTransferFrom(msg.sender, address(this), _klayAmount);
//        KPToken.safeTransfer(msg.sender, tokenAmount);

        emit Purchase(klayTokenAmount, PurchaseType.KP, msg.sender);
    }

    function setRatioBuyAmount(uint _RatioBuyAmount) onlyOwner {
        require(_RatioBuyAmount < 100, "setRatioBuyAmount: _RatioBuyAmount cannot be more than 100.");
        require(_RatioBuyAmount > 0, "setRatioBuyAmount: _RatioBuyAmount cannot be less than 0.");
        RatioBuyAmount = _RatioBuyAmount;
    }

    function setStartVesting(uint _KPPrice, uint _vestingPeriod){

    }

//    function withdraw() public onlyOwner {
//        uint usdtBalance = usdt.balanceOf(address(this));
//        uint ethBalance = address(this).balance;
//        require((usdtBalance > 0) || (ethBalance > 0), "KP_PreSale: No balance to withdraw.");
//        if(usdtBalance > 0) {
//            usdt.safeTransfer(msg.sender, usdtBalance);
//        }
//        if(ethBalance > 0) {
//            payable(msg.sender).transfer(ethBalance);
//        }
//    }
}