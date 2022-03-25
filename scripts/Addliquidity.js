const { ethers } = require("hardhat");

const main = async () => {
  const [owner] = await ethers.getSigners();
  const SCAMP = "0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0"
  const CAMP = "0x666F7ea2A0cc0980291ff1A33cBd5F979eC40522"
  const mock = "0xE1388E74fdA951bB7777E7F7F4D195443415E8CB"
  const SCAMPPair = "0xcE7D3b56B69cC5708C8a9DFD049850BeA51bD278"
  const CAMPPair = "0xD7737e801A6A86f72c82168B4de61a35A93Cb33E"
    // ADD LIQUIDITY
    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    //const factory = await uniConFactory.deploy(owner.address);
    const factory = uniConFactory.attach("0xA872f5D53CA37Ff88Ca1E1e80869d7E13127cF34"); // with wKLAY
    //console.log("Factory address is:", factory.address);

    // const pairCodeHash = await factory.pairCodeHash();
    // console.log("pairCodeHash:", pairCodeHash);

    // await factory.createPair(SCAMP, mock)
    // const SCAMPPair = await factory.getPair(SCAMP, mock);
    // console.log("SCAMP pair:", SCAMPPair);

    // //await factory.createPair(CAMP, mock)
    // const CAMPPair = await factory.getPair(CAMP, mock);
    // console.log("CAMP pair:", CAMPPair);

    //const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    //const wKLAY = await wKLAYFactory.deploy();
    //const wKLAY = wKLAYFactory.attach("0x449543B42eAeb93CEF86eEfF59CECE32eC9E56B3");
    //console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    //const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0x82aF5E09b1Da619AE47b70b78EA7393ba8578356");
    //console.log("router address:", router.address);
    // console.log(await router.factory(), await router.WKLAY());

    // //addLiquidity
    // let liquidity = await router.addLiquidity(SCAMP, mock, 1e10, 1e8, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
    // console.log("Liquidity:", liquidity);

    //let liquidity = await router.addLiquidity(CAMP, mock, 1e9, 1e8, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
    //console.log("Liquidity:", liquidity);

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairContract = PairFactory.attach(SCAMPPair);
    const reserve = await pairContract.getReserves();

    // const pairContract1 = PairFactory.attach(CAMPPair);
    // const reserve1 = await pairContract1.getReserves();

    console.log("SCAMPPair")
    console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    // console.log("CAMPPair")
    // console.log(reserve1[0].toString(), reserve1[1].toString(), reserve1[2])

    // //SWAP
    // const swapamounts = await router.getAmountsOut(1e7, [SCAMP, mock]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [SCAMP, mock], owner.address, Math.floor(Date.now()) + 10);


    const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    //const SCAMPPairOracle = await uniPairOracleFactory.deploy(factory.address, SCAMP, mock, owner.address);
    //const SCAMPPairOracle = uniPairOracleFactory.attach("0xCb9eC050962A3266899cE6885E97709B82f2A69d");
    //console.log("SCAMPPairOracle pair:", SCAMPPairOracle.address);

    //const CAMPPairOracle = await uniPairOracleFactory.deploy(factory.address, CAMP, mock, owner.address);
    //const CAMPPairOracle = uniPairOracleFactory.attach("0x9DeF80E4A328F287Fa2c8a981E8E5e0C76De73af");
    //console.log("CAMPPairOracle pair:", CAMPPairOracle.address);
    
    // await uniPairOracle.update();
    // console.log("is here?");
    // await uniPairOracle.setPeriod(300);

    // const amountOut = await uniPairOracle.consult(SCAMP.address, 1e6);
    // console.log("amountOut of oracle:", amountOut.toString());
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();