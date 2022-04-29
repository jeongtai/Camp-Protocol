const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    /* ============= EKL Contract Deploy =============== */

    EKLFactory = await ethers.getContractFactory("MEKL");
    // let EKL = await EKLFactory.deploy();
    const EKL = await EKLFactory.attach("0x70f1b7A318Ff0db9665D7AC089f08C29660C4cd8");
    console.log("EKL address is:", await EKL.address);
    
    m3MoonFactory = await ethers.getContractFactory("m3Moon");
    // let m3Moon = await m3MoonFactory.deploy();
    const m3Moon = await m3MoonFactory.attach("0x9d9D94F358cf2687c1Ec733614c96Ff1FeD19b0A");
    console.log("m3Moon address is:", await m3Moon.address);

    mpostEKLFactory = await ethers.getContractFactory("mpostEKL");
    // let mpostEKL = await mpostEKLFactory.deploy();
    const mpostEKL = await mpostEKLFactory.attach("0x0EE3653ddE98BC35265D5F4deE91Bd83647a7d69");
    console.log("mpostEKL address is:", await mpostEKL.address);

    kpEKLTokenFactory = await ethers.getContractFactory("kpEKLToken");
    // let kpEKL = await kpEKLTokenFactory.deploy();
    const kpEKL = await kpEKLTokenFactory.attach("0xb68a03fDb11b77a6e308324F4028696D8158e0C3");
    console.log("kpEKL address is:", await kpEKL.address);

    MockLPFactory = await ethers.getContractFactory("MockLP");
    // let MockLP = await MockLPFactory.deploy();
    const MockLP = await MockLPFactory.attach("0xa54e076050CCd4170109210b8b1cdaF39B1Ba886");
    console.log("MockLP address is:", await MockLP.address);

    FakeGaugeFactory = await ethers.getContractFactory("FakeGauge");
    // let FakeGauge = await FakeGaugeFactory.deploy(MockLP.address);
    const FakeGauge = await FakeGaugeFactory.attach("0x2645Cf839BbE3e2C032b88178F76Eb6a265347eb");
    console.log("FakeGauge address is:", await FakeGauge.address);

    FakeVoteEscrowFactory = await ethers.getContractFactory("FakeVoteEscrow");
    // let FakeVoteEscrow = await FakeVoteEscrowFactory.deploy(EKL.address, m3Moon.address);
    const FakeVoteEscrow = await FakeVoteEscrowFactory.attach("0x1d0e35A668F3dd38f9a229d5183699bE0a88Eb04");
    console.log("FakeVoteEscrow address is:", await FakeVoteEscrow.address);

    FakeClaimFactory = await ethers.getContractFactory("FakeClaim");
    // let FakeClaim = await FakeClaimFactory.deploy(EKL.address, mpostEKL.address);
    const FakeClaim = await FakeClaimFactory.attach("0x253849896FE279525E2fB0a54b4Aa5f2E5953d31");
    console.log("FakeClaim address is:", await FakeClaim.address);

    FakeGaugeControllerFactory = await ethers.getContractFactory("FakeVote")
    // let FakeVote = await FakeGaugeControllerFactory.deploy();
    const FakeVote = await FakeGaugeControllerFactory.attach("0xE4D9A4e8A8C11ECEA72cc0862EE92D03ad92c974");
    console.log("FakeVote address is:", await FakeVote.address);


    /*===========기본 Deploy 시작합니다 ========*/
    //Booster에 ekl이랑 m3Moon넣어주기.

    VoterProxyFactory = await ethers.getContractFactory("EklipseVoterProxy")
    // let VoterProxy = await VoterProxyFactory.deploy()
    const VoterProxy = await VoterProxyFactory.attach("0x58317183e6Cfc124C647b05c2Ce578f450cB57Bc");
    console.log("VoterProxy address is:", await VoterProxy.address);

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KP = await KPFactory.deploy(VoterProxy.address ,"kprotocol governance token", "KP", owner.address);
    const KP = await KPFactory.attach("0xEA049420C9210e324a631f499D3bDdC1FF3A7900");
    console.log("KP address is:", await KP.address);

    BoosterFactory = await ethers.getContractFactory("Booster");
    // let Booster = await BoosterFactory.deploy(VoterProxy.address, KP.address)
    const Booster = await BoosterFactory.attach("0x7C19914Cb216928953E050dA6a6C506f18edc72d")
    console.log("Booster address is:", await Booster.address);

    TokenFactory = await ethers.getContractFactory("TokenFactory");
    // let tFactory = await TokenFactory.deploy(Booster.address);
    const tFactory = await TokenFactory.attach("0x9B307477Eb90D05b5a40B51813F1ff9C8173B2cb");
    console.log("tFactory address is:", await tFactory.address);

    RewardFactory = await ethers.getContractFactory("RewardFactory");
    // let rFactory = await RewardFactory.deploy(Booster.address);
    const rFactory = await RewardFactory.attach("0xc57e86C23F2f56C326d75FbBfc19De7384de002A");
    console.log("rFactory address is:", await rFactory.address);


    /*==============  Booster, VoterProxy set Function ==============*/
    
    // await Booster.setFactories(rFactory.address, tFactory.address);

    // await Booster.addPool(MockLP.address, FakeGauge.address);
    // await VoterProxy.setOperator(Booster.address)

    // console.log(await Booster.poolInfo(0))


    /* ===============EKL Depository=============== */

    DepositorFactory = await ethers.getContractFactory("EKLDepositor");
    // let EKLDepositor = await DepositorFactory.deploy(VoterProxy.address, kpEKL.address);
    const EKLDepositor = await DepositorFactory.attach("0xAD7AA256071F4b04b3482D8366c910542CA499F9");
    console.log("EKLDepositor address is:", await EKLDepositor.address);

    /* =============== EKLDepository test =============== */

    // await VoterProxy.setDepositor(EKLDepositor.address)
    // await kpEKL.setOperator(EKLDepositor.address)
    // await EKL.mint(EKLDepositor.address, toBn("1000"))

    // await EKLDepositor.lockEklipse()
    // await EKLDepositor.withdrawexpiredekl()

    // await EKL.mint(owner.address, toBn("1000"))
    // await EKL.approve(EKLDepositor.address, toBn("1e18"))

    // await EKLDepositor.depositEKL(toBn("100"), true)
    // await EKLDepositor.depositEKL(toBn("50"), false) 

    // await EKLDepositor.lockEklipse()


    /* =============== Stake&Lock Deploy =============== */

    kpEKLStakeFactory = await ethers.getContractFactory("BaseRewardPool");
    // let kpEKLStake = await kpEKLStakeFactory.deploy(kpEKL.address, EKL.address, Booster.address, rFactory.address);
    const kpEKLStake = await kpEKLStakeFactory.attach("0x31Ac7dcfa5C383cf145711431FED48324F09950f");
    console.log("kpEKLStake address is:", await kpEKLStake.address);

    kpStakeFactory = await ethers.getContractFactory("kpRewardPool");
    // let kpStake = await kpStakeFactory.deploy(KP.address, EKL.address, EKLDepositor.address, kpEKLStake.address, kpEKL.address, Booster.address, owner.address);
    const kpStake = await kpStakeFactory.attach("0x196F32c72a18B390B9d8cd8Dd1c82EFDfB04D756");
    console.log("kpStake address is:", await kpStake.address);

    TreasuryFundFactory = await ethers.getContractFactory("TreasuryFunds");
    // let TreasuryFund = await TreasuryFundFactory.deploy(owner.address);
    const TreasuryFund = await TreasuryFundFactory.attach("0x9A2ECEC436B224F31973B2265A0c8F979F6c81c5");
    console.log("TreasuryFund address is:", await TreasuryFund.address);

    // 1턴 쉬기

    kpLockerFactory = await ethers.getContractFactory("KPLockerV2");
    // let kpLocker = await kpLockerFactory.deploy();
    const kpLocker = await kpLockerFactory.attach("0x7D58C2C2F56e3f47Fb25c7c8B02BBd7Ad594BC9B");
    console.log("kpLocker address is:", await kpLocker.address);

    kpStakingProxyFactory = await ethers.getContractFactory("KPStakingProxyV2");
    // let kpStakingProxy = await kpStakingProxyFactory.deploy(kpLocker.address, Booster.address);
    const kpStakingProxy = await kpStakingProxyFactory.attach("0xEa9898AcA831f4AA0a059ffeC5B831d3722B81C5");
    console.log("kpStakingProxy address is:", await kpStakingProxy.address);


    /* =============== kpEKLStake Run =============== */

    // await Booster.setTreasury(kpStakingProxy.address)
    // await Booster.setRewardContracts(kpEKLStake.address, kpStake.address)

    // await Booster.setFeeInfo(m3Moon.address)

    // await KP.updateOperator()
    // await kpEKL.approve(kpEKLStake.address, toBn("1e18"))
    // await EKL.mint(FakeClaim.address, toBn("1000"))
    // await mpostEKL.setBalance(FakeClaim.address, toBn("1000"))
    // await m3Moon.setBalance(FakeVoteEscrow.address, toBn("1000"))

    // await Booster.earmarkRewards()
    // await Booster.earmarkFees()

    // await kpEKL.approve(kpEKLStake.address, toBn("1000"))
    // await kpEKLStake.stake(toBn("50"))

    // console.log(await kpEKLStake.earned(owner.address))
    // console.log(await kpEKLStake.rewardToken())

    // await kpEKLStake.getReward(owner.address, false)
    // await kpEKLStake.getkpEKLReward()
    // await kpEKLStake.withdrawAll(true)

    /* =============== kpStake Run =============== */

    // await Booster.setBondTreasury(owner.address)
    // await Booster.mint_KP(toBn("1000"))

    // await KP.approve(kpStake.address, toBn("1000"))
    // await kpStake.stake(toBn("50"))

    // console.log(await kpStake.earned(owner.address))

    // await kpStake.getKPReward(true)
    // await kpStake.withdrawAll(false)

    /* ================ kpLockRun ================ */

    // await kpLocker.setStakingContract(kpStakingProxy.address)
    
    // await kpLocker.setApprovals()
    // await kpStakingProxy.setApprovals()
    // await kpLocker.addReward(EKL.address, kpStakingProxy.address, true)
    // await kpLocker.addReward(kpEKL.address, kpStakingProxy.address, true)
    // await kpLocker.addReward(m3Moon.address, kpStakingProxy.address, true)

    // await kpStakingProxy.distribute()
    // await kpStakingProxy.distributeOther(m3Moon.address)

    // await KP.approve(kpLocker.address, toBn("100"))

    // await kpLocker.lock(owner.address, toBn("10"), 0)

    // console.log(await kpLocker.claimableRewards(owner.address))
    // await kpLocker.getReward(owner.address, true)

    /* ================ Vote ================ */
    // await Booster.gaugevote(FakeGauge.address, toBn("100"))


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