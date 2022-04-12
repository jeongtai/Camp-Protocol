// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

interface IStakingProxy {
    function getBalance() external view returns(uint256);

    function withdraw(uint256 _amount) external;

    function stake() external;

    function distribute() external;
}