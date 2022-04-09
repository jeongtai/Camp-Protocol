const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();
    let i = 0;


    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy(owner.address);
    const SCAMP = await SCAMPFactory.attach("0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d");
    console.log("SCAMP address is:", await SCAMP.address);

    //SWAP
    while (i < 100) {
        try {
           await SCAMP.refreshCollateralRatio();
            console.log(i)
            i += 1
        } catch (e) {
            console.log("fail")
        }
    }
    // console.log("Finish")

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