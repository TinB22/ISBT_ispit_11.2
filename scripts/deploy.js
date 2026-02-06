const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer:", deployer.address);

  const Token = await hre.ethers.getContractFactory("cToken");

  const name = "TinToken";
  const symbol = "TTK";
  const initialSupply = 1000n * 10n ** 18n;

  const token = await Token.deploy(name, symbol, initialSupply);
  await token.waitForDeployment();

  console.log("Token deployed to:", await token.getAddress());
  console.log("Total supply:", (await token.totalSupply()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
