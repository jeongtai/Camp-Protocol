// SPDX-License-Identifier: MIT
pragma solidity =0.7.5;

import "./module/Common/Context.sol";
// import "./module/ERC20/ERC20Custom.sol";
import "../bond/library/kip/KIP7.sol";
import "./Owned.sol";
import "./SCAMP.sol";
import "hardhat/console.sol";

contract CAMP is KIP7("Camp Protocol Governance Token", "CAMP", 18), Owned, Context {
    using SafeMath for uint256;

    /* ========== STATE VARIABLES ========== */
    address public SCAMPAddress;
    address public Bonding_contract_address;
    address public Staking_contract_address;
    uint256 public constant genesis_supply = 100000000e18; // 100M is printed upon genesis
    SCAMP private _SCAMP;


    /* ========== MODIFIERS ========== */

    modifier onlyBank() {
        require(msg.sender == _SCAMP.SCAMPBank(), "You are not bank");
        _;
    } 
    
    modifier onlyByOwnOrcontroller() {
    require(msg.sender == owner || msg.sender == _SCAMP.controller_address(), "Not the owner, controller");
    _;
  }

    modifier onlyBond() {
      require(msg.sender == Bonding_contract_address, "You are not Bond");
      _;
    }

    modifier onlyStake() {
      require(msg.sender == Staking_contract_address, "You are not Staking Contract");
      _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor (
        address _creator_address
    ) Owned(_creator_address){
        _mint(_creator_address, genesis_supply);
    }
    /* ========== RESTRICTED FUNCTIONS ========== */

    function setSCAMPAddress(address SCAMP_contract_address) external onlyByOwnOrcontroller {
        require(SCAMP_contract_address != address(0), "Zero address detected");

        SCAMPAddress = SCAMP_contract_address;
        _SCAMP = SCAMP(SCAMPAddress);
        emit SCAMPAddressSet(SCAMP_contract_address);
    }
    
    function setBondAddress(address _Bonding_contract_address) external onlyByOwnOrcontroller {
      require(_Bonding_contract_address != address(0), "Zero address detected");

      Bonding_contract_address = _Bonding_contract_address;
      emit BondAddressSet(_Bonding_contract_address);
    }

    function setStakeAddress(address _Staking_contract_address) external onlyByOwnOrcontroller {
      require(_Staking_contract_address != address(0), "Zero address detected");

      Staking_contract_address = _Staking_contract_address;
      emit StakeAddressSet(_Staking_contract_address);
    }
    
    // This function is what other WUSD pools will call to mint new WMF (similar to the WUSD mint) 
    function Bank_mint(address m_address, uint256 m_amount) external onlyBank {        
        super._mint(m_address, m_amount);
        emit BankMinted(address(this), m_address, m_amount);
    }

    // This function is what other WUSD pools will call to burn WMF 
    function Bank_burn_from(address b_address, uint256 b_amount) external onlyBank {

        _burnFrom(b_address, b_amount);
        emit BankBurned(b_address, address(this), b_amount);
    }

    function Bond_mint(address m_address, uint256 m_amount) external onlyByOwnOrcontroller {        
        super._mint(m_address, m_amount);
        emit BondMinted(address(this), m_address, m_amount);
    }
  
    function Staking_mint(address m_address, uint256 m_amount) external onlyByOwnOrcontroller {        
        super._mint(m_address, m_amount);
        emit StakeMinted(address(this), m_address, m_amount);
    }

    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
    }
    /* ========== EVENTS ========== */

    // Track WMF burned
    event BankBurned(address indexed from, address indexed to, uint256 amount);
    // Track WMF minted
    event BankMinted(address indexed from, address indexed to, uint256 amount);
    event BondMinted(address indexed from, address indexed to, uint256 amount);
    event StakeMinted(address indexed from, address indexed to, uint256 amount);
    event SCAMPAddressSet(address addr);
    event BondAddressSet(address addr);
    event StakeAddressSet(address addr);
}