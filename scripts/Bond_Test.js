const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    /* ============= Deploy =============== */

    MockLPFactory = await ethers.getContractFactory("MockLP");
    const MockLP = await MockLPFactory.attach("0xa54e076050CCd4170109210b8b1cdaF39B1Ba886");

    KPFactory = await ethers.getContractFactory("KPtoken");
    const KP = await KPFactory.attach("0xEA049420C9210e324a631f499D3bDdC1FF3A7900");

    TreasuryFundFactory = await ethers.getContractFactory("TreasuryFunds");
    const TreasuryFund = await TreasuryFundFactory.attach("0x9A2ECEC436B224F31973B2265A0c8F979F6c81c5");
  
    BoosterFactory = await ethers.getContractFactory("Booster");
    const Booster = await BoosterFactory.attach("0x7C19914Cb216928953E050dA6a6C506f18edc72d")

    m3MoonFactory = await ethers.getContractFactory("m3Moon");
    const m3Moon = await m3MoonFactory.attach("0x9d9D94F358cf2687c1Ec733614c96Ff1FeD19b0A");

    const assetOracleFactory = await ethers.getContractFactory("AssetOracle");
    // const assetOracle = await assetOracleFactory.deploy();
    const assetOracle = await assetOracleFactory.attach("0xd72a313462772086A213fe348836Bb4483fFcdD1");
    console.log("assetOracle:", assetOracle.address);

    const mockUSDTFactory = await ethers.getContractFactory("mUSDT");
    // const mockUSDT = await mockUSDTFactory.deploy();
    const mockUSDT = await mockUSDTFactory.attach("0x6F8F170f91E6CB940729e721e1a717aE85179000");
    console.log("mockUSDT:", mockUSDT.address);


    /* ================ Oracle Set ================ */

        // ADD LIQUIDITY
    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    // const factory = await uniConFactory.deploy(owner.address);
    const factory = uniConFactory.attach("0x646454dad6FD50Ec892c8261E664122fAC92fc83"); // with wKLAY
    console.log("Factory address is:", factory.address);
    const pairCodeHash = await factory.pairCodeHash();
    console.log("pairCodeHash:", pairCodeHash);

       // create KP, mock pair
    let KPPair = await factory.getPair(KP.address, mockUSDT.address);
    if (KPPair == ethers.constants.AddressZero) {
        console.log("create KP pair");
        await factory.createPair(KP.address, mockUSDT.address);
        KPPair = await factory.getPair(KP.address, mockUSDT.address);
    }
    console.log("KP pair:", KPPair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    // const wKLAY = await wKLAYFactory.deploy();
    const wKLAY = wKLAYFactory.attach("0x04599B6a58Ef78679d302F4b9d61793dc065C203");
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0x33340f4Aab478AE6e219e63d9dcBfe4B39058cF8");
    console.log("router address:", router.address);

    // // Approve and addLiquidity
    const KPAllowance = await KP.allowance(owner.address, router.address);
    if (KPAllowance == 0) {
        await KP.approve(router.address, toBn("10000"));
    }
    console.log("KPAllowance:", KPAllowance.toString());
    const mockAllowance = await mockUSDT.allowance(owner.address, router.address);
    if (mockAllowance == 0) {
        await mockUSDT.approve(router.address, toBn("10000"));
    }
    console.log("mockCollatAllowance:", mockAllowance.toString());

    // await mockUSDT.setBalance(owner.address, toBn("1000"))

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    let pairContract = PairFactory.attach(KPPair);
    // console.log(await pairContract.factory(), await pairContract.token0(), await pairContract.token1());
    let reserve = await pairContract.getReserves();
    console.log("KP pair", reserve[0].toString(), reserve[1].toString(), reserve[2])
    if (reserve[0] == 0) {
        console.log("add to liquidity to KP pair");
        const tx = await router.addLiquidity(KP.address, mockUSDT.address, toBn("100"), toBn("10"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
        KPPair = await factory.getPair(KP.address, mockUSDT.address);
        pairContract = PairFactory.attach(KPPair);
        console.log("KP pair:", KPPair);
        reserve = await pairContract.getReserves();
        console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    }

    // swap
    // const swapamounts = await router.getAmountsOut(1e6, [mock.address, KP.address]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens((swapamounts[0]*100000000000000000).toString(), swapamounts[1].toString(), [KP.address, mock.address], owner.address, Math.floor(Date.now()) + 10);

    const uniOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    // const KPPairOracle = await uniOracleFactory.deploy(factory.address, KP.address, mockUSDT.address, owner.address);
    const KPPairOracle = uniOracleFactory.attach("0xf7762eaa1d6709c43dadc8b9A0F2D39DAED35bbB");
    console.log("KPPairOracle:", KPPairOracle.address);

    // await KPPairOracle.setPeriod(10000); // 1 = 1초
    console.log(await KPPairOracle.canUpdate());
    if (await KPPairOracle.canUpdate()) {
        console.log("KP oracle is updated");
        await KPPairOracle.update();
    }
    // console.log(await KPPairOracle.consult(KP.address, 1e6))

    // await assetOracle.setAssetOracle([KPPairOracle.address]);

    console.log((await assetOracle.getAssetPrice(KP.address)).toString());
    

    /* ================ Bond Deploy ================*/


    m3MoonBondDepositoryFactory = await ethers.getContractFactory("m3Moon_BondDepository");
    // let m3MoonBondDepository = await m3MoonBondDepositoryFactory.deploy();
    const m3MoonBondDepository = await m3MoonBondDepositoryFactory.attach("0xcB6BE8DA7DFEC6D1E7F0c2De17518811F6eBaA7e");
    console.log("m3MoonBondDepository address is:", await m3MoonBondDepository.address);

    BondTreasuryFactory = await ethers.getContractFactory("BondTreasury");
    // let BondTreasury = await BondTreasuryFactory.deploy();
    const BondTreasury = await BondTreasuryFactory.attach("0x32aE8958049bf1147ED85BaC49C04Fc63ECDBad1");
    console.log("BondTreasury address is:", await BondTreasury.address);

    // await BondTreasury.__initialize(TreasuryFund.address, KP.address);
    // await m3MoonBondDepository.__initialize(
    //   KP.address, TreasuryFund.address, m3Moon.address, assetOracle.address);
    // await m3MoonBondDepository.initializeBondTerms(
    //   100, //_controlVariable 상수/
    //   432000, //_vestingTerm in blokcs
    //   0.9e9, //_minimumPriceRate 할인된가격최저 1e9
    //   10000, //_maxPayout 1e4 10000=1%
    //   100, //_fee 100=1%
    //   toBn("1e8"), //_maxDebt 10e18 bond에서 만들 빚의 최대값
    //   0
    // );
    
    // register

    // console.log("max payout", (await m3MoonBondDepository.maxPayout() / 1e18).toString());
    // console.log(await m3MoonBondDepository.currentDebt())

    // await BondTreasury.register(m3Moon.address, m3MoonBondDepository.address);    
    // await BondTreasury.setBooster(Booster.address)
    // await Booster.setBondTreasury(BondTreasury.address)
    // await m3MoonBondDepository.setTreasury(BondTreasury.address)

    // await BondTreasury.setApprovals()
    // console.log("register", (await BondTreasury.isReserveToken(m3Moon.address)).toString());

    // await Booster.mint_KP(toBn("1e6"))
    // await m3Moon.setBalance(owner.address, toBn("1000"))

    // await m3Moon.approve(m3MoonBondDepository.address, toBn("1e18"))
    // await m3MoonBondDepository.deposit(toBn("100"), await m3MoonBondDepository.bondPrice(), owner.address);

    // await BondTreasury.depositAll(1)

    /* ================ set Function ==================*/

    // await m3MoonBondDepository.__initialize(KP.address, TreasuryFund.address,)

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