// SPDX-License-Identifier: UNLICENSE

pragma solidity 0.7.5;

import "../Owned.sol";
import "../../bond/library/kip/KIP7.sol";

contract MockUSDC is KIP7("MockERC20", "Mock", 6), Owned(msg.sender) {
    uint256 public constant TOTAL_SUPPLY = 1000000e18;

    // @notice Must only be called by anyone! haha!
    // function mint(address _to, uint256 _amount) public {
    //     require(_to != address(0));
    //     require(_amount > 0);
    //     _mint(_to, _amount);
    // }

    function setBalance(address _to, uint256 _amount) public {
        _burn(_to, balanceOf(_to));
        _mint(_to, _amount);
    }

    // function decimals() public view virtual override returns (uint8) {
    //     return 6;
    // }
}
