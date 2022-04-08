const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
    const [owner] = await ethers.getSigners();
    let i = 0;

    KLAY = "0xe4f05a66ec68b54a58b17c22107b02e0232cc817"
    KUSDT = "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
    USDK = "0xd2137Fdf10bD9e4E850C17539eB24cfe28777753"
    KROME = "0xfbd0314d55eab31c9fc0b2d162748017f1bc7b85"

    SCAMP = "0xbcb51E0C1fF0Cf95176Ee5EA08b7da3832AD377d";
    mock = "0x8d4DFc6586F70e6F1F08d3FaA96Afa297A1CA060";


    const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
    const router = RouterFactory.attach("0xEf71750C100f7918d6Ded239Ff1CF09E81dEA92D"); // cypress
    // const router = RouterFactory.attach("0x781808722E5a3628518D4cdd3b9C47CF01b2c3Cb"); // baobab
    

    // KLAYFactory = await ethers.getContractFactory("WKLAY");
    // // //let mock = await MOCKFactory.deploy();
    // const klay = await KLAYFactory.attach("0xe4f05a66ec68b54a58b17c22107b02e0232cc817");

    // await klay.approve(router.address, toBn("1e18"))
    // KUSDTFactory = await ethers.getContractFactory("KlaytnToken");
    // // //let mock = await MOCKFactory.deploy();
    // const usdt = await KUSDTFactory.attach("0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167");
    // await usdt.approve(router.address, toBn("1e18"))

    //SWAP
    while (i < 30) {
        try {
            // const swapamounts = await router.getAmountsOut(toBn("1"), [KLAY, KROME]);
            const swapamounts = await router.getAmountsOut(10000, [KUSDT, USDK]);
            console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString(), await swapamounts[0].toString()/await swapamounts[1].toString());
            if (( await swapamounts[0].toString() /await swapamounts[1].toString()) < 7 ) {
              await router.swapExactTokensForTokens(swapamounts[0].toString(), (swapamounts[1]*0.9).toString(), [KUSDT, USDK], owner.address, Math.floor(Date.now()) + 10);
            } else {
              console.log("Swap finished!")
              break;
            }
            console.log(i)
            i += 1
        } catch (e) {
            console.log(i, e)
        }
    }
    console.log("Finish")
    // swapExactKLAYForTokens(
    //   uint256 amountOutMin,
    //   address[] calldata path,
    //   address to,
    //   uint256 deadline
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