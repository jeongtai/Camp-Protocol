const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
  const [owner] = await ethers.getSigners();
  const SCAMP = "0x8BC3D79E0eE2df7274c9048dE151F75EF13a03f0"
  const CAMP = "0x666F7ea2A0cc0980291ff1A33cBd5F979eC40522"
  const mock = "0xE1388E74fdA951bB7777E7F7F4D195443415E8CB"
  
  SCAMPPoolLibraryFactory = await ethers.getContractFactory("SCAMPPoolLibrary");
  // let SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.deploy();
  const SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.attach("0x20954A042B79E79f853Ce29FD66ecc639eE5d081");
  // console.log("SCAMPPoolLibrary address is:", await SCAMPPoolLibrary.address);

  BankFactory = await ethers.getContractFactory("SCAMPBank", {
      libraries: {
          SCAMPPoolLibrary: SCAMPPoolLibrary.address,
      },
  });
  // let Bank = await BankFactory.deploy(SCAMP, CAMP, mock, owner.address);
  const Bank = await BankFactory.attach("0xBbba6DBc7b3C2FCFE5676af9E646A115062f2d03");
  // console.log("Bank address is:", Bank.address);

  console.log((await Bank.collatDollarBalance()).toString())
  console.log((await Bank.availableExcessCollatDV()).toString())



  // console.log(await Bank.mintAlgorithmicSCAMP(1e7, 1))
  // console.log(await Bank.mintFractionalSCAMP(toBn("1"), toBn("10000"), 1))
  

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