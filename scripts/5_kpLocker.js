const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    /* ============= Deploy =============== */

    VoterProxyFactory = await ethers.getContractFactory("EklipseVoterProxy")
    const VoterProxy = await VoterProxyFactory.attach("0xb44A9e78CcC30Afa9BC3653E80b0F0FAAD498103");

    KPFactory = await ethers.getContractFactory("KPtoken");
    const KP = await KPFactory.attach("0x3CfE98669D401302d1420C98cb9E66813083E84D");

    EKLFactory = await ethers.getContractFactory("MEKL");
    const EKL = await EKLFactory.attach("0x9F3C49F5e83c43815c8710FdEB54876d6F649B14");

    m3MoonFactory = await ethers.getContractFactory("m3Moon");
    const m3Moon = await m3MoonFactory.attach("0xeCDDa9623c57e4539BE76EEEb0F43Ca73a441438");

    MockLPFactory = await ethers.getContractFactory("MockLP");
    const MockLP = await MockLPFactory.attach("0xd44725E11821534AB6b9a17D80B75d47a907c0e3");

    FakeVoteEscrowFactory = await ethers.getContractFactory("FakeVoteEscrow");
    const FakeVoteEscrow = await FakeVoteEscrowFactory.attach("0x7c271c85e31F28935C7F90a25d84C822391D9433");

    kpEKLTokenFactory = await ethers.getContractFactory("kpEKLToken");
    const kpEKL = await kpEKLTokenFactory.attach("0x4612f95b014814467BDB069422dAE5A427092520");

    BoosterFactory = await ethers.getContractFactory("Booster");
    const Booster = await BoosterFactory.attach("0xCD9C44B0bfA9c32850D9CD58c0584F1354D8efE4")

    RewardFactory = await ethers.getContractFactory("RewardFactory");
    const rFactory = await RewardFactory.attach("0x82806c80e4694397Cc25812dac6C5B00836Db995");

    DepositorFactory = await ethers.getContractFactory("EKLDepositor");
    const EKLDepositor = await DepositorFactory.attach("0xbb822Aec12F9F24CAA4B79bbbb18B604B8b0A159");

    kpEKLStakeFactory = await ethers.getContractFactory("BaseRewardPool");
    const kpEKLStake = await kpEKLStakeFactory.attach("0x6A31C5936b7c526e32E4Fe733cFBcaAf1e0aD7E8");

    kpStakeFactory = await ethers.getContractFactory("kpRewardPool");
    const kpStake = await kpStakeFactory.attach("0xb6a90199c935dBd0A08c22e539a4Be8EBAC5ef2E");

    TreasuryFundFactory = await ethers.getContractFactory("TreasuryFunds");
    // let TreasuryFund = await TreasuryFundFactory.deploy(owner.address);
    const TreasuryFund = await TreasuryFundFactory.attach("0xca918c2dc4762f97F31353BD7BC9C99ca5C11b03");
    console.log("TreasuryFund address is:", await TreasuryFund.address);

    kpLockerFactory = await ethers.getContractFactory("KPLockerV2");
    // let kpLocker = await kpLockerFactory.deploy();
    const kpLocker = await kpLockerFactory.attach("0xa0B71215d220B054ee0558A6E4dd03F985143ec1");
    console.log("kpLocker address is:", await kpLocker.address);

    kpStakingProxyFactory = await ethers.getContractFactory("KPStakingProxyV2");
    // let kpStakingProxy = await kpStakingProxyFactory.deploy(kpLocker.address, Booster.address);
    const kpStakingProxy = await kpStakingProxyFactory.attach("0x1124EF3DB0B8Df551Da5C00Ac9cBf2477175a369");
    console.log("kpStakingProxy address is:", await kpStakingProxy.address);

    /*================ set Function ==================*/
    // await Booster.setTreasury(kpStakingProxy.address)
    //Go to 4_kpEKL

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