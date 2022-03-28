const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
  const SCAMP = "0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0"
  const CAMP = "0x666F7ea2A0cc0980291ff1A33cBd5F979eC40522"

  const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
  // const SCAMPPairOracle = await uniPairOracleFactory.deploy(factory.address, SCAMP, mock, owner.address);
  const SCAMPPairOracle = uniPairOracleFactory.attach("0xCb9eC050962A3266899cE6885E97709B82f2A69d");
  // console.log("SCAMPPairOracle pair:", SCAMPPairOracle.address);

  // const CAMPPairOracle = await uniPairOracleFactory.deploy(factory.address, CAMP, mock, owner.address);
  const CAMPPairOracle = uniPairOracleFactory.attach("0x9DeF80E4A328F287Fa2c8a981E8E5e0C76De73af");
  // console.log("CAMPPairOracle pair:", CAMPPairOracle.address);
  
  console.log(await SCAMPPairOracle.canUpdate())
  console.log(await CAMPPairOracle.canUpdate())

  await SCAMPPairOracle.update();
  await CAMPPairOracle.update();

  // console.log("is here?");
  // await SCAMPPairOracle.setPeriod(30000);
  // await CAMPPairOracle.setPeriod(30000);


  //const amountOut = await SCAMPPairOracle.consult(SCAMP, 1e6);
  // console.log("amountOut of SCAMPoracle:", amountOut.toString());

  // const amountOut1 = await CAMPPairOracle.consult(CAMP, 1e6);
  // console.log("amountOut of CAMPoracle:", amountOut1.toString());

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