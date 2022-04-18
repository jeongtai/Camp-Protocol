const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    const VoterProxy = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

    /*TOken Deploy */

    KUSDFactory = await ethers.getContractFactory("KUSDtoken");
    // let KUSD = await KUSDFactory.deploy("kprotocol USD token", "KUSD");
    const KUSD = await KUSDFactory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    console.log("KUSD address is:", await KUSD.address);

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KP = await KPFactory.deploy(VoterProxy ,"kprotocol governance token", "KP");
    const KP = await KPFactory.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    console.log("KP address is:", await KP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock = await mockFactory.deploy();
    const mock = await mockFactory.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
    console.log("mock address is:", await mock.address);

    /*Bank Deploy */

    const assetOracleFactory = await ethers.getContractFactory("AssetOracle");
    // const assetOracle = await assetOracleFactory.deploy();
    const assetOracle = await assetOracleFactory.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
    console.log("assetOracle:", assetOracle.address);

    KUSDPoolLibraryFactory = await ethers.getContractFactory("KUSDPoolLibrary");
    // let KUSDPoolLibrary = await KUSDPoolLibraryFactory.deploy();
    const KUSDPoolLibrary = await KUSDPoolLibraryFactory.attach("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    console.log("KUSDPoolLibrary address is:", await KUSDPoolLibrary.address);

    BankFactory = await ethers.getContractFactory("KUSDBank", {
      libraries: {
        KUSDPoolLibrary: KUSDPoolLibrary.address,
      },
    });
    // let Bank = await BankFactory.deploy(KP.address, KUSDtoken.address, mock.address, assetOracle.address);
    const Bank = await BankFactory.attach("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");
    console.log("Bank address is:", Bank.address);

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