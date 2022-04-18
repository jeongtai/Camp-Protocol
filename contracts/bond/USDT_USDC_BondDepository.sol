// SPDX-License-Identifier: MIT

pragma solidity 0.7.5;

import "./EKLBondDepository.sol";
import "./interface/IClaimSwapZap.sol";
import "./interface/IClaimSwapPair.sol";

contract USDT_USDC_BondDepository is EKLBondDepository {
    uint256 public constant REVISION = 1;

    function getRevision() internal pure override returns (uint256) {
        return REVISION;
    }

    function NAME() external pure override returns (string memory) {
        return "ClaimSwap KLAY-KBT LP Depository";
    }
}
