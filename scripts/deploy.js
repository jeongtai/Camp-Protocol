const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

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
    await mock.setBalance("0x91Add885cdF83Ba62578eF7de912067f52aB3130", toBn("10000"))
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
    await factory.createPair(SCAMP.address, mock.address);
    const SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
    console.log("SCAMP pair:", SCAMPPair);

    // create CAMP, mock pair
    await factory.createPair(CAMP.address, mock.address);
    const CAMPPair = await factory.getPair(CAMP.address, mock.address);
    console.log("CAMP pair:", CAMPPair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    const wKLAY = await wKLAYFactory.deploy();
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    console.log("router address:", router.address);
    console.log(await router.factory(), await router.WKLAY());

    // Approve and addLiquidity
    await SCAMP.approve(router.address, toBn("1e18"));
    const SCAMPAllowance = await SCAMP.allowance(owner.address, router.address);
    console.log("SCAMPAllowance:", SCAMPAllowance.toString());
    await mock.approve(router.address, toBn("1e18"));
    const mockAllowance = await mock.allowance(owner.address, router.address);
    console.log("mockCollatAllowance:", mockAllowance.toString());

    // console.log((await SCAMP.balanceOf(owner.address)).toString(), (await mock.balanceOf(owner.address)).toString())

    await router.addLiquidity(SCAMP.address, mock.address, 1e6, 1e6, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);

    await CAMP.approve(router.address, toBn("1e18"));
    await router.addLiquidity(CAMP.address, mock.address, 1e7, 1e6, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);

    // swap
    // const swapamounts = await router.getAmountsOut(1e6, [CAMP.address, mock.address]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [CAMP.address, mock.address], owner.address, Math.floor(Date.now()) + 10);

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairContract = PairFactory.attach(SCAMPPair);
    const reserve = await pairContract.getReserves();
    console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])

    const pairContract_CAMP = PairFactory.attach(CAMPPair);
    const reserve_CAMP = await pairContract_CAMP.getReserves();
    console.log(reserve_CAMP[0].toString(), reserve_CAMP[1].toString(), reserve_CAMP[2])

    const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    const uniPairOracle = await uniPairOracleFactory.deploy(factory.address, SCAMP.address, mock.address, owner.address);
    console.log("uniPairOracle pair:", uniPairOracle.address);

    // await uniPairOracle.update();
    console.log("is here?");
    console.log((await uniPairOracle.PERIOD()).toString());
    // await uniPairOracle.setPeriod(3600);

    const amountOut = await uniPairOracle.consult(SCAMP.address, 1e6);
    console.log("amountOut of oracle:", amountOut.toString());
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