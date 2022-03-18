const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // const bank = await hardhatBank.attach("0x470aC5e9E098731F0911003218505151e47a6aDD");

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy("stableCAMP", "sCAMP", owner.address);
    const SCAMP = await SCAMPFactory.attach("0x2714Ac12B99202818424d54E0C65a9fC5ac683AA");
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    // let CAMP = await CAMPFactory.deploy("Camp Protocol Governance", "CAMP", owner.address);
    const CAMP = await CAMPFactory.attach("0xf95037DdD53e0B6bB870c3839E42312CBb58cd4f");
    console.log("CAMP address is:", await CAMP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    let mock = await mockFactory.deploy();
    // const mock = await mockFactory.attach("0xC990B449a26c05Debb8fB04806397bC5BfF5f4Ed");
    await mock.setBalance("0x91Add885cdF83Ba62578eF7de912067f52aB3130", toBn("10000e18"))
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
    const Bank = await BankFactory.attach("0x73d56d04c0cFB304587AdeA48f6738B83bA9585C");
    console.log("Bank address is:", Bank.address);
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