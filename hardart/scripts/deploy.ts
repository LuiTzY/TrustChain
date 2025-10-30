import { network } from "hardhat";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";

const { ethers } = await network.connect();
async function main() {

  console.log("Desplegando Marketplace")
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  
  await marketplace.waitForDeployment();
  const address = await marketplace.getAddress();
  
  console.log("Desplegamos el contrato en este address", address)
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
