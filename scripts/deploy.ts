import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const IterableMappingLibrary = await ethers.getContractFactory("IterableMapping");
  const iterableMappingLibrary = await IterableMappingLibrary.deploy();
  await iterableMappingLibrary.deployed();

  console.log("IterableMappingLibrary deployed to:", iterableMappingLibrary.address);

  const TokenZooDex = await ethers.getContractFactory("ZooDex", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const TokenDividend = await ethers.getContractFactory("ZooDexDividendTracker", {
    libraries: {
      IterableMapping: iterableMappingLibrary.address
    }
  });

  const tokenZooDex = await TokenZooDex.deploy();
  await tokenZooDex.deployed();

  const tokenDividend = await TokenDividend.deploy();
  await tokenDividend.deployed();

  console.log("$ZooDex deployed to:", tokenZooDex.address);
  console.log("$ZooDexDividendTracker deployed to:", tokenDividend.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
