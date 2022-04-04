const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");
const {IStakedToken} = require("../typechain/ethers-v5");
const {BN} = require("bignumber.js");

const main = async () => {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [owner] = await ethers.getSigners();
    const vaultAddress = "0xAfdd88343096Fee11BdF7babDF22DB013953577D";
    //Deploy to Stake
    const scampFactory = await ethers.getContractFactory('SCAMP');
    // const scampToken = await scampFactory.deploy(owner.address);

    const scampToken = await scampFactory.attach('0x8E7Ab742B0cE5428B8DCb6CF921AF2654754686c')
    console.log(`scampToken : ${scampToken.address}`)

    const campFactory = await ethers.getContractFactory('CAMP');
    // const campToken = await campFactory.deploy(owner.address);
    const campToken = await campFactory.attach('0x4064efE5Be75B199D59C5957643095360aB71c5A')
    // CAMP.Staking_mint(CAMP.address, 100000000).then(console.log(owner.getBalance()));
    console.log(`campToken : ${campToken.address}`)

    const mockFactory = await ethers.getContractFactory('MockUSDC')
    // const mockToken = await mockFactory.deploy();
    const mockToken = await mockFactory.attach('0x5a8e7E54fEC4dc7D73647a9FbA33844eCB9A175B');
    console.log(`mockToken : ${mockToken.address}`)

    const stakedCampFactory = await ethers.getContractFactory('StakeCAMP');

    // const stakedCAMP10d = await stakedCampFactory.deploy(
    //     campToken.address,   //  IKIP7 stakedToken
    //     86400 * 10,      // uint256 heatUpSeconds // 86400 = 1day
    //     86400 * 7,           // uint256 unstakeWindow
    //     vaultAddress,          // address rewardsVault
    //     owner.address,       // address emissionManager
    //     "CAMP stake 10 days", // string memory name
    //     "stCAMP10d",            // string memory symbol
    //     18                    // uint8 decimals
    //      );
    // stakedCAMP10d.deployed()
    // const stakedCAMP10d = await stakedCampFactory.attach('0x0B543B6147413A31c4d62fD278bB4f2E674A79cf');
    // console.log("stakedCAMP10d : ", stakedCAMP10d.address);
    // console.log(await stakedCAMP10d.HEATUP_SECONDS());

    // const stakedCAMP3m = await stakedCampFactory.deploy(
    //     campToken.address,   //  IKIP7 stakedToken
    //     86400 * 30 * 3,      // uint256 heatUpSeconds // 86400 = 1day
    //     86400 * 7,           // uint256 unstakeWindow
    //     vaultAddress,          // address rewardsVault
    //     owner.address,       // address emissionManager
    //     "CAMP stake 3 months", // string memory name
    //     "stCAMP3m",            // string memory symbol
    //     18                    // uint8 decimals
    //      );
    // stakedCAMP3m.deployed()
    // const stakedCAMP3m = await stakedCampFactory.attach('0xFB71FF6EA904E251005b331C988B59D5Beb0e835');
    // console.log(await stakedCAMP3m.HEATUP_SECONDS());
    // console.log("stakedCAMP3m : ", stakedCAMP3m.address);

    // const stakedCAMP6m = await stakedCampFactory.deploy(
    //     campToken.address,   //  IKIP7 stakedToken
    //     86400 * 30 * 6,      // uint256 heatUpSeconds // 86400 = 1day
    //     86400 * 7,           // uint256 unstakeWindow
    //     vaultAddress,          // address rewardsVault
    //     owner.address,       // address emissionManager
    //     "CAMP stake 6 months", // string memory name
    //     "stCAMP6m",            // string memory symbol
    //     18                    // uint8 decimals
    // );
    // stakedCAMP6m.deployed()
    // const stakedCAMP6m = await stakedCampFactory.attach('0xc4284ADE1b2De786C7A89dB8110FafAD797351B3');
    // console.log("stakedCAMP6m : ", stakedCAMP6m.address);
    // console.log(await stakedCAMP6m.HEATUP_SECONDS());

    // const stakedCAMP9m = await stakedCampFactory.deploy(
    //     campToken.address,   //  IKIP7 stakedToken
    //     86400 * 30 * 9,      // uint256 heatUpSeconds // 86400 = 1day
    //     86400 * 7,           // uint256 unstakeWindow
    //     vaultAddress,          // address rewardsVault
    //     owner.address,       // address emissionManager
    //     "CAMP stake 9 months", // string memory name
    //     "stCAMP9m",            // string memory symbol
    //     18                    // uint8 decimals
    // );
    // stakedCAMP9m.deployed()
    // const stakedCAMP9m = await stakedCampFactory.attach('0xbbF29995F4be236FA694ef352117d3E2F9C1607d');
    // console.log("stakedCAMP9m : ", stakedCAMP9m.address);
    // console.log(await stakedCAMP9m.HEATUP_SECONDS());

    // const stakedCAMPtest = await stakedCampFactory.deploy(
    //     campToken.address,   //  IKIP7 stakedToken
    //     60,                  // uint256 heatUpSeconds // 86400 = 1day
    //     86400 * 7,           // uint256 unstakeWindow
    //     vaultAddress,          // address rewardsVault
    //     owner.address,       // address emissionManager
    //     "CAMP stake test", // string memory name
    //     "stCAMPt",            // string memory symbol
    //     18                    // uint8 decimals
    // );
    // stakedCAMPtest.deployed()
    const stakedCAMPtest = await stakedCampFactory.attach('0xdadD37cf3f96d396613E7A1EE4cd20c367F2987a');
    console.log("stakedCAMPtest : ", stakedCAMPtest.address);
    // console.log("stakedCAMPtest HEATUP_SECONDS : ", await stakedCAMPtest.HEATUP_SECONDS());
    // console.log("stakedCAMPtest UNSTAKE_WINDOW : ", await stakedCAMPtest.UNSTAKE_WINDOW());

    await stakedCAMPtest.initialize(
        campToken.address,
        "CAMP stake test",
        "stCAMPt",
        18,
        "0xdadD37cf3f96d396613E7A1EE4cd20c367F2987a",
        100,
        1001
        );
    await stakedCAMPtest.configureAsset(); // 아직 못한 부분

    console.log(stakedCAMPtest)

    // await campToken.approve(stakedCAMPtest.address, toBn("100e18"));
    // console.log("stakedCAMPtest approved campToken!!!!");
    await stakedCAMPtest.stake(owner.address, "10000000000000000000");
    console.log("stakerRewardsToClaim : ", await stakedCAMPtest.stakerRewardsToClaim[owner.address]);
    await stakedCAMPtest.heatup();
    // console.log(await `stakersHeatups[owner.address] : ${stakedCAMPtest.stakersHeatups[owner.address]}`);
    // await stakedCAMPtest.redeem(owner.address, "100000000000000000000000")

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