const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();
    
    const KPPair = "0x90D838383C242de023Cc9Ec950820e310606c8b7"
    const mock = "0xE08177F3b94Da80e04e911126E5087f8Fe5807ae"
    const KP = "0xc8598d3770557fC23aA68566E38586E1c7EED778"
    const Oracle = "0x7BAFFfd2CDbeFB05d9746594E4c7E3b5f8241e69"
    const controlvar = 100;
    const vestingTerm = 3600;
    const minimumPriceRate = 9*10**8;
    const maxPayout = 1e4;
    const fee = 1e4;
    const maxDebt = toBn("1000000000")

    /* ============= Deploy =============== */

    BondDepositoryFactory = await ethers.getContractFactory("USDT_USDC_BondDepository");
    // let BondDepository = await BondDepositoryFactory.deploy();
    // await BondDepository.__initialize(KP, owner.address, KPPair, KP, mock, Oracle);
    const BondDepository = await BondDepositoryFactory.attach("0x77F654514Af1460e553eC0A8DbC6D34b42CC8c08");
    console.log("BondDepository address is:", await BondDepository.address);

    BTFactory = await ethers.getContractFactory("BondTreasury");
    // let BondTreasury = await BTFactory.deploy();
    // await BondTreasury.__initialize(owner.address, KP);
    const BondTreasury = await BTFactory.attach("0xE4A2D6c04405BEbf5284dA87D6e0714FaF20c588");
    console.log("BondTreasury address is:", await BondTreasury.address);

    /* ============= set Function ============*/

    // await BondDepository.setTreasury(BondTreasury.address);
    // await BondDepository.initializeBondTerms(controlvar, vestingTerm, minimumPriceRate, maxPayout, fee, maxDebt, 0);
    // await BondTreasury.register(KPPair, BondDepository.address);
    // console.log("register", (await BondTreasury.isReserveToken(KPPair)).toString());



    /* ============= user Function ============*/
    // console.log(await BondDepository.principle())
    // console.log((await KP_USDTLP.balanceOf(owner.address)).toString())
    // console.log((await KP_USDTLP.balanceOf(BondTreasury.address)).toString())
  
    // await BondDepository.deposit(toBn("0.1"), 1e8, owner.address);

    // console.log((await KP_USDTLP.balanceOf(owner.address)).toString())
    // console.log((await KP_USDTLP.balanceOf(BondTreasury.address)).toString())


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