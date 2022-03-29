const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");


const main = async () => {
  const [owner] = await ethers.getSigners();
  let i = 0;

  KLAY = "0xe4f05a66ec68b54a58b17c22107b02e0232cc817"
  KUSDT = "0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167"
  USDK = ""


  const RouterFactory = await ethers.getContractFactory("UniswapV2Router02");
  const router = RouterFactory.attach("0xEf71750C100f7918d6Ded239Ff1CF09E81dEA92D");

  KLAYFactory = await ethers.getContractFactory("WKLAY");
  // //let mock = await MOCKFactory.deploy();
  const klay = await KLAYFactory.attach("0xe4f05a66ec68b54a58b17c22107b02e0232cc817");

  await klay.approve(router.address, toBn("1e18"))
  KUSDTFactory = await ethers.getContractFactory("KlaytnToken");
  // //let mock = await MOCKFactory.deploy();
  const usdt = await KUSDTFactory.attach("0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167");
  await usdt.approve(router.address, toBn("1e18"))

  //SWAP
  // while (i < 10) {
    // const swapamounts = await router.getAmountsOut(toBn("1"), [KLAY, KUSDT]);
    // // console.log("swap ratio:", await swapamounts[0].toString(), await swapamounts[1].toString());
    // // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [KLAY, KUSDT], owner.address, Math.floor(Date.now()) + 10);
    // await router.swapExactTokensForTokens(swapamounts[0].toString(), swapamounts[1].toString(), [KLAY, KUSDT], owner.address, Math.floor(Date.now()) + 10);
    // i += 1
  // }
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