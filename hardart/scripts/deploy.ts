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
  
  console.log("Marketplace desplegado en:",address );

  const data = {
    address: address,
    abi: JSON.parse(marketplace.interface.formatJson())
  };

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename);

  //Guardamos el archivo del json 
  const filePath = path.join(__dirname,"../deployments/deploy.json");

  console.log("El archivo de deploy se guardara en esta ruta", filePath)
  
  fs.writeFileSync(filePath, JSON.stringify(data, null,2));
  console.log("Archivo guardado correctamente");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
