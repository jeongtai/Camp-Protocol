// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "../../bond/library/SafeMath.sol";
import "./UniswapPairOracle.sol";
import "../Owned.sol";
import "../Uniswap/interfaces/IUniswapV2Pair.sol";
import "hardhat/console.sol";

contract AssetOracle is Owned {
    using SafeMath for uint;

    address[] public priceOracle;
    uint256 private constant PRICE_PRECISION = 1e6;

    address Token0_address;

    event AssetOracleUpdated(uint indexed idx, address indexed newOracle);

    constructor() Owned(msg.sender) {}

    function getAssetPrice(address asset) public view returns (uint256) {
    // if (asset == WKLAY) {
    //     return 1 ether;
    // }
        for (uint i = 0; i < priceOracle.length; i++) {
            // console.log("int i", i);
            UniswapPairOracle source = UniswapPairOracle(priceOracle[i]);
            // console.log("oracle address", priceOracle[i]);
            // console.log("token", asset);
            uint256 price = uint256(source.consult(asset, PRICE_PRECISION));
            // console.log("price", price);
            if (price > 0) {
                return price;
            }
        }
        revert("CANNOT GET ASSET PRICE");
    }

    function setAssetOracle(address[] memory _oracle) public onlyOwner {
        for (uint256 i = 0; i < _oracle.length; i++) {
            priceOracle.push(_oracle[i]);
            emit AssetOracleUpdated(i, _oracle[i]);
        }
    }

    // pair의 단위 가격을 구한다 in USD
    // function assetPrice(address _principle) external view returns (uint256) {
    //     uint256 lpSupply = IUniswapV2Pair(_principle).totalSupply();
    //     uint112 reserve0, reserve1, blocktimestamp = IUniswapV2Pair(_principle).getReserves();
    //     uint256 token1value = IUniswapV2Pair(_principle).price1CumulativeLast();
    //     return (token0value.add(token1value)).div(totalSup).mul(1e18); //자릿수 맞추기..?!
    // }
}