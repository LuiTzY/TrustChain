import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
  // obtenemos ethers directamente desde hardhat
  // const { ethers } = hre;

  console.log("🚀 Desplegando contrato Marketplace...");

  // crear la factory directamente desde los contratos compilados
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();

  console.log(" Marketplace desplegado en:", await marketplace.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
