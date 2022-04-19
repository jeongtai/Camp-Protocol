const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();
    const BondT = "0xE4A2D6c04405BEbf5284dA87D6e0714FaF20c588"

    VoterProxyFactory = await ethers.getContractFactory("EklipseVoterProxy");
    // let VoterProxy = await VoterProxyFactory.deploy();
    const VoterProxy = await VoterProxyFactory.attach("0xA64310D109C707DD42248FACa21fD3fa0c6b3f70");
    console.log("VoterProxy address is:", await VoterProxy.address);

    /*TOken Deploy */

    KUSDFactory = await ethers.getContractFactory("KUSDtoken");
    // let KUSD = await KUSDFactory.deploy("kprotocol USD", "KUSD", owner.address);
    const KUSD = await KUSDFactory.attach("0xBd309075273D8ebe4f09E5748Ef56aEb21bD4b98");
    console.log("KUSD address is:", await KUSD.address);

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KP = await KPFactory.deploy(VoterProxy.address ,"kprotocol token", "KP", owner.address);
    const KP = await KPFactory.attach("0xc8598d3770557fC23aA68566E38586E1c7EED778");
    console.log("KP address is:", await KP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock1 = await mockFactory.deploy();
    const mock1 = await mockFactory.attach("0xE08177F3b94Da80e04e911126E5087f8Fe5807ae");
    console.log("mock address is:", await mock1.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock2 = await mockFactory.deploy();
    const mock2 = await mockFactory.attach("0xB513979f2773d05971Ee729E21cc69e1AD1b9b52");
    console.log("mock address is:", await mock2.address);


    /*Bank Deploy */

    const assetOracleFactory = await ethers.getContractFactory("AssetOracle");
    // const assetOracle = await assetOracleFactory.deploy();
    const assetOracle = await assetOracleFactory.attach("0xaE128B5ea43615Bd40c639C5617492B90B33F0c5");
    console.log("assetOracle:", assetOracle.address);

    // KUSDPoolLibraryFactory = await ethers.getContractFactory("KUSDPoolLibrary");
    // // let KUSDPoolLibrary = await KUSDPoolLibraryFactory.deploy();
    // const KUSDPoolLibrary = await KUSDPoolLibraryFactory.attach("0xd273b93626FA553b23c28f04eEB666282F9B7507");
    // console.log("KUSDPoolLibrary address is:", await KUSDPoolLibrary.address);

    // BankFactory = await ethers.getContractFactory("KUSDBank", {
    //   libraries: {
    //     KUSDPoolLibrary: KUSDPoolLibrary.address,
    //   },
    // });
    // // let Bank = await BankFactory.deploy(KP.address, KUSD.address, mock.address, assetOracle.address);
    // const Bank = await BankFactory.attach("0xA2c050b8c0E297Dd676886B3098C5061293418b7");
    // console.log("Bank address is:", Bank.address);

    /* ============= setFunction ===========*/
    // await assetOracle.setAssetOracle(["0xcB02e69A21788C9655bA135FC2AC11D83f660DF4"])
    console.log(await assetOracle.getAssetPrice(KP.address))
    // console.log("BondT bal :", (await KP.balanceOf(BondT)).toString());
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