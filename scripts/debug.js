// We import Chai to use its asserting functions here.
const { default: BigNumber } = require("bignumber.js");
// const { default: Caver } = require("caver-js");
const { expect } = require("chai");
const { toBn } = require("evm-bn");

describe("Token contract", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    let bank, tower, cube;
    let hardhatBank;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let towerAddress, cubeAddress;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    before(async function () {
        // Get the ContractFactory and Signers here.
        hardhatBank = await ethers.getContractFactory("Bank");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Bank.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        bank = await hardhatBank.deploy();
        console.log("bank address is:", await bank.address);
    });

    describe("tower token deployment", async function (){
        it("genesis case", async function() {
            TowerFactory = await ethers.getContractFactory("Tower");
            // owner = await ethers.getSigners();
            tower = await TowerFactory.deploy(bank.address);
            console.log("tower address is:", tower.address);
            console.log("owner address is:", owner.address);

            const ownerBalance = await tower.balanceOf(owner.address);
            expect(await tower.totalSupply()).to.equal(ownerBalance);
            towerAddress = tower.address;
        });

        it("burn case", async function(){
            console.log("owner balance:", await tower.balanceOf(owner.address));
            await tower.addBurnAddress(owner.address);
            await tower.burn(owner.address, BigNumber(1e18).toFixed(0));
            console.log("owner balance:", await tower.balanceOf(owner.address));
        });
    });

    describe("cube token deployment", async function (){
        it("genesis case", async function() {
            CubeFactory = await ethers.getContractFactory("Cube");
            cube = await CubeFactory.deploy(bank.address, 0, owner.address, addr1.address);
            console.log("cube address is:", cube.address);
            console.log("team address is:", owner.address);
            console.log("treasury address is:", addr1.address);
            // console.log("current blockstamp is:", 0);

            cubeAddress = cube.address;
            await cube.balanceOf(owner.address).then(function (f) {console.log("mint small amount of cube:", f.toString())});

            const unclaimedBalance = await cube.unclaimedTeamFund();
            console.log("unclaimed team balance:", unclaimedBalance);

            await cube.claimTeamFundRewards(addr2.address);
            console.log("claimed team balance:", await cube.balanceOf(addr2.address));
            // const vestingBalance = await (cube.balanceOf(addr1.address)) + (await cube.balanceOf(addr2.address));
            // console.log("claimed team balance2:", vestingBalance);

            // expect(await unclaimedBalance).to.equal(vestingBalance);
        });
    });

    describe("bank initialization", function () {
        let _collat;
        let _tower = towerAddress;
        let _cube = cubeAddress;
        let _cubePair;
        let _oracle;
        let _safe;
        let _dustbin;
        let _arbitrager;
        let _profitController;
        let _swapController;
        let _tcr; // uint256

        let mockCollat, mockCollatAddress;
        let factory;
        let pairCodeHash;
        let profitController;
        let twap, bankSafe, arbitrager, cubeStake;
    
        it("create mockUSDC", async function () {
            const mockFactory = await ethers.getContractFactory("MockUSDC");
            mockCollat = await mockFactory.deploy();
    
            // const owner = await ethers.getSigners();
            // await mockCollat.mint(owner.address, BigNumber("100e18").toFixed(0));
            await mockCollat.mint(owner.address, 1e15);
            const balance = await mockCollat.balanceOf(owner.address).then(function (f) {console.log("mint small amount of collateral:", f.toString())});
    
            _collat = await mockCollat.address;
            mockCollatAddress = mockCollat.address;
        });

        it("create cubePair based on uniswapV2Pair/Factory", async function () {
            let _feeToSetter = owner.address;
            const uniConFactory = await ethers.getContractFactory("UniswapV2Factory");
            const uniFactory = await uniConFactory.deploy(_feeToSetter);
            // console.log("uniFactory address is:", await uniFactory.feeToSetter());

            await uniFactory.setFeeTo(_feeToSetter);
            // console.log("uniFactory address is:", await uniFactory.feeToSetter());
            console.log(cubeAddress, mockCollatAddress);

            await uniFactory.createPair(cubeAddress, mockCollatAddress).then(function (f){console.log("cube pair:", f.address)});
            await uniFactory.allPairsLength().then(function (f) {console.log("the number of pairs:", f.toString())});
            _cubePair = await uniFactory.getPair(cubeAddress, mockCollatAddress);
            console.log("cube pair:", _cubePair);
            factory = uniFactory;

            // get pairCodeHash()
            pairCodeHash = await uniFactory.pairCodeHash();
            console.log("pairCodeHash:", pairCodeHash);
        });

        it("deploy router and add liquidities", async function () {
            const wKLAYFactory = await ethers.getContractFactory("WKLAY");
            const wKLAY = await wKLAYFactory.deploy();

            const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
            const router = await RouterFactory.deploy(factory.address, wKLAY.address);
            console.log("router address:", router.address);

            // add liquidites
            // console.log(Date.now(), Math.floor(Date.now() / 1000) + 60 * 10);
            await cube.approve(router.address, 1e6);
            await mockCollat.approve(router.address, 1e6);
            let amountA, amountB, liquidity = await router.addLiquidity(cubeAddress, mockCollatAddress, 1e6, 1e6, 1e3, 1e3, owner.address, Math.floor(Date.now()) + 10);
            console.log("Liquidity:", liquidity);
        });

        it("deploy twap oracle", async function () {
            const TwapFactory = await ethers.getContractFactory("TwapOracle");
            twap = await TwapFactory.deploy(_cubePair, cubeAddress);
            console.log("twap address:", twap.address);
        });

        it("deploy banksafe", async function () {
            const ProfitControllerFactory = await ethers.getContractFactory("ProfitController");
            profitController = await ProfitControllerFactory.deploy();
            console.log("profitController address:", profitController.address);

            const BankSafeFactory = await ethers.getContractFactory("BankSafe");
            console.log(bank.address, mockCollatAddress, cubeAddress, profitController.address);
            bankSafe = await BankSafeFactory.deploy(bank.address, mockCollatAddress, cubeAddress, profitController.address);
            console.log("bankSafe address:", bankSafe.address);
        });

        it("deploy arbitrager", async function () {
            await factory.createPair(tower.address, mockCollatAddress);
            _towerPair = await factory.getPair(tower.address, mockCollatAddress);
            console.log("_towerPair pair:", _towerPair);
            const ArbitragerFactory = await ethers.getContractFactory("Arbitrager");
            // console.log(_profitController.address);
            arbitrager = await ArbitragerFactory.deploy(bank.address, mockCollat.address, tower.address, cubeAddress, profitController.address, _towerPair);
            console.log("arbitrager address:", arbitrager.address);
        });

        it("finally initialize bank", async function () {
            await bank.init(
                mockCollatAddress, 
                tower.address,
                cube.address,
                _cubePair,
                twap.address,
                bankSafe.address, 
                owner.address,
                arbitrager.address,
                profitController.address,
                toBn("0.8")
                );
        });

        it("deploy CubeStake", async function () {
            const cubeStakeFactory = await ethers.getContractFactory("CubeStake");
            cubeStake = await cubeStakeFactory.deploy(cube.address);
            console.log("cubeStake address:", cubeStake.address);
            await cubeStake.init(profitController.address);
            const Amt = await cubeStake.calcAccAmt();
            console.log("Amt:", Amt.toString());

            // Sttake
            const currentCubeBalance = await cube.balanceOf(owner.address);
            console.log(currentCubeBalance.toString());
            // await cube.approve(owner.address, 1e6);
            await cube.approve(cubeStake.address, 1e6);
            const cubeAllowByOwner = await cube.allowance(owner.address, owner.address);
            const cubeAllowByStake = await cube.allowance(owner.address, cubeStake.address);
            console.log("cube allowance:", cubeAllowByOwner.toString(), cubeAllowByStake.toString());
            console.log("cubeStake owner:", await cubeStake.owner());
            await cubeStake.stake(1e6);

            // Check how many xCube are
            let userInfo = (await cubeStake.pendingxCube(owner.address)).toString();
            console.log("userInfo:", userInfo);

            // await cubeStake.unstake(1e6);
            // console.log("userInfo:", userInfo);
            const lockInfo = await cubeStake.userLockInfo(owner.address);
            console.log(lockInfo[0].toString(), lockInfo[1].toString());

            const cubeAmt = await cubeStake.cubePerShare();
            console.log(cubeAmt.toString());
        });
    });
});