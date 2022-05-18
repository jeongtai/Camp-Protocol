const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");
const Klay = require("caver-js/packages/caver-klay");


const main = async () => {
    const [owner] = await ethers.getSigners();

    /* ============= EKL Contract Deploy =============== */
    EKLFactory = await ethers.getContractFactory("MEKL");
    // let EKL = await EKLFactory.deploy();
    const EKL = await EKLFactory.attach("0x9F3C49F5e83c43815c8710FdEB54876d6F649B14");
    console.log("EKL address is:", await EKL.address);
    
    m3MoonFactory = await ethers.getContractFactory("m3Moon");
    // let m3Moon = await m3MoonFactory.deploy();
    const m3Moon = await m3MoonFactory.attach("0xeCDDa9623c57e4539BE76EEEb0F43Ca73a441438");
    console.log("m3Moon address is:", await m3Moon.address);

    mpostEKLFactory = await ethers.getContractFactory("mpostEKL");
    // let mpostEKL = await mpostEKLFactory.deploy();
    const mpostEKL = await mpostEKLFactory.attach("0x0228CC95f101871Cc1Ca94F6C248F2840D176f90");
    console.log("mpostEKL address is:", await mpostEKL.address);

    kpEKLTokenFactory = await ethers.getContractFactory("kpEKLToken");
    // let kpEKL = await kpEKLTokenFactory.deploy();
    const kpEKL = await kpEKLTokenFactory.attach("0x4612f95b014814467BDB069422dAE5A427092520");
    console.log("kpEKL address is:", await kpEKL.address);

    MockLPFactory = await ethers.getContractFactory("MockLP");
    // let MockLP = await MockLPFactory.deploy();
    const MockLP = await MockLPFactory.attach("0xd44725E11821534AB6b9a17D80B75d47a907c0e3");
    console.log("MockLP address is:", await MockLP.address);

    FakeGaugeFactory = await ethers.getContractFactory("FakeGauge");
    // let FakeGauge = await FakeGaugeFactory.deploy(m3Moon.address);
    const FakeGauge = await FakeGaugeFactory.attach("0x06b14E4983565Db987a01fD54f4568814d04631f");
    console.log("FakeGauge address is:", await FakeGauge.address);

    FakeVoteEscrowFactory = await ethers.getContractFactory("FakeVoteEscrow");
    // let FakeVoteEscrow = await FakeVoteEscrowFactory.deploy(EKL.address, m3Moon.address);
    const FakeVoteEscrow = await FakeVoteEscrowFactory.attach("0x7c271c85e31F28935C7F90a25d84C822391D9433");
    console.log("FakeVoteEscrow address is:", await FakeVoteEscrow.address);

    FakeClaimFactory = await ethers.getContractFactory("FakeClaim");
    // let FakeClaim = await FakeClaimFactory.deploy(EKL.address, mpostEKL.address);
    const FakeClaim = await FakeClaimFactory.attach("0x380F3993203C9474Be468B0D1BEf4929d0F064A8");
    console.log("FakeClaim address is:", await FakeClaim.address);

    // FakeGaugeControllerFactory = await ethers.getContractFactory("FakeVote")
    // // let FakeVote = await FakeGaugeControllerFactory.deploy();
    // // const FakeVote = await FakeGaugeControllerFactory.attach("0x380F3993203C9474Be468B0D1BEf4929d0F064A8");
    // console.log("FakeVote address is:", await FakeVote.address);

    KSPFactory = await ethers.getContractFactory("MEKL");
    // let EKL = await EKLFactory.deploy();
    const KSP = await EKLFactory.attach("0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654");
    console.log("KSP address is:", await KSP.address);

    /* =====================================*/

    //Booster에 ekl이랑 m3Moon넣어주기.

    VoterProxyFactory = await ethers.getContractFactory("EklipseVoterProxy")
    // let VoterProxy = await VoterProxyFactory.deploy()
    const VoterProxy = await VoterProxyFactory.attach("0x0e084C4faEbc56292E48B1b1fFC3fb686Dd87c45");
    console.log("VoterProxy address is:", await VoterProxy.address);

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KP = await KPFactory.deploy(VoterProxy.address ,"Kprotocol Governance token", "KPG", owner.address);
    const KP = await KPFactory.attach("0xF05d180a169418959a017865866F0aBaF7DB7EAd");
    console.log("KP address is:", await KP.address);

    BoosterFactory = await ethers.getContractFactory("Booster");
    // let Booster = await BoosterFactory.deploy(VoterProxy.address, KP.address)
    const Booster = await BoosterFactory.attach("0xC1A05Bea7Ed1f6d21921EE1aEa28Dcf0bD67c071")
    console.log("Booster address is:", await Booster.address);

    TokenFactory = await ethers.getContractFactory("TokenFactory");
    // let tFactory = await TokenFactory.deploy(Booster.address);
    const tFactory = await TokenFactory.attach("0xafCF96Bfaa9fCb970bAB14E5aA3916236ff4dF79");
    console.log("tFactory address is:", await tFactory.address);

    RewardFactory = await ethers.getContractFactory("RewardFactory");
    // let rFactory = await RewardFactory.deploy(Booster.address);
    const rFactory = await RewardFactory.attach("0xB64c4b7dfb0c7076dC3D71b52C13824899806913");
    console.log("rFactory address is:", await rFactory.address);

    const mockUSDTFactory = await ethers.getContractFactory("mUSDT");
    // const mockUSDT = await mockUSDTFactory.deploy();
    const mockUSDT = await mockUSDTFactory.attach("0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167");
    console.log("mockUSDT:", mockUSDT.address);


    /*==============  Booster, VoterProxy set Function ==============*/
    
    // await Booster.setFactories(rFactory.address, tFactory.address);

    // await Booster.addPool(EKL3Moon, EKL33MoonGauge);
    // await VoterProxy.setOperator(Booster.address)

    // console.log(await Booster.poolInfo(0))

    // /* ===============EKL Depository=============== */

    DepositorFactory = await ethers.getContractFactory("EKLDepositor");
    // let EKLDepositor = await DepositorFactory.deploy(VoterProxy.address, kpEKL.address);
    const EKLDepositor = await DepositorFactory.attach("0xABe0F9cFf7d77aEd6b6C9107f0584f897cC0942d");
    console.log("EKLDepositor address is:", await EKLDepositor.address);

    /* =============== EKLDepository test =============== */

    // await VoterProxy.setDepositor(EKLDepositor.address)
    // await kpEKL.setOperator(EKLDepositor.address)

    // await EKL.approve(EKLDepositor.address, toBn("1e18"))

    // await EKLDepositor.depositEKL(toBn("50"), true)
    // await EKLDepositor.depositEKL(toBn("50"), false) 

    // await EKLDepositor.lockEklipse()


    /* =============== Stake&Lock Deploy =============== */

    kpEKLStakeFactory = await ethers.getContractFactory("BaseRewardPool");
    // let kpEKLStake = await kpEKLStakeFactory.deploy(kpEKL.address, EKL.address, Booster.address, rFactory.address);
    const kpEKLStake = await kpEKLStakeFactory.attach("0x58337263cf52A4906913866242cfdeE16dEe82Bb");
    console.log("kpEKLStake address is:", await kpEKLStake.address);

    kpStakeFactory = await ethers.getContractFactory("kpRewardPool");
    // let kpStake = await kpStakeFactory.deploy(KP.address, EKL.address, EKLDepositor.address, kpEKLStake.address, kpEKL.address, Booster.address, owner.address);
    const kpStake = await kpStakeFactory.attach("0x5042D8158d3c3C7f95374512b726fB2fA82EBa6B");
    console.log("kpStake address is:", await kpStake.address);

    TreasuryFundFactory = await ethers.getContractFactory("TreasuryFunds");
    // let TreasuryFund = await TreasuryFundFactory.deploy(owner.address);
    const TreasuryFund = await TreasuryFundFactory.attach("0xd4C8292dD4262e0b74fca1fAF523F3B962AB791d");
    console.log("TreasuryFund address is:", await TreasuryFund.address);

    // 1턴 쉬기

    kpLockerFactory = await ethers.getContractFactory("KPLockerV2");
    // let kpLocker = await kpLockerFactory.deploy();
    const kpLocker = await kpLockerFactory.attach("0xDc1b8Fe74ED56Fe11AB9ECfD7238aBaA8298f3d9");
    console.log("kpLocker address is:", await kpLocker.address);

    kpStakingProxyFactory = await ethers.getContractFactory("KPStakingProxyV2");
    // let kpStakingProxy = await kpStakingProxyFactory.deploy(kpLocker.address, Booster.address);
    const kpStakingProxy = await kpStakingProxyFactory.attach("0x02712572C2A5d2eA9F6Ec2eB5Ea0adf498657252");
    console.log("kpStakingProxy address is:", await kpStakingProxy.address);


    /* =============== kpEKLStake Run =============== */

    // await Booster.setTreasury(kpStakingProxy.address)
    // await Booster.setRewardContracts(kpEKLStake.address, kpStake.address)

    // await Booster.setFeeInfo(EKL3Moon)

    // await KP.updateOperator()
    // await kpEKL.approve(kpEKLStake.address, toBn("1e18"))

    // await EKL.mint(FakeClaim.address, toBn("1000"))
    // await mpostEKL.setBalance(FakeClaim.address, toBn("1000"))
    // await m3Moon.setBalance(FakeVoteEscrow.address, toBn("1000"))

    // await EKLDepositor.depositEKL(toBn("1"), true) 
    // await Booster.earmarkRewards()
    // await Booster.earmarkFees(0)

    // await kpEKLStake.stake(toBn("1"))

    // console.log(await kpEKLStake.earned(owner.address))
    // console.log(await kpEKLStake.rewardToken())

    // await kpEKLStake.getReward(owner.address, false)
    // await kpEKLStake.getkpEKLReward()
    // await kpEKLStake.withdrawAll(true)

    /* =============== kpStake Run =============== */

    // await Booster.mint_KP(owner.address, toBn("5000"))
    // await KP.approve(kpStake.address, toBn("1000"))

    // await kpStake.stake(toBn("10"))

    // console.log(await kpStake.earned(owner.address))

    // await kpStake.getKPReward(true)
    // await kpStake.withdrawAll(true)

    /* ================ kpLockRun ================ */

    // await kpLocker.setStakingContract(kpStakingProxy.address)
    
    // await kpLocker.setApprovals()
    // await kpStakingProxy.setApprovals()
    // await kpLocker.addReward(EKL.address, kpStakingProxy.address, true)
    // await kpLocker.addReward(kpEKL.address, kpStakingProxy.address, true)
    // await kpLocker.addReward(EKL3Moon, kpStakingProxy.address, true)
    // await kpLocker.addReward(postEKL, kpStakingProxy.address, true)

    // await Booster.sendExtras(postEKL, kpStakingProxy.address)
    // await kpStakingProxy.distribute()
    // await kpStakingProxy.distributeOther(postEKL)
    // await kpStakingProxy.distributeOther(EKL3Moon)

    // console.log(await kpLocker.getRewardForDuration(EKL3Moon))
    // console.log(await kpLocker.getRewardForDuration(EKL.address))
    // console.log(await kpLocker.getRewardForDuration(postEKL))

    // await KP.approve(kpLocker.address, toBn("100"))

    // await kpLocker.lock(owner.address, toBn("10"), 0)

    // console.log(await kpLocker.claimableRewards(owner.address))
    // await kpLocker.getReward(owner.address, true)

    /* ================ Vote ================ */

    await Booster.gaugevote(EKL33MoonGauge, "5403")


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