const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    const hardhatBank = await ethers.getContractFactory("Bank");
    // if (await ethers.getContract.getCode() === "0x940388cD4d49Af572626253f488f5Ad111Ae0196") { _; }
    // else {const bank = await hardhatBank.deploy();};
    // const bank = await hardhatBank.deploy();
    const bank = await hardhatBank.attach("0x470aC5e9E098731F0911003218505151e47a6aDD");
    console.log("bank address is:", bank.address);

    const TowerFactory = await ethers.getContractFactory("Tower");
    // const tower = await TowerFactory.deploy(bank.address);
    const tower = await TowerFactory.attach("0x3eb98F71f96e43005645Badd3AE678c9828b3708");
    console.log("tower address is:", tower.address);
    const mockFactory = await ethers.getContractFactory("MockUSDC");
    // const mockCollat = await mockFactory.deploy();
    const mockCollat = await mockFactory.attach("0x0548de7dfD8d8E81AD05E2d0FC0B7b02Bd58e96F");
    console.log("mockAddress", mockCollat.address);

    const CubeFactory = await ethers.getContractFactory("Cube");
    // const cube = await CubeFactory.deploy(bank.address, 0, owner.address, treasuryAddress);
    const cube = await CubeFactory.attach("0x1628b45f4e529ad14970FcD0d3Af4f0867cb9eD9");
    console.log("cube address is:", cube.address);

    // console.log("owner address is:", await bank.owner());
    await mockCollat.mint(owner.address, 1e12);

    // let _feeToSetter = bank.owner();
    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    // const factory = await uniConFactory.deploy(owner.address);
    const factory = await uniConFactory.attach("0x1786184Ab5826A2C5Af1e9c6157669C7Cc42C58c");
    console.log("uniFactory address is:", factory.address);

    // await factory.setFeeTo(_feeToSetter);
    // console.log("uniFactory address is:", await factory.feeToSetter());

    // console.log("who is owner?", factory.owner());
    // await factory.deployed();

    // const pairCodeHash = await factory.pairCodeHash();
    // console.log("pairCodeHash:", pairCodeHash);

    // Create cube pair
    // const cubePair = await factory.createPair(cube.address, mockCollat.address);
    const _cubePair = await factory.getPair(cube.address, mockCollat.address);
    console.log("cube pair:", _cubePair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    // const wKLAY = await wKLAYFactory.deploy();
    const wKLAY = await wKLAYFactory.attach("0x7B4e0D0170840114D4C8cbD4aF43Cb13874f8fDf");
    console.log("wKLAY address:", wKLAY.address);
    // const wKLAY = await wKLAYFactory.attach();

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = await RouterFactory.attach("0xC7749a2dF2a16DC49988D58Da568464452E0877B");
    console.log("router address:", router.address);

    // Approve and addLiquidity
    // await cube.approve(router.address, 1e6);
    // const cubeAllowance = await cube.allowance(owner.address, router.address);
    // console.log("cubeAllowance:", cubeAllowance.toString());
    // await mockCollat.approve(router.address, 1e6);
    // const mockCollatAllowance = await mockCollat.allowance(owner.address, router.address);
    // console.log("mockCollatAllowance:", mockCollatAllowance.toString());

    // let amountA, amountB, liquidity = await router.addLiquidity(cube.address, mockCollat.address, cubeAllowance, mockCollatAllowance, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 10);
    // console.log("Liquidity:", liquidity);

    const TwapFactory = await ethers.getContractFactory("TwapOracle");
    // const twap = await TwapFactory.deploy(_cubePair, cube.address);
    const twap = await TwapFactory.attach("0x9EBa3b557e51aAD79C8b631A50FF2bac9DFdb291");
    console.log("twap address:", twap.address);

    const ProfitControllerFactory = await ethers.getContractFactory("ProfitController");
    // const profitController = await ProfitControllerFactory.deploy();
    const profitController = await ProfitControllerFactory.attach("0x7d89Ce3F751AFA46b8C50D645a2cDe1C187cDd8a");
    console.log("profitController address:", profitController.address);

    const BankSafeFactory = await ethers.getContractFactory("BankSafe");
    // const bankSafe = await BankSafeFactory.deploy(bank.address, mockCollat.address, cube.address, profitController.address);
    const bankSafe = await BankSafeFactory.attach("0x907eA235AC43F8116b8Ec87F1152Ca638A8d3711");
    console.log("bankSafe address:", bankSafe.address);

    // await factory.createPair(tower.address, mockCollat.address);
    const towerPair = await factory.getPair(tower.address, mockCollat.address);
    console.log("towerPair pair:", towerPair);
    const ArbitragerFactory = await ethers.getContractFactory("Arbitrager");
    // const arbitrager = await ArbitragerFactory.deploy(bank.address, mockCollat.address, tower.address, cube.address, profitController.address, towerPair);
    const arbitrager = await ArbitragerFactory.attach("0x08995073AABcb1Ddea6C3e7b910A3D5b0EBb7eB8");
    console.log("arbitrager address:", arbitrager.address);
    
    // await bank.init(
    //   mockCollat.address, 
    //   tower.address,
    //   cube.address,
    //   _cubePair,
    //   twap.address,
    //   bankSafe.address,
    //   owner.address,
    //   arbitrager.address,
    //   profitController.address,
    //   toBn("0.8")
    //   );

      const cubeStakeFactory = await ethers.getContractFactory("CubeStake");
      // cubeStake = await cubeStakeFactory.deploy(cube.address);
      const cubeStake = cubeStakeFactory.attach("0xC0C40B7bD1B9Dfec77FECcF43451f61550c6090a");
      console.log("cubeStake address:", cubeStake.address);
      // cubeStake.init(profitController.address);
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