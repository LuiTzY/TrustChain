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
  
  const data = { address: address };
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "../artifacts/Marketaddress.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Desplegamos el contrato en este address", address)
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
