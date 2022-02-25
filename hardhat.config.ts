import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999
          }
        }
      },
    ]
  },
  networks: {
    harmony: {
      url: process.env.ONE_MAINNET_URL || "",
      accounts: process.env.PK_HARMONY !== undefined ? [process.env.PK_HARMONY] : [],
      initialBaseFeePerGas: 0
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gas: 4100000,
      gasPrice: 8000000000,
      initialBaseFeePerGas: 0
    },
    mainnet: {
      url: `https://api.harmony.one`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      initialBaseFeePerGas: 0
    },
    testnet: {
      url: process.env.ONE_TESTNET_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      initialBaseFeePerGas: 0
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5"
  }
};

export default config;
