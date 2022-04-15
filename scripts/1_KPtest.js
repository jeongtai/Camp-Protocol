const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async() => {

  CAMPFactory = await ethers.getContractFactory("CAMP");
  let CAMP = await CAMPFactory.deploy(owner.address);
  // const CAMP = await CAMPFactory.attach("0x870D2f6dc98bc3365421DBEe36c97dAf11D1E128");
  console.log("CAMP address is:", await CAMP.address);

  


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