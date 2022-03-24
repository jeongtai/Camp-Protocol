pragma solidity 0.7.5;

interface ICAMP {
    function Bank_mint(address m_address, uint256 m_amount) external;
    function Bank_burn_from(address b_address, uint256 b_amount) external;
    function Bond_mint(address m_address, uint256 m_amount) external;
    function Staking_mint(address m_address, uint256 m_amount) external; 
}