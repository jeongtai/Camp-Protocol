// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';


contract FakeGauge {
    using SafeERC20 for IERC20;

    IERC20 token;
    IERC20 extra;

    constructor(IERC20 _token, IERC20 _extra) public {
        token = _token;
        extra = _extra;
    }

    function deposit(uint256 amount) public {
      token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) public {
      token.safeTransfer(msg.sender, amount);
    }

    function claim_rewards() external {
      extra.safeTransfer(msg.sender, 1e18);
    }
}