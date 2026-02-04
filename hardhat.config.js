require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:8545",
      accounts: [
        process.env.GANACHE_PK,
        process.env.GANACHE_PK_2,
      ].filter(Boolean),
    },
  },
};
