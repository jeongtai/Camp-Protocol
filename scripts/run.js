const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy(owner.address);
    const SCAMP = await SCAMPFactory.attach("0x874bE0D86a760f44Ebf2415cA159Da716675514d");
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    // let CAMP = await CAMPFactory.deploy(owner.address);
    const CAMP = await CAMPFactory.attach("0xfA5a0e02840E2D66e0793b58F46ea54B88f5865D");
    console.log("CAMP address is:", await CAMP.address);

    const oracleFactory = await ethers.getContractFactory("AssetOracle");
    // const oracle = await oracleFactory.deploy();
    const oracle = await oracleFactory.attach("0xfF61c99808a2b281e3399b2b97B33D2118916680");
    console.log("oracle address:", oracle.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock = await mockFactory.deploy();
    const mock = await mockFactory.attach("0x886C3A92f7439060F43ed0b54ba08850ABd62213");
    // await mock.setBalance("0x91Add885cdF83Ba62578eF7de912067f52aB3130", toBn("10000"))
    // await mock.setBalance(owner.address, toBn("1000000"))
    console.log("mock address is:", await mock.address);

    SCAMPPoolLibraryFactory = await ethers.getContractFactory("SCAMPPoolLibrary");
    // let SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.deploy();
    const SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.attach("0x66e6b9d4c9a56444DfB01ce925118401Cab4300c");
    console.log("SCAMPPoolLibrary address is:", await SCAMPPoolLibrary.address);

    BankFactory = await ethers.getContractFactory("SCAMPBank", {
        libraries: {
            SCAMPPoolLibrary: SCAMPPoolLibrary.address,
        },
    });
    // let Bank = await BankFactory.deploy(SCAMP.address, CAMP.address, mock.address, owner.address, oracle.address);
    const Bank = await BankFactory.attach("0xfd8721C3315b3BE59C85B03bcC9FE1042F0d88FB");
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
    const factory = uniConFactory.attach("0x3e84f626469D508cb973984528Fc1A5A306F5463"); // with wKLAY
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
    const wKLAY = wKLAYFactory.attach("0x1D8D03ad7D13389b095Fd6B8f98F00e12D2d2f19");
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0x0C4c082F2cB8CE68fBDF6559899BDC9E367a69A2");
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

    const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    const uniPairOracle = await uniPairOracleFactory.deploy(factory.address, SCAMP.address, mock.address, owner.address);
    // const uniPairOracle = uniPairOracleFactory.attach("0xe466293937f46db8F06B6989A99a2D6257036205");
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