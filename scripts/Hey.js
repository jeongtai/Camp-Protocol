const { ethers } = require("hardhat");
const { toBn, fromBn } = require("evm-bn");


const main = async () => {
  const [owner] = await ethers.getSigners();

  SCAMPFactory = await ethers.getContractFactory("SCAMP");
//  let SCAMP = await SCAMPFactory.deploy(owner.address);
  const SCAMP = await SCAMPFactory.attach("0xBc7404E4D6E570a92D13D65e79Fc08bd546E68c6");

  //console.log("current ratio is : ", (await SCAMP.current_collateral_ratio()).toString())
  await SCAMP.setMintingFee(4000)
  console.log(await SCAMP.SCAMP_info())
//   console.log("current ratio is : ", (await SCAMP.current_collateral_ratio()).toString())
  

  CAMPFactory = await ethers.getContractFactory("CAMP");
//   // let CAMP = await CAMPFactory.deploy(owner.address)
  const CAMP = await CAMPFactory.attach("0x87617d1154E093d7C423705548BcEef157068902")
//   console.log("CAMP address is : ", await CAMP.address)
//   //await CAMP.setSCAMPAddress("0x59f993d526153f7eF5e2a17ACB73bE018D33285f")

  MOCKFactory = await ethers.getContractFactory("MockUSDC");
//   let mock = await MOCKFactory.deploy();
  const mock = await MOCKFactory.attach("0x42E576491E22046655f771d9A9186782D2928aC4");
//   console.log("Mock address is : " , await mock.address)

  /*============================= */
  
  // ADD LIQUIDITY
  //const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
  //const factory = await uniConFactory.deploy(owner.address);
  //const factory = uniConFactory.attach("0xbe8c5b5cCf3178678022D1a2021A36Ee92e84883"); // with wKLAY
  //console.log("Factory address is:", factory.address);
  //const pairCodeHash = await factory.pairCodeHash(); // 0xd71edf953945430074e6b2db235a40dc76f0aa2a57aa34b3e8178f915f0d7c0d
  //console.log("pairCodeHash:", pairCodeHash);
  //await factory.createPair(SCAMP.address, mock.address)
  //const CAMPPair = await factory.getPair(CAMP.address, mock.address);
  //console.log("SCAMP pair:", SCAMPPair); //0xAF052B09Eb6dCd7CFD181D38e9cB7bAeBd6b9F78
  //console.log("CAMP pair:", CAMPPair) // 0x4Be8240cEe0a1AC06f74Dd36Ac83E43FdA2aC826

  //const wKLAYFactory = await ethers.getContractFactory("WKLAY");
  //const wKLAY = await wKLAYFactory.deploy();
  //const wKLAY = wKLAYFactory.attach("0x8a84C32ac7F69AAc6BA48DD8D996a81F3b50cdE9");
  //console.log("wKLAY address:", wKLAY.address);

  //const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
  //const router = await RouterFactory.deploy(factory.address, wKLAY.address);
  //const router = RouterFactory.attach("0x6D6b74C4cE6f0d989281066CB0206Ed9E44D608b");
  // console.log("router address:", router.address);
  // console.log(await router.factory(), await router.WKLAY());

  // // Approve and addLiquidity
  //await CAMP.approve(router.address, toBn("1e18"));
  //const CAMPAllowance = await CAMP.allowance(owner.address, router.address);
  //console.log("CAMPAllowance:", CAMPAllowance.toString());
  //await mock.approve(router.address, toBn("1e18"));
  //const mockAllowance = await mock.allowance(owner.address, router.address);
  //console.log("mockCollatAllowance:", mockAllowance.toString());

  //console.log((await CAMP.balanceOf(owner.address)).toString(), (await mock.balanceOf(owner.address)).toString())
  //await mock.setBalance(owner.address, toBn("1000000"))
  //console.log("Hello!")
  //let liquidity = await router.addLiquidity(CAMP.address, mock.address, 1e8, 1e7, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
  //console.log("Liquidity:", liquidity);

  //const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
  //const pairContract = PairFactory.attach(CAMPPair);
  //const reserve = await pairContract.getReserves();
  //console.log(await pairContract.token1())
  //console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])


  // const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
  // const uniPairOracle = await uniPairOracleFactory.deploy("0xbe8c5b5cCf3178678022D1a2021A36Ee92e84883", CAMP.address, mock.address, owner.address);
  // //const uniPairOracle = await uniPairOracleFactory.attach("0xD825C6f76d0aF4f11578c62e5F1a66C68D89FF94");
  // console.log("uniPairOracle pair:", uniPairOracle.address);

  // //await uniPairOracle.update();
  // console.log("is here?");
  // //await uniPairOracle.setPeriod(3000);
  // console.log((await uniPairOracle.canUpdate()).toString())
  //const amountOut = await uniPairOracle.consult(mock.address, 1e6);
  //console.log("amountOut of oracle:", amountOut.toString());


  /*=====================================*/

//SCAMP : 0xBc7404E4D6E570a92D13D65e79Fc08bd546E68c6
//CAMP : 0x87617d1154E093d7C423705548BcEef157068902
//Mock : 0x42E576491E22046655f771d9A9186782D2928aC4
//SCAMP Oracle : 0x19165eDb6644Cd61eCc7C33Dd87a7b950afd7260
//CAMP Oracle : 0xD825C6f76d0aF4f11578c62e5F1a66C68D89FF94
  // await SCAMP.setSCAMPOracleAddress('0x19165eDb6644Cd61eCc7C33Dd87a7b950afd7260')
  // await SCAMP.setCAMPOracleAddress('0xD825C6f76d0aF4f11578c62e5F1a66C68D89FF94')
  // await SCAMP.setUSDTAddress('0x42E576491E22046655f771d9A9186782D2928aC4')
  // console.log((await SCAMP.SCAMP_Price()).toString())
  // console.log((await SCAMP.CAMP_Price()).toString())
  // console.log(await SCAMP.usdt_address())
  //console.log((await SCAMP.SCAMP_Price()).toString())
  //console.log((await SCAMP.CAMP_Price()).toString())
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