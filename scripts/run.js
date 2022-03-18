const { ethers } = require("hardhat");
const { toBn } = require("evm-bn");

const main = async () => {
    const [owner] = await ethers.getSigners();
    const treasuryAddress = "0x0F6B6f436759F705D54E73E06c90CD920771ae31";

    // const bank = await hardhatBank.attach("0x470aC5e9E098731F0911003218505151e47a6aDD");

    // Get the ContractFactory and Signers here.
    SCAMPFactory = await ethers.getContractFactory("SCAMP");
    // let SCAMP = await SCAMPFactory.deploy(owner.address);
    const SCAMP = await SCAMPFactory.attach("0xFC0e434Ff2fDdFb41b79B1d3b0342c80A8f6EFd3");
    console.log("SCAMP address is:", await SCAMP.address);

    CAMPFactory = await ethers.getContractFactory("CAMP");
    // let CAMP = await CAMPFactory.deploy(owner.address);
    const CAMP = await CAMPFactory.attach("0xB9Faa17b39A576ff48EeAF179F437aC501688256");
    console.log("CAMP address is:", await CAMP.address);

    mockFactory = await ethers.getContractFactory("MockUSDC");
    // let mock = await mockFactory.deploy();
    const mock = await mockFactory.attach("0x886C3A92f7439060F43ed0b54ba08850ABd62213");
    await mock.setBalance("0x91Add885cdF83Ba62578eF7de912067f52aB3130", toBn("10000"))
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
    const Bank = await BankFactory.attach("0x1697E7a9934662c227199927FbcbfB2A6257F4D0");
    console.log("Bank address is:", Bank.address);

      // Set controller
    await SCAMP.setController("0x91Add885cdF83Ba62578eF7de912067f52aB3130");
    await SCAMP.setCAMPAddress(CAMP.address);
    await SCAMP.setBankAddress(Bank.address);
    
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