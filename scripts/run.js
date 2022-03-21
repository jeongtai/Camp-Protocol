const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // const bank = await hardhatBank.attach("0x470aC5e9E098731F0911003218505151e47a6aDD");

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy(owner.address);
    const SCAMP = await SCAMPFactory.attach("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3");
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    // let CAMP = await CAMPFactory.deploy(owner.address);
    const CAMP = await CAMPFactory.attach("0xB9Faa17b39A576ff48EeAF179F437aC501688256");
    console.log("CAMP address is:", await CAMP.address);

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
    // let Bank = await BankFactory.deploy(SCAMP.address, CAMP.address, mock.address, owner.address);
    const Bank = await BankFactory.attach("0x1697E7a9934662c227199927FbcbfB2A6257F4D0");
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
    // const factory = uniConFactory.attach("0x4830404f3d7E98550b9743B6cD160E1574EFcceD");
    const factory = uniConFactory.attach("0x7A55846a845F7D2942978a58a0D31fa0395Fb2E3"); // with wKLAY
    console.log("Factory address is:", factory.address);
    const pairCodeHash = await factory.pairCodeHash();
    console.log("pairCodeHash:", pairCodeHash);
    // await factory.createPair(SCAMP.address, mock.address)
    const SCAMPPair = await factory.getPair(SCAMP.address, mock.address);
    console.log("SCAMP pair:", SCAMPPair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    // const wKLAY = await wKLAYFactory.deploy();
    // const wKLAY = wKLAYFactory.attach("0xfE639D18342a86bc751542ca651a915a588090A8");
    const wKLAY = wKLAYFactory.attach("0x1D8D03ad7D13389b095Fd6B8f98F00e12D2d2f19");
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0xA01a1D9887dA54459B4FF6ff154f32C872caAf44");
    console.log("router address:", router.address);
    console.log(await router.factory(), await router.WKLAY());

    // Approve and addLiquidity
    // await SCAMP.approve(router.address, toBn("1e18"));
    const SCAMPAllowance = await SCAMP.allowance(owner.address, router.address);
    console.log("cubeAllowance:", SCAMPAllowance.toString());
    // await mock.approve(router.address, toBn("1e18"));
    const mockAllowance = await mock.allowance(owner.address, router.address);
    console.log("mockCollatAllowance:", mockAllowance.toString());

    console.log((await SCAMP.balanceOf(owner.address)).toString(), (await mock.balanceOf(owner.address)).toString())

    // let liquidity = await router.addLiquidity(SCAMP.address, mock.address, 1e6, 1e6, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
    // console.log("Liquidity:", liquidity);

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairContract = PairFactory.attach(SCAMPPair);
    const reserve = await pairContract.getReserves();
    console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])

    const uniPairOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    // const uniPairOracle = await uniPairOracleFactory.deploy(factory.address, SCAMP.address, mock.address, owner.address);
    const uniPairOracle = uniPairOracleFactory.attach("0xe466293937f46db8F06B6989A99a2D6257036205");
    console.log("uniPairOracle pair:", uniPairOracle.address);

    await uniPairOracle.update();
    console.log("is here?");
    await uniPairOracle.setPeriod(300);

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