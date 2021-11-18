require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const infuraKey = "03797d67b8714ebe8228dba70d3be946"; //ProjectId in infura
const fs = require("fs");
const mnemonic =
  "lizard burden dish lock fringe mother boy pen behave rabbit pill kingdom";
//fs.readFileSync(".secret").toString().trim()

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*",
    // },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic, // Array of account private keys
          `https://ropsten.infura.io/v3/03797d67b8714ebe8228dba70d3be946` // Url to an Ethereum Node
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3,
    },
  },

  // },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  // },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "petersburg",
    },
  },
};
