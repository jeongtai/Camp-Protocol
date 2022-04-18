const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    /* ============= Deploy =============== */

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KP = await KPFactory.deploy(VoterProxy ,"kprotocol governance token", "KP");
    const KP = await KPFactory.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    console.log("KP address is:", await KP.address);

    BTFactory = await ethers.getContractFactory("BondTreasury");
    let BondTreasury = await BTFactory.deploy();
    await BondTreasury.__initialize(owner.address, KP.address);
    // const BondTreasury = await BondTreasury.attach("0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690");
    console.log("BondTreasury address is:", await BondTreasury.address);
    

    VoterProxyFactory = await ethers.getContractFactory("EklipseVoterProxy");
    // let VoterProxy = await VoterProxyFactory.deploy();
    const VoterProxy = await VoterProxyFactory.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    console.log("VoterProxy address is:", await VoterProxy.address);

    BoosterFactory = await ethers.getContractFactory("Booster");
    // let Booster = await BoosterFactory.deploy(VoterProxy.address, KP.address);
    const Booster = await BoosterFactory.attach("0x9E545E3C0baAB3E08CdfD552C960A1050f373042");
    console.log("Booster address is:", await Booster.address);

    //EKL Gauge

    GaugeFactory = await ethers.getContractFactory("FakeGauge");
    // let Gauge = await GaugeFactory.deploy("0xd90a5a778f161b6631B3d77AA253d8F06EB11a0a");
    const Gauge = await GaugeFactory.attach("0x851356ae760d987E095750cCeb3bC6014560891C");
    console.log("Gauge address is:", await Gauge.address);

    TokenFactory = await ethers.getContractFactory("TokenFactory");
    // let tFactory = await TokenFactory.deploy(Booster.address);
    const tFactory = await TokenFactory.attach("0x4826533B4897376654Bb4d4AD88B7faFD0C98528");
    console.log("tFactory address is:", await tFactory.address);

    RewardFactory = await ethers.getContractFactory("RewardFactory");
    // let rFactory = await RewardFactory.deploy(Booster.address);
    const rFactory = await RewardFactory.attach("0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf");
    console.log("rFactory address is:", await rFactory.address);
    
    StashFactory = await ethers.getContractFactory("StashFactory");
    // let sFactory = await StashFactory.deploy(Booster.address, rFactory.address);
    const sFactory = await StashFactory.attach("0x0E801D84Fa97b50751Dbf25036d067dCf18858bF");
    console.log("sFactory address is:", await sFactory.address);

    /* ============ Set Functions ============*/

    // await Booster.setFactories(rFactory.address, sFactory.address, tFactory.address);
    // await Booster.addPool("0xd90a5a778f161b6631B3d77AA253d8F06EB11a0a", Gauge.address, 0);
    console.log(await Booster.poolInfo(0))
    console.log(await Booster.poolInfo(1))



    /* ============ User Functions ===========*/

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