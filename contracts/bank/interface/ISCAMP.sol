// SPDX-License-Identifier: MIT

pragma solidity 0.7.5;

interface ISCAMP {

    function SCAMP_price() external view returns(uint256);
    function CAMP_price() external view returns(unit256);
    function SCAMP_info()  public view returns (uint256, uint256, uint256, uint256, uint256);
}


