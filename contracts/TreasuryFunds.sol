// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import "./Interfaces/IEKLDepositor.sol";
import "./Interfaces/IRewardStaking.sol";
import "./Interfaces/IStakingProxy.sol";

//receive treasury funds. operator can withdraw
//allow execute so that certain funds could be staked etc
//allow treasury ownership to be transfered during the vesting stage
contract TreasuryFunds{
    using SafeERC20 for IERC20;
    using Address for address;

    address public operator;
    address public deposits;
    address public kpEKLstake;
    address public stakeproxy;
    event WithdrawTo(address indexed user, uint256 amount);
    event EKLDeposited(address stakeAddress);
    constructor(address _operator) public {
        operator = _operator;
    }

    function setDepositor(address _deposits) external {
      require(msg.sender == operator, "!auth");
      deposits = _deposits;
    }

    function setStakeProxy(address _stakeproxy) external {
      require(msg.sender == operator, "!auth");
      stakeproxy = _stakeproxy;
    }

    function setkpEKLStake(address _kpEKLstake) external {
      require(msg.sender == operator, "!auth");
      kpEKLstake = _kpEKLstake;
    }
    function setOperator(address _op) external {
        require(msg.sender == operator, "!auth");
        operator = _op;
    }
    
    function withdrawTo(IERC20 _asset, uint256 _amount, address _to) external {
    	require(msg.sender == operator, "!auth");

        _asset.safeTransfer(_to, _amount);
        emit WithdrawTo(_to, _amount);
    }

    function DepositEKL(address _stakeAddress) external {
      require(msg.sender == operator, "!auth");

      IEKLDepositor(deposits).depositAll(true, _stakeAddress);
      
      emit EKLDeposited(_stakeAddress);
    }

    function getReward() external {
      require(msg.sender == operator, "!auth");
      IRewardStaking(kpEKLstake).getReward();
    }

    function SendtoLocker(IERC20 _token) external {
      require(msg.sender == operator, "!auth");

      uint256 Bal = IERC20(_token).balanceOf(address(this)); 

      IERC20(_token).safeTransfer(stakeproxy, Bal);
      IStakingProxy(stakeproxy).distributeOther(_token);
    }

    function execute(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external returns (bool, bytes memory) {
        require(msg.sender == operator,"!auth");

        (bool success, bytes memory result) = _to.call{value:_value}(_data);

        return (success, result);
    }

}