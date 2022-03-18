const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // const bank = await hardhatBank.attach("0x470aC5e9E098731F0911003218505151e47a6aDD");

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    let SCAMP = await SCAMPFactory.deploy("stableCAMP", "sCAMP", owner.address);
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    let CAMP = await CAMPFactory.deploy("Camp Protocol Governance", "CAMP", owner.address);
    console.log("CAMP address is:", await CAMP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    let mock = await mockFactory.deploy();
    console.log("mock address is:", await mock.address);

    SCAMPPoolLibraryFactory = await ethers.getContractFactory("SCAMPPoolLibrary");
    let SCAMPPoolLibrary = await SCAMPPoolLibraryFactory.deploy();
    console.log("SCAMPPoolLibrary address is:", await SCAMPPoolLibrary.address);

    BankFactory = await ethers.getContractFactory("SCAMPBank", {
        libraries: {
            SCAMPPoolLibrary: SCAMPPoolLibrary.address,
        },
    });
    console.log("safe");
    let Bank = await BankFactory.deploy(SCAMP.address, CAMP.address, mock.address, owner.address);
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