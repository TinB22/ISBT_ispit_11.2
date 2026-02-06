const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("cToken", function () {
  const ONE = 10n ** 18n;

  it("Stvaranje tokena: initialSupply ide owneru", async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("cToken");

    const initialSupply = 1000n * ONE;
    const token = await Token.deploy("TinToken", "TTK", initialSupply);

    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("Mint: samo owner može povećati totalSupply i svoj balance", async () => {
    const [owner, other] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("cToken");

    const token = await Token.deploy("TinToken", "TTK", 1000n * ONE);

    await expect(token.connect(other).mint(1n * ONE)).to.be.revertedWith("Only owner");

    await token.mint(200n * ONE);
    expect(await token.totalSupply()).to.equal(1200n * ONE);
    expect(await token.balanceOf(owner.address)).to.equal(1200n * ONE);
  });

  it("Burn: samo owner može smanjiti totalSupply i svoj balance", async () => {
    const [owner, other] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("cToken");

    const token = await Token.deploy("TinToken", "TTK", 1000n * ONE);

    await expect(token.connect(other).burn(1n * ONE)).to.be.revertedWith("Only owner");

    await token.burn(50n * ONE);
    expect(await token.totalSupply()).to.equal(950n * ONE);
    expect(await token.balanceOf(owner.address)).to.equal(950n * ONE);
  });

  it("Transfer: balans prije/poslije (owner -> addr1)", async () => {
    const [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("cToken");

    const token = await Token.deploy("TinToken", "TTK", 1000n * ONE);

    const amount = 10n * ONE;

    const ownerBefore = await token.balanceOf(owner.address);
    const a1Before = await token.balanceOf(addr1.address);

    await token.transfer(addr1.address, amount);

    const ownerAfter = await token.balanceOf(owner.address);
    const a1After = await token.balanceOf(addr1.address);

    expect(ownerAfter).to.equal(ownerBefore - amount);
    expect(a1After).to.equal(a1Before + amount);
  });
});