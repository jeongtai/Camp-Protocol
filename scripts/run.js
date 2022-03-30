const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const daoAddress = "0x83528941Ab17AAAF21939dc98A5E7c25455cE4D3";

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy(owner.address);
    const SCAMP = await SCAMPFactory.attach("0x02dd4220425AAC67b1c8E2A80c4D228C926C8972");
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    // let CAMP = await CAMPFactory.deploy(owner.address);
    const CAMP = await CAMPFactory.attach("0x140Fe6e0f360D959c25D905042EfC78927990460");
    console.log("CAMP address is:", await CAMP.address);

    const assetOracleFactory = await ethers.getContractFactory("AssetOracle");
    // const assetOracle = await assetOracleFactory.deploy();
    const assetOracle = await assetOracleFactory.attach("0xEE2a8e4B50c225c8cb4996904Eb80F91013a24Dd");
    console.log("assetOracle:", assetOracle.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock = await mockFactory.deploy();
    const mock = await mockFactory.attach("0x054a15A61EE57eABfd92c493A0A9Ea186c0aa6E6");
    // await mock.setBalance("0x91Add885cdF83Ba62578eF7de912067f52aB3130", toBn("10000"))
    await mock.setBalance(owner.address, toBn("1000000"))
    console.log("mock address is:", await mock.address);

    SCAMPPoolLibraryFactory = await ethers.getContractFactory("SCAMPPoolLibrary");
    // let SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.deploy();
    const SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.attach("0x5c5462A3C21B45BaC7914f46826324C28563085b");
    console.log("SCAMPPoolLibrary address is:", await SCAMPPoolLibrary.address);

    BankFactory = await ethers.getContractFactory("SCAMPBank", {
        libraries: {
            SCAMPPoolLibrary: SCAMPPoolLibrary.address,
        },
    });
    // let Bank = await BankFactory.deploy(SCAMP.address, CAMP.address, mock.address, owner.address, assetOracle.address);
    const Bank = await BankFactory.attach("0xacf51f865a44FA4409f0cb506D3c9977049E0120");
    console.log("Bank address is:", Bank.address);

    // Set controller
    // await SCAMP.setController("0x91Add885cdF83Ba62578eF7de912067f52aB3130");
    // await SCAMP.setCAMPAddress(CAMP.address);
    // await SCAMP.setBankAddress(Bank.address);
    // await CAMP.setSCAMPAddress(SCAMP.address);
    // await SCAMP.setMintingFee(3000);

    // ADD LIQUIDITY
    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    // const factory = await uniConFactory.deploy(owner.address);
    const factory = uniConFactory.attach("0x04Ef5E35242e2A2E6d37678dc16661Ac33894e85"); // with wKLAY
    console.log("Factory address is:", factory.address);
    const pairCodeHash = await factory.pairCodeHash();
    console.log("pairCodeHash:", pairCodeHash);

    // create SCAMP, mock pair
    let SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
    if (SCAMPPair == ethers.constants.AddressZero) {
      console.log("create scamp pair");
      await factory.createPair(SCAMP.address, mock.address);
      SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
    }
    console.log("SCAMP pair:", SCAMPPair);

    // create CAMP, mock pair
    let CAMPPair = await factory.getPair(CAMP.address, mock.address);
    if (CAMPPair == ethers.constants.AddressZero) {
      console.log("create camp pair");
      await factory.createPair(CAMP.address, mock.address);
      CAMPPair = await factory.getPair(CAMP.address, mock.address);
    }
    console.log("CAMP pair:", CAMPPair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    // const wKLAY = await wKLAYFactory.deploy();
    const wKLAY = wKLAYFactory.attach("0xbb73258dd2d962A543B37902fe55655A1d136eC1");
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0x078b8039FAFbAbd8bDe429964589F7dC2C7866f8");
    console.log("router address:", router.address);

    // Approve and addLiquidity
    const SCAMPAllowance = await SCAMP.allowance(owner.address, router.address);
    if (SCAMPAllowance == 0) {
      await SCAMP.approve(router.address, toBn("10000"));
    }
    console.log("SCAMPAllowance:", SCAMPAllowance.toString());
    const mockAllowance = await mock.allowance(owner.address, router.address);
    if (mockAllowance == 0) {
      await mock.approve(router.address, toBn("10000"));
    }
    console.log("mockCollatAllowance:", mockAllowance.toString());

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    let pairContract = PairFactory.attach(SCAMPPair);
    // console.log(await pairContract.factory(), await pairContract.token0(), await pairContract.token1());
    let reserve = await pairContract.getReserves();
    console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    if (reserve[0] == 0) {
      console.log("add to liquidity to scamp pair");
      const tx = await router.addLiquidity(SCAMP.address, mock.address, toBn("100"), toBn("100"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
      SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
      pairContract = PairFactory.attach(SCAMPPair);
      console.log("SCAMP pair:", SCAMPPair);
      reserve = await pairContract.getReserves();
      console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    }
    
    const pairContract_CAMP = PairFactory.attach(CAMPPair);
    console.log("token0", await pairContract_CAMP.token0());
    let reserve_CAMP = await pairContract_CAMP.getReserves();
    console.log(reserve_CAMP[0].toString(), reserve_CAMP[1].toString(), reserve_CAMP[2])
    if (reserve_CAMP[0] == 0) {
      console.log("add to liquidity to camp pair");
      await CAMP.approve(router.address, toBn("10000"));
      await router.addLiquidity(CAMP.address, mock.address, toBn("100"), toBn("10"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
      CAMPPair = await factory.getPair(CAMP.address, mock.address);
      let pairContract_CAMP = PairFactory.attach(CAMPPair);
      console.log("CAMP pair:", CAMPPair);
      reserve_CAMP = await pairContract_CAMP.getReserves();
      console.log(reserve_CAMP[0].toString(), reserve_CAMP[1].toString(), reserve_CAMP[2])
    }

    // swap
    // const swapamounts = await router.getAmountsOut(1e6, [SCAMP.address, mock.address]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [SCAMP.address, mock.address], owner.address, Math.floor(Date.now()) + 10);

    const uniOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    // const scampPairOracle = await uniOracleFactory.deploy(factory.address, SCAMP.address, mock.address, owner.address);
    const scampPairOracle = uniOracleFactory.attach("0x5603d6Ea3395a1305Fdf7f58c9e263b6F71dfeD2");
    console.log("scampPairOracle:", scampPairOracle.address);
    // await scampPairOracle.setPeriod(1);
    console.log(await scampPairOracle.canUpdate());
    if (await scampPairOracle.canUpdate()) {
        console.log("scamp oracle is updated");
        await scampPairOracle.update();
    }

    // const campPairOracle = await uniOracleFactory.deploy(factory.address, CAMP.address, mock.address, owner.address);
    const campPairOracle = uniOracleFactory.attach("0xF606E76c36F170dc0BC65001c0c53BCc7fB50bD5");
    console.log("campPairOracle:", campPairOracle.address);
    if (await campPairOracle.canUpdate()) {
      console.log("camp oracle is updated");
      await campPairOracle.update();
  }

  // await assetOracle.setAssetOracle([scampPairOracle.address, campPairOracle.address]);
    console.log(await assetOracle.priceOracle(0));
    // // console.log(await assetOracle.priceOracle(1));

    // console.log((await assetOracle.getAssetPrice(CAMP.address)).toString());

    /////////////////////////////////////////////////////
    // Deploy to Bond
    const ClaimSwapCampUSDTLpDepositoryFactory = await ethers.getContractFactory("ClaimSwapCampUSDTLpDepository");
    // const ClaimSwapCampUSDTLpDepository = await ClaimSwapCampUSDTLpDepositoryFactory.deploy();
    const ClaimSwapCampUSDTLpDepository = ClaimSwapCampUSDTLpDepositoryFactory.attach("0xa0fee2DD524a531EC217C430f7D4F07fb1838782");
    console.log("ClaimSwapCampUSDTLpDepository address:", ClaimSwapCampUSDTLpDepository.address);

    // Deploy bond treasury
    const BondTreasuryFactory = await ethers.getContractFactory("BondTreasury");
    // const bondTreasury = await BondTreasuryFactory.deploy();
    const bondTreasury = BondTreasuryFactory.attach("0x43c48162032cFA4E3b75B46627f42B8e76116468");
    console.log("bondTreasury address:", bondTreasury.address);

    // initialize - bond mint
    // await bondTreasury.__initialize(daoAddress, CAMP.address);
    const BOND_GENESIS_AMOUNT = toBn("1000000");
    // await CAMP.Bond_mint(bondTreasury.address, BOND_GENESIS_AMOUNT);
    console.log("camp bond mint", (await CAMP.balanceOf(bondTreasury.address) / 1e18).toString());

    // initiailize depository
    // await ClaimSwapCampUSDTLpDepository.__initialize(
    //     CAMP.address, daoAddress, CAMPPair, CAMP.address, mock.address, bondTreasury.address, mock.address, assetOracle.address
    // );
    console.log("totaldebt", (await ClaimSwapCampUSDTLpDepository.totalDebt() / 1e18).toString());
    // await ClaimSwapCampUSDTLpDepository.initializeBondTerms(
    //     100, //_controlVariable 상수
    //     432000, //_vestingTerm in blokcs
    //     0.8e9, //_minimumPriceRate 할인된가격최저 1e9
    //     10000, //_maxPayout 1e4 10000=1%
    //     100, //_fee 100=1%
    //     toBn("1e6"), //_maxDebt 10e18 bond에서 만들 빚의 최대값
    //     toBn("1e4") //_initialDebt 초기 빚(다른 곳에서 쓴?)
    // );
    
    console.log("register", (await bondTreasury.isReserveToken(CAMPPair)));
    // register
    // await bondTreasury.register(CAMPPair, ClaimSwapCampUSDTLpDepository.address);
    
    console.log("max payout", (await ClaimSwapCampUSDTLpDepository.maxPayout() / 1e18).toString());

    // approve
    // Approve and addLiquidity
    console.log("CAMPPair is alive?", await pairContract_CAMP.symbol());
    let bondAllowance = await pairContract_CAMP.allowance(owner.address, ClaimSwapCampUSDTLpDepository.address);
    if (bondAllowance == 0) {
      await pairContract_CAMP.approve(ClaimSwapCampUSDTLpDepository.address, toBn("10000"));
    }
    console.log("bond allowance:", (await pairContract_CAMP.allowance(owner.address, ClaimSwapCampUSDTLpDepository.address)).toString());
    // deposit
    console.log("bond price:", (await ClaimSwapCampUSDTLpDepository.bondPrice() / 1e6).toString());
    console.log("CAMP, LP balance:", (await CAMP.balanceOf(owner.address)).toString(), (await pairContract_CAMP.balanceOf(owner.address)).toString());
    await ClaimSwapCampUSDTLpDepository.deposit(toBn("10"), await ClaimSwapCampUSDTLpDepository.bondPrice(), owner.address);
    console.log("CAMP, LP balance:", (await CAMP.balanceOf(owner.address)).toString(), (await pairContract_CAMP.balanceOf(owner.address)).toString());
    await ClaimSwapCampUSDTLpDepository.redeem(owner.address, false);
    console.log("CAMP, LP balance:", (await CAMP.balanceOf(owner.address)).toString(), (await pairContract_CAMP.balanceOf(owner.address)).toString());
  };
  
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