// SPDX-License-Identifier: MIT

pragma solidity 0.7.5;

import "./library/Ownable.sol";
import "./library/SafeMath.sol";
import "./library/kip/SafeKIP7.sol";
import "./interface/IBondTreasury.sol";
import "./library/upgradeable/VersionedInitializable.sol";

contract BondTreasury is Ownable, VersionedInitializable, IBondTreasury {
    using SafeMath for uint256;
    using SafeKIP7 for IKIP7;

    uint256 public constant REVISION = 1;

    address public DAO;
    address public CAMP;
    address public operator;

    address[] internal _reserveTokens;
    mapping(address => bool) public isReserveToken;
    mapping(address => uint256) public tokenPaidAmounts;
    address[] internal _reserveDepositors;
    mapping(address => bool) public isReserveDepositor;

    function __initialize(
        address DAO_,
        address CAMP_,
        address op_
    ) external initializer {
        // _setInitialOwner();
        require(CAMP_ != address(0), "BondTreasury: 0 address");
        DAO = DAO_;
        require(DAO_ != address(0), "BondTreasury: 0 address");
        CAMP = CAMP_;
        operator = op_;
    }

    function getBalance() external view returns (uint256) {
        return IKIP7(CAMP).balanceOf(address(this));
    }

    function getRevision() internal pure override returns (uint256) {
        return REVISION;
    }

    function reserveTokens() external view returns (address[] memory) {
        return _reserveTokens;
    }

    function reserveDepositors() external view returns (address[] memory) {
        return _reserveDepositors;
    }

    function deposit(uint256 _amount, address _token, uint256 _pay) external override {
        require(isReserveToken[ _token ], "BondTreasury: not registered");
        require(isReserveDepositor[ msg.sender ], "BondTreasury: not authorized");

        IKIP7(_token).safeTransferFrom(msg.sender, address(this), _amount);

        // mint CAMP needed and store amount of rewards for distribution
        IKIP7(CAMP).transfer(msg.sender, _pay);

        tokenPaidAmounts[_token] = tokenPaidAmounts[_token].add(_pay);
        emit Deposit(_token, _amount, _pay);
    }

    function register(address _token, address _depositor) external onlyOwner {
        require(_token != address(0) && _depositor != address(0), "BondTreasury: 0 address");
        require(!isReserveDepositor[_depositor], "BondTreasury: already registered");
        _register(_token, _depositor);
    }

    function _register(address _token, address _depositor) internal {
        if (!isReserveToken[_token]) {
            _reserveTokens.push(_token);
            isReserveToken[_token] = true;
        }
        address[] memory reserveDepositors_ = _reserveDepositors;
        bool exist = false;
        for (uint256 i = 0; i < reserveDepositors_.length; i++) {
            if (reserveDepositors_[i] == _depositor) {
                exist = true;
            }
        }
        if (!exist) {
            _reserveDepositors.push(_depositor);
        }
        isReserveDepositor[_depositor] = true;
    }

    function unregisterDepositor(address _depositor) external onlyOwner {
        require(isReserveDepositor[_depositor], "BondTreasury: not registered");
        isReserveDepositor[_depositor] = false;
    }



//For Convex

    function setApprovals() external {
      for (uint256 i = 0; i < _reserveTokens.length; i ++) {
        IERC20(reserveTokens[i]).safeApprove(booster, 0);
        IERC20(reserveTokens[i]).safeApprove(booster, uint256(-1));
      }
    }

    function depositLP(uint256 _amount, address _gauge) external {
      require(msg.sender == operator, "!auth");
      IStaker(staker).deposit(lptoken, gauge);

      emit LPDeposited(gauge, _amount);
      return true;
    }

    function depositAll(address lptoken, address gauge) external returns(bool){
        uint256 balance = IERC20(lptoken).balanceOf(msg.sender);
        depositLP(balance, gauge);
        return true;
    }

    function _withdraw(address lptoken, uint256 _amount, address _from, address _to, address gauge) internal {
      IStaker(staker).withdraw(lptoken, gauge, _amount);
      IERC20(lptoken).safeTransfer(_to, _amount);
    }

    function withdraw(uint256 lptoken, uint256 _amount, address gauge) public returns(bool){
      require(msg.sender == operator, "!auth");
      _withdraw(lptoken,_amount,msg.sender,msg.sender, address gauge);
      return true;
    }

    function withdrawAll(address lptoken, address gauge) public returns(bool){
      require(msg.sender == operator, "!auth");
      uint256 userBal = IERC20(token).balanceOf(msg.sender);
      withdraw(lptoken, userBal, address gauge);
      return true;
    }

    function claimRewards(address _gauge) external returns(bool){
      require(msg.sender == operator, "!auth");

      IStaker(staker).claimRewards(_gauge);
      return true;
    }

    /* ======= AUXILLIARY ======= */

    /**
     *  @notice allow anyone to send lost tokens (excluding principle or CAMP) to the DAO
     *  @return bool
     */
    function recoverLostToken(address _token) external returns (bool) {
        require(_token != CAMP, "BondTreasury: cannot withdraw CAMP");
        require(!isReserveToken[_token], "BondTreasury: cannot withdraw reserve tokens");
        IKIP7(_token).safeTransfer(DAO, IKIP7(_token).balanceOf(address(this)));
        return true;
    }
    //EKL은 EKLdepositor로 PostEKL은 다른 Address로, Fee는 lockFees로
    function transferRewards(address _token, address _to) external {
      require(msg.sender == operator, "!auth");
      uint256 userBal = IERC20(_token).balanceOf(msg.sender);
      IERC20(_token).safeTransfer(_to, userBal);
    }
}