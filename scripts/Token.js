const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
  const [owner] = await ethers.getSigners();
  const router = "0x82aF5E09b1Da619AE47b70b78EA7393ba8578356"
  const bank = "0xd1A6ccb6350fd74123a71eeb8c7e85C1d21312f5"
  SCAMPFactory = await ethers.getContractFactory("SCAMP");
  // //let SCAMP = await SCAMPFactory.deploy(owner.address);
  const SCAMP = await SCAMPFactory.attach("0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0");

  // await SCAMP.setSCAMPOracleAddress("0xCb9eC050962A3266899cE6885E97709B82f2A69d")
  // await SCAMP.setCAMPOracleAddress("0x9DeF80E4A328F287Fa2c8a981E8E5e0C76De73af")

  // await SCAMP.setSCAMPStep(2500)
  await SCAMP.refreshCollateralRatio()
  // console.log(await SCAMP.SCAMPBank())
  // console.log(await SCAMP.SCAMP_info())
  // await SCAMP.setMintingFee(3000)
  // await SCAMP.setRedemptionFee(3000)
  // await SCAMP.setUSDTAddress("0xE1388E74fdA951bB7777E7F7F4D195443415E8CB")

  CAMPFactory = await ethers.getContractFactory("CAMP");
  // //let CAMP = await CAMPFactory.deploy(owner.address);
  const CAMP = await CAMPFactory.attach("0x666F7ea2A0cc0980291ff1A33cBd5F979eC40522");

  // await CAMP.setSCAMPAddress("0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0")

  MOCKFactory = await ethers.getContractFactory("MockUSDC");
  // // //let mock = await MOCKFactory.deploy();
  const mock = await MOCKFactory.attach("0xE1388E74fdA951bB7777E7F7F4D195443415E8CB");
  await mock.setBalance(owner.address, toBn("100"))
  // console.log((await mock.balanceOf(owner.address)).toString())


  // // Approve
  // await SCAMP.approve(bank, toBn("1e18"));
  // const SCAMPAllowance = await SCAMP.allowance(owner.address, bank);
  // await CAMP.approve(bank, toBn("300000"));
  const CAMPAllowance = await CAMP.allowance(owner.address, bank)  
  console.log("CAMPAllowance:", CAMPAllowance.toString());
  // await mock.approve(bank, toBn("30000"));
  const mockAllowance = await mock.allowance(owner.address, bank);
  console.log((await mock.balanceOf(owner.address)).toString())
  console.log("mockCollatAllowance:", mockAllowance.toString());

  // console.log((await SCAMP.balanceOf(owner.address)).toString(), (await mock.balanceOf(owner.address)).toString())
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