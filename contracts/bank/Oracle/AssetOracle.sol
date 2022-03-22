// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "../../bond/library/SafeMath.sol";
import "./UniswapPairOracle.sol";
import "../Owned.sol";
import "../SCAMP.sol";
import "../Uniswap/interfaces/IUniswapV2Pair.sol";

contract AssetOracle is Owned {
    using SafeMath for uint;

    UniswapPairOracle public Token0Oracle;
    UniswapPairOracle public Token1Oracle;
    uint256 private constant PRICE_PRECISION = 1e6;

    address Token0_address;
    address Token1_address;

    event Token0OracleUpdated(address indexed newOracle);
    event Token1OracleUpdated(address indexed newOracle);

constructor(address _token0Address, address _token1Address) Owned(msg.sender) {
        setToken0Oracle(_token0Address);
        setToken1Oracle(_token1Address);
        Token0_address = _token0Address;
        Token1_address = _token1Address;
    }

    function Token0_price() external view returns (uint256) {
        uint256 price = uint256(Token0Oracle.consult(Token0_address, PRICE_PRECISION));
        return price;
    }

    function Token1_price() external view returns (uint256) {
        uint256 price = uint256(Token1Oracle.consult(Token1_address, PRICE_PRECISION));
        return price;
    }

    function setToken0Oracle(address _oracle) public onlyOwner {
        Token0Oracle = UniswapPairOracle(_oracle);
        emit Token0OracleUpdated(_oracle);
    }

    function setToken1Oracle(address _oracle) public onlyOwner {
        Token1Oracle = UniswapPairOracle(_oracle);
        emit Token1OracleUpdated(_oracle);
    }

    // pair의 단위 가격을 구한다 in USD
    function assetPrice(address _principle) external view returns (uint256) {
        uint256 totalSup = IUniswapV2Pair(_principle).totalSupply();
        uint256 token0value = IUniswapV2Pair(_principle).price0CumulativeLast();
        uint256 token1value = IUniswapV2Pair(_principle).price1CumulativeLast();
        return (token0value.add(token1value)).div(totalSup).mul(1e18); //자릿수 맞추기..?!
    }
}