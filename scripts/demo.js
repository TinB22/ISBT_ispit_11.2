const hre = require("hardhat");

async function main() {
  const ONE = 10n ** 18n;
  const [owner, addr1] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("cToken");
  const token = await Token.deploy("TinToken", "TTK", 1000n * ONE);
  await token.waitForDeployment();

  const tokenAddr = await token.getAddress();
  console.log("Token:", tokenAddr);
  console.log("Owner:", owner.address);
  console.log("Addr1:", addr1.address);

  // helper funkcija za ljepši ispis
  const fmt = (value) => hre.ethers.formatUnits(value, 18);

  // balances after deploy
  console.log("Balance owner (after deploy):", fmt(await token.balanceOf(owner.address)));
  console.log("TotalSupply (after deploy):", fmt(await token.totalSupply()));

  // mint
  let tx = await token.mint(200n * ONE);
  let receipt = await tx.wait();
  console.log("MINT tx hash:", receipt.hash);

  console.log("Balance owner (after mint):", fmt(await token.balanceOf(owner.address)));
  console.log("TotalSupply (after mint):", fmt(await token.totalSupply()));

  // transfer
  tx = await token.transfer(addr1.address, 10n * ONE);
  receipt = await tx.wait();
  console.log("TRANSFER tx hash:", receipt.hash);

  console.log("Balance owner (after transfer):", fmt(await token.balanceOf(owner.address)));
  console.log("Balance addr1 (after transfer):", fmt(await token.balanceOf(addr1.address)));

  // burn
  tx = await token.burn(50n * ONE);
  receipt = await tx.wait();
  console.log("BURN tx hash:", receipt.hash);

  console.log("Balance owner (after burn):", fmt(await token.balanceOf(owner.address)));
  console.log("TotalSupply (after burn):", fmt(await token.totalSupply()));
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});