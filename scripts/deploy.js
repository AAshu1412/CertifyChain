const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const certificateContractFactory = await hre.ethers.getContractFactory("certificate");
  const certificateContract = await certificateContractFactory.deploy();

  // await counterContract.deployed();

  console.log(
    `Contract :  timestamp ${unlockTime} deployed to ${certificateContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

