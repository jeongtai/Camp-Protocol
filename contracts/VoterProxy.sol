// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./Interfaces/Interfaces.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';


contract EklipseVoterProxy {
    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;

    address public constant mintr = address(0x09523685a82d8e96F7FF02575DA94749955eD251);
    address public constant ekl = address(0x09523685a82d8e96F7FF02575DA94749955eD251);
    address public constant postekl = address(0x09523685a82d8e96F7FF02575DA94749955eD251);
    address public constant eklclaim = address(0);

    address public constant escrow = address(0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2);
    address public constant gaugeController = address(0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB);
    
    address public owner;
    address public operator;
    address public depositor;
    
    mapping (address => bool) private stashPool;
    mapping (address => bool) private protectedTokens;

    constructor() public {
        owner = msg.sender;
    }

    function getName() external pure returns (string memory) {
        return "EklipseVoterProxy";
    }

    function setOwner(address _owner) external {
        require(msg.sender == owner, "!auth");
        owner = _owner;
    }

    function setOperator(address _operator) external {
        require(msg.sender == owner, "!auth");
        require(operator == address(0) || IDeposit(operator).isShutdown() == true, "needs shutdown");
        
        operator = _operator;
    }

    function setDepositor(address _depositor) external {
        require(msg.sender == owner, "!auth");

        depositor = _depositor;
    }

    function deposit(address _token, address _gauge) external returns(bool){
        require(msg.sender == operator, "!auth");
        if(protectedTokens[_token] == false){
            protectedTokens[_token] = true;
        }
        if(protectedTokens[_gauge] == false){
            protectedTokens[_gauge] = true;
        }
        uint256 balance = IERC20(_token).balanceOf(address(this));
        if (balance > 0) {
            IERC20(_token).safeApprove(_gauge, 0);
            IERC20(_token).safeApprove(_gauge, balance);
            IEklipseGauge(_gauge).deposit(balance);
        }
        return true;
    }

    //stash only function for pulling extra incentive reward tokens out
    function withdrawOther(IERC20 _asset) external returns (uint256 balance) {
        require(msg.sender == operator, "!auth");

        //check protection
        if(protectedTokens[address(_asset)] == true){
            return 0;
        }

        balance = _asset.balanceOf(address(this));
        _asset.safeTransfer(msg.sender, balance);
        return balance;
    }

    // Withdraw partial funds
    function withdraw(address _token, address _gauge, uint256 _amount) public returns(bool){
        require(msg.sender == operator, "!auth");
        uint256 _balance = IERC20(_token).balanceOf(address(this));
        if (_balance < _amount) {
            _amount = _withdrawSome(_gauge, _amount.sub(_balance));
            _amount = _amount.add(_balance);
        }
        IERC20(_token).safeTransfer(msg.sender, _amount);
        return true;
    }

     function withdrawAll(address _token, address _gauge) external returns(bool){
        require(msg.sender == operator, "!auth");
        (uint256 amount,,) = IEklipseGauge(_gauge).userInfo(address(this));
        amount = amount.add(IERC20(_token).balanceOf(address(this)));
        withdraw(_token, _gauge, amount);
        return true;
    }

    function _withdrawSome(address _gauge, uint256 _amount) internal returns (uint256) {
        IEklipseGauge(_gauge).withdraw(_amount);
        return _amount;
    }

    function createLock(uint256 _value) external returns(bool){
        require(msg.sender == depositor, "!auth");
        IERC20(ekl).safeApprove(escrow, 0);
        IERC20(ekl).safeApprove(escrow, _value);
        uint256 max_time = IEklipseVoteEscrow(escrow).MAX_LOCK_DURATION();
        IEklipseVoteEscrow(escrow).addLock(_value, max_time);
        return true;
    }

    function release() external returns(bool){
        require(msg.sender == depositor, "!auth");
        IEklipseVoteEscrow(escrow).withdrawEkl();
        return true;
    }

    function vote(uint256 _voteId, address _votingAddress, bool _support) external returns(bool){
        require(msg.sender == operator, "!auth");
        IVoting(_votingAddress).vote(_voteId,_support,false);
        return true;
    }

    function voteGaugeWeight(address _gauge, uint256 _weight) external returns(bool){
        require(msg.sender == operator, "!auth");

        //vote
        IVoting(gaugeController).vote_for_gauge_weights(_gauge, _weight);
        return true;
    }

    function claimRewards() external returns(bool){
        require(msg.sender == operator, "!auth");
        IEKLClaim(eklclaim).claimAll(address(this));
        uint256 eklbal = IERC20(ekl).balanceOf(address(this));
        if (eklbal > 0) {
          IERC20(ekl).safeTransfer(operator, eklbal);
        }
        uint256 posteklbal = IERC20(postekl).balanceOf(address(this));
        if (posteklbal > 0) {
          IERC20(postekl).safeTransfer(operator, posteklbal);
        }
        return true;
    }

    function claimFees(address _token) external returns (uint256){
        require(msg.sender == operator, "!auth");
        IEklipseVoteEscrow(escrow).withdrawFeeReward();
        uint256 _balance = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransfer(operator, _balance);
        return _balance;
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