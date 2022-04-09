// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "../bond/library/kip/IKIP7.sol";

contract PV_sale is Ownable {
  using SafeKIP7 for IKIP7;

  struct Info {
    uint256 starttime;
    uint256 payout;
    uint256 lastBlock;
    uint256 remainedBlock;
  }

  mapping(address => Info) Userinfo;

  IKIP7 KPtoken;

    function __initialize (
      address _KPaddress,
  ) external onlyOwner{
    KPtoken = IKIP7(_KPaddress);
  }

  function addPartner(address _newpartner, uint256 _payout, uint256 _vestingterm, uint256 _start_time) external onlyOwner {
    require(_newpartner != address(0), "BondDepository: Invalid address");
      userInfo[_depositor] = Info({
      starttime : _start_time,
      payout: _payout,
      remainedblock : _vestingTerm,
      lastBlock: _start_time,
      });
    emit newPartner(_newpartner);
  }

  function claim(address _recipient) external returns (uint256) {
      Info memory info = userInfo[_recipient];
      uint256 percentVested = percentVestedFor(_recipient); // (blocks since last interaction / vesting term remaining)

      if (percentVested >= 10000) { // if fully vested
          delete userInfo[_recipient]; // delete user info
          emit claimed(_recipient, info.payout, 0); // emit bond data
          IKIP7(KPtoken).transfer(_recipient, info.payout);

      } else { // if unfinished
          uint256 payout = info.payout.mul(percentVested).div(10000);
          userInfo[_recipient] = Info({
              payout: info.payout.sub(payout),
              vesting: info.vesting.sub(block.number.sub(info.lastBlock)),
              lastBlock: block.number,
          });

          emit claimed(_recipient, payout, userInfo[_recipient].payout);
          IKIP7(KPtoken).transfer(_recipient, payout);
      }
  }



  function percentVestedFor(address _depositor) public view returns (uint256 percentVested_) {
      Info memory info = userInfo[_depositor];
      require(block.number - userInfo.starttime > 0 , "You have to wait until claim start");
      uint256 blocksSinceLast = block.number.sub(info.lastBlock);
      uint256 remainedblock = info.remainedblock;

      if (vesting > 0) {
          percentVested_ = blocksSinceLast.mul(10000).div(remainedblock);
      } else {
          percentVested_ = 0;
      }
  }


  function pendingPayoutFor(address _depositor) external view returns (uint256 pendingPayout_) {
      uint256 percentVested = percentVestedFor(_depositor);
      uint256 payout = userInfo[_depositor].payout;

      if (percentVested >= 10000) {
          pendingPayout_ = payout;
      } else {
          pendingPayout_ = payout.mul(percentVested).div(10000);
      }
  }

}

    event newPartner(address _newpartner);
    event claimed(address indexed recipient, uint256 payout, uint256 remaining);