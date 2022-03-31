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

    event AssetOracleUpdated(uint indexed idx, address indexed newOracle);

    constructor() Owned(msg.sender) {}

    function getAssetPrice(address asset) public view returns (uint256) {
    // if (asset == WKLAY) {
    //     return 1 ether;
    // }
        for (uint i = 0; i < priceOracle.length; i++) {
            UniswapPairOracle source = UniswapPairOracle(priceOracle[i]);
            uint256 price = uint256(source.consult(asset, PRICE_PRECISION));
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
}