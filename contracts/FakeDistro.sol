// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';


contract Fakedistro {
    using SafeERC20 for IERC20;

    IERC20 token;

    constructor(IERC20 _token) public {
        token = _token;
    }

    function claim() public {
      token.safeTransfer(msg.sender, 100e18);
    }
}