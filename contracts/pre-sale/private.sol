// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PV_sale is Ownable {
    using SafeMath for uint256;

  struct Info {
    uint256 starttime;
    uint256 payout;
    uint256 remainedblock;
    uint256 lastBlock;
    
  }

  mapping(address => Info) Userinfo;

  IERC20 KPtoken;

    function __initialize (
      address _KPaddress
  ) external onlyOwner{
    KPtoken = IERC20(_KPaddress);
  }

  function addPartner(address _newpartner, uint256 _payout, uint256 _vestingterm, uint256 _start_time) external onlyOwner {
    require(_newpartner != address(0), "BondDepository: Invalid address");
      Userinfo[_newpartner] = Info({
      starttime : _start_time,
      payout: _payout,
      remainedblock : _vestingterm,
      lastBlock: _start_time
      });
    emit newPartner(_newpartner);
  }

  function claim(address _recipient) external {
      Info memory info = Userinfo[_recipient];
      uint256 percentVested = percentVestedFor(_recipient); // (blocks since last interaction / vesting term remaining)

      if (percentVested >= 10000) { // if fully vested
          delete Userinfo[_recipient]; // delete user info
          emit claimed(_recipient, info.payout, 0); // emit bond data
          IERC20(KPtoken).transfer(_recipient, info.payout);

      } else { // if unfinished
          uint256 payout = info.payout.mul(percentVested).div(10000);
          Userinfo[_recipient] = Info({
              starttime : info.starttime,
              payout: info.payout.sub(payout),
              remainedblock: info.remainedblock.sub(block.number.sub(info.lastBlock)),
              lastBlock: block.number
          });

          emit claimed(_recipient, payout, Userinfo[_recipient].payout);
          IERC20(KPtoken).transfer(_recipient, payout);
      }
  }



  function percentVestedFor(address _depositor) public view returns (uint256 percentVested_) {
      Info memory info = Userinfo[_depositor];
      require(block.number - info.starttime > 0 , "You have to wait until claim start");
      uint256 blocksSinceLast = block.number.sub(info.lastBlock);
      uint256 remainedblock = info.remainedblock;

      if (remainedblock > 0) {
          percentVested_ = blocksSinceLast.mul(10000).div(remainedblock);
      } else {
          percentVested_ = 0;
      }
  }


  function pendingPayoutFor(address _depositor) external view returns (uint256 pendingPayout_) {
      uint256 percentVested = percentVestedFor(_depositor);
      uint256 payout = Userinfo[_depositor].payout;

      if (percentVested >= 10000) {
          pendingPayout_ = payout;
      } else {
          pendingPayout_ = payout.mul(percentVested).div(10000);
      }
  }

  function currentblock() external view returns (uint256) {
      return block.number;
  }
    event newPartner(address _newpartner);
    event claimed(address indexed recipient, uint256 payout, uint256 remaining);
}
