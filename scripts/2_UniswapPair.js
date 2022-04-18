const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();

    KUSDFactory = await ethers.getContractFactory("KUSDtoken");
    // let KUSDtoken = await KUSDFactory.deploy("kprotocol USD token", "KUSD");
    const KUSD = await KUSDFactory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    console.log("KUSDtoken address is:", await KUSD.address);

    KPFactory = await ethers.getContractFactory("KPtoken");
    // let KPtoken = await KPFactory.deploy(VoterProxy ,"kprotocol governance token", "KP");
    const KP = await KPFactory.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    console.log("KPtoken address is:", await KP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock = await mockFactory.deploy();
    const mock = await mockFactory.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
    console.log("mock address is:", await mock.address);

    /* ========= Deploy Factory ======== */

    const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
    // const factory = await uniConFactory.deploy(owner.address);
    const factory = uniConFactory.attach("0x610178dA211FEF7D417bC0e6FeD39F05609AD788"); // with wKLAY
    console.log("Factory address is:", factory.address);
    const pairCodeHash = await factory.pairCodeHash();
    console.log("pairCodeHash:", pairCodeHash); //Need to fix paircode

    // create KUSD, mock pair
    let KUSDPair = await factory.getPair(KUSD.address, mock.address);
    if (KUSDPair == ethers.constants.AddressZero) {
        console.log("create KUSD pair");
        await factory.createPair(KUSD.address, mock.address);
        KUSDPair = await factory.getPair(KUSD.address, mock.address);
    }
    console.log("KUSD pair:", KUSDPair);

    // create KP, mock pair
    let KPPair = await factory.getPair(KP.address, mock.address);
    if (KPPair == ethers.constants.AddressZero) {
        console.log("create KP pair");
        await factory.createPair(KP.address, mock.address);
        KPPair = await factory.getPair(KP.address, mock.address);
    }
    console.log("KP pair:", KPPair);

    const wKLAYFactory = await ethers.getContractFactory("WKLAY");
    // const wKLAY = await wKLAYFactory.deploy();
    const wKLAY = wKLAYFactory.attach("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82");
    console.log("wKLAY address:", wKLAY.address);

    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    // const router = await RouterFactory.deploy(factory.address, wKLAY.address);
    const router = RouterFactory.attach("0x9A676e781A523b5d0C0e43731313A708CB607508");
    console.log("router address:", router.address);


    /* ========== Approve and addLiquidity =========*/


    const KUSDAllowance = await KUSD.allowance(owner.address, router.address);
    if (KUSDAllowance == 0) {
        await KUSD.approve(router.address, toBn("10000"));
    }
    console.log("KUSDAllowance:", KUSDAllowance.toString());
    const mockAllowance = await mock.allowance(owner.address, router.address);
    if (mockAllowance == 0) {
        await mock.approve(router.address, toBn("10000"));
    }
    console.log("mockCollatAllowance:", mockAllowance.toString());

    const PairFactory = await ethers.getContractFactory("UniswapV2Pair");
    let pairContract = PairFactory.attach(KUSDPair);
    // console.log(await pairContract.factory(), await pairContract.token0(), await pairContract.token1());
    let reserve = await pairContract.getReserves();
    console.log("KUSD pair", reserve[0].toString(), reserve[1].toString(), reserve[2])
    if (reserve[0] == 0) {
        console.log("add to liquidity to KUSD pair");
        const tx = await router.addLiquidity(KUSD.address, mock.address, toBn("100"), toBn("100"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
        KUSDPair = await factory.getPair(KUSD.address, mock.address);
        pairContract = PairFactory.attach(KUSDPair);
        console.log("KUSD pair:", KUSDPair);
        reserve = await pairContract.getReserves();
        console.log(reserve[0].toString(), reserve[1].toString(), reserve[2])
    }

    let pairContract_KP = PairFactory.attach(KPPair);
    let reserve_KP = await pairContract_KP.getReserves();
    console.log("KP pair", reserve_KP[0].toString(), reserve_KP[1].toString(), reserve_KP[2])
    if (reserve_KP[0] == 0) {
        console.log("add to liquidity to KP pair");
        await KP.approve(router.address, toBn("10000000"));
        await router.addLiquidity(KP.address, mock.address, toBn("10000"), toBn("1000"), 1e3, 1e3, owner.address, Math.floor(Date.now()) + 100);
        KPPair = await factory.getPair(KP.address, mock.address);
        pairContract_KP = PairFactory.attach(KPPair);
        console.log("KP pair:", KPPair);
        reserve_KP = await pairContract_KP.getReserves();
        console.log(reserve_KP[0].toString(), reserve_KP[1].toString(), reserve_KP[2])
    }

    // swap
    // const swapamounts = await router.getAmountsOut(1e6, [mock.address, KUSD.address]);
    // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // await router.swapExactTokensForTokens((swapamounts[0]*100000000000000000).toString(), swapamounts[1].toString(), [KUSD.address, mock.address], owner.address, Math.floor(Date.now()) + 10);

    const uniOracleFactory = await ethers.getContractFactory("UniswapPairOracle");
    // const KUSDPairOracle = await uniOracleFactory.deploy(factory.address, KUSD.address, mock.address, owner.address);
    const KUSDPairOracle = uniOracleFactory.attach("0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44");
    console.log("KUSDPairOracle:", KUSDPairOracle.address);
    await KUSDPairOracle.setPeriod(100); // 1 = 1초
    console.log(await KUSDPairOracle.canUpdate());
    if (await KUSDPairOracle.canUpdate()) {
        console.log("KUSD oracle is updated");
        await KUSDPairOracle.update();
    }

    // const KPPairOracle = await uniOracleFactory.deploy(factory.address, KP.address, mock.address, owner.address);
    const KPPairOracle = uniOracleFactory.attach("0x4A679253410272dd5232B3Ff7cF5dbB88f295319");
    console.log("KPPairOracle:", KPPairOracle.address);
    await KPPairOracle.setPeriod(100);
    console.log(await KPPairOracle.canUpdate());
    if (await KPPairOracle.canUpdate()) {
        console.log("KP oracle is updated");
        await KPPairOracle.update();
    }

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