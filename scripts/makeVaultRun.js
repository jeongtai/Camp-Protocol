const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    let SCAMP = await SCAMPFactory.deploy(owner.address);
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    let CAMP = await CAMPFactory.deploy(owner.address);
    console.log("CAMP address is:", await CAMP.address);

    const oracleFactory = await ethers.getContractFactory("AssetOracle");
    const oracle = await oracleFactory.deploy();
    console.log("oracle address:", oracle.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    let mock = await mockFactory.deploy();
    await mock.setBalance(owner.address, toBn("1000000"))
    console.log("mock address is:", await mock.address);

    SCAMPPoolLibraryFactory = await ethers.getContractFactory("SCAMPPoolLibrary");
    let SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.deploy();
    console.log("SCAMPPoolLibrary address is:", await SCAMPPoolLibrary.address);

    BankFactory = await ethers.getContractFactory("SCAMPBank", {
        libraries: {
            SCAMPPoolLibrary: SCAMPPoolLibrary.address,
        },
    });
    let Bank = await BankFactory.deploy(SCAMP.address, CAMP.address, mock.address, owner.address, oracle.address);
    console.log("Bank address is:", Bank.address);

    // Set controller
    await SCAMP.setController("0x91Add885cdF83Ba62578eF7de912067f52aB3130");
    await SCAMP.setCAMPAddress(CAMP.address);
    await SCAMP.setBankAddress(Bank.address);
    await CAMP.setSCAMPAddress(SCAMP.address);
    await SCAMP.setMintingFee(3000);

    // ADD LIQUIDITY
    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await uniConFactory.deploy(owner.address);
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
    const wKLAY = await wKLAYFactory.deploy();
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    console.log("router address:", router.address);

    // Approve and addLiquidity
    const SCAMPAllowance = await SCAMP.allowance(owner.address, router.address);
    if (SCAMPAllowance == 0) {
      await SCAMP.approve(router.address, toBn("100e18"));
    }
    console.log("SCAMPAllowance:", SCAMPAllowance.toString());
    const mockAllowance = await mock.allowance(owner.address, router.address);
    if (mockAllowance == 0) {
      await mock.approve(router.address, toBn("100e18"));
    }
    console.log("mockCollatAllowance:", mockAllowance.toString());

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairContract = PairFactory.attach(SCAMPPair);
    // console.log(await pairContract.factory(), await pairContract.token0(), await pairContract.token1());
    let reserve = await pairContract.getReserves();
    console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    if (reserve[0] == 0) {
      console.log("add to liquidity to scamp pair");
      const tx = await router.addLiquidity(SCAMP.address, mock.address, toBn("1e4"), toBn("1e4"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
      SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
      let pairContract = PairFactory.attach(SCAMPPair);
      console.log("SCAMP pair:", SCAMPPair);
      reserve = await pairContract.getReserves();
      console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    }
    
    const pairContract_CAMP = PairFactory.attach(CAMPPair);
    let reserve_CAMP = await pairContract_CAMP.getReserves();
    console.log(reserve_CAMP[0].toString(), reserve_CAMP[1].toString(), reserve_CAMP[2])
    if (reserve_CAMP[0] == 0) {
      console.log("add to liquidity to camp pair");
      await CAMP.approve(router.address, toBn("1e18"));
      await router.addLiquidity(CAMP.address, mock.address, toBn("1e5"), toBn("1e4"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
      CAMPPair = await factory.getPair(CAMP.address, mock.address);
      let pairContract_CAMP = PairFactory.attach(CAMPPair);
      console.log("CAMP pair:", CAMPPair);
      reserve_CAMP = await pairContract_CAMP.getReserves();
      console.log(reserve_CAMP[0].toString(), reserve_CAMP[1].toString(), reserve_CAMP[2])
    }

    // swap
    // const swapamounts = await router.getAmountsOut(1e6, [CAMP.address, mock.address]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [CAMP.address, mock.address], owner.address, Math.floor(Date.now()) + 10);

    const uniOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    const scampPairOracle = await uniOracleFactory.deploy(factory.address, SCAMP.address, mock.address, owner.address);
    console.log("scampPairOracle:", scampPairOracle.address);
    await scampPairOracle.setPeriod(1);
    console.log(await scampPairOracle.canUpdate());
    if (await scampPairOracle.canUpdate()) {
        console.log("scamp oracle is updated");
        await scampPairOracle.update();
    }

    const campPairOracle = await uniOracleFactory.deploy(factory.address, CAMP.address, mock.address, owner.address);
    console.log("campPairOracle:", campPairOracle.address);
    await campPairOracle.setPeriod(1);
    if (await campPairOracle.canUpdate()) {
        console.log("camp oracle is updated");
        await campPairOracle.update();
    }

    const assetOracleFactory = await ethers.getContractFactory("AssetOracle");
    const assetOracle = await assetOracleFactory.deploy();
    console.log("assetOracle:", assetOracle.address);
    await assetOracle.setAssetOracle([scampPairOracle.address, campPairOracle.address]);
    // console.log(await assetOracle.priceOracle(0));
    // console.log(await assetOracle.priceOracle(1));

    console.log((await assetOracle.getAssetPrice(SCAMP.address)).toString());

    /////////////////////////////////////////////////////
    // Deploy to Bond
    const ClaimSwapCampUSDTLpDepositoryFactory = await ethers.getContractFactory("ClaimSwapCampUSDTLpDepository");
    const ClaimSwapCampUSDTLpDepository = await ClaimSwapCampUSDTLpDepositoryFactory.deploy();
    console.log("ClaimSwapCampUSDTLpDepository address:", ClaimSwapCampUSDTLpDepository.address);
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