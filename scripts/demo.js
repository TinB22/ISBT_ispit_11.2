const hre = require("hardhat");

async function main() {
  const ONE = 10n ** 18n;
  const [owner, addr1] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("SimpleToken");
  const token = await Token.deploy("TinToken", "TTK", 1000n * ONE);
  await token.waitForDeployment();

  const tokenAddr = await token.getAddress();
  console.log("Token:", tokenAddr);
  console.log("Owner:", owner.address);
  console.log("Addr1:", addr1.address);

  // balances after deploy
  console.log("Balance owner (after deploy):", (await token.balanceOf(owner.address)).toString());
  console.log("TotalSupply (after deploy):", (await token.totalSupply()).toString());

  // mint
  let tx = await token.mint(200n * ONE);
  let receipt = await tx.wait();
  console.log("MINT tx hash:", receipt.hash);

  console.log("Balance owner (after mint):", (await token.balanceOf(owner.address)).toString());
  console.log("TotalSupply (after mint):", (await token.totalSupply()).toString());

  // transfer
  tx = await token.transfer(addr1.address, 10n * ONE);
  receipt = await tx.wait();
  console.log("TRANSFER tx hash:", receipt.hash);

  console.log("Balance owner (after transfer):", (await token.balanceOf(owner.address)).toString());
  console.log("Balance addr1 (after transfer):", (await token.balanceOf(addr1.address)).toString());

  // burn
  tx = await token.burn(50n * ONE);
  receipt = await tx.wait();
  console.log("BURN tx hash:", receipt.hash);

  console.log("Balance owner (after burn):", (await token.balanceOf(owner.address)).toString());
  console.log("TotalSupply (after burn):", (await token.totalSupply()).toString());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});