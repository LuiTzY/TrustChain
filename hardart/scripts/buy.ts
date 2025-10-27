import { network } from 'hardhat';

const { ethers } = await  network.connect();


async function main() {
  const [owner, buyer] = await ethers.getSigners();

  // Conectamos al contrato ya desplegado
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const market = await Marketplace.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  console.log("Comprando producto...");
  const txBuy = await market.connect(buyer).buyItem(1, {
    value: ethers.parseEther("2"),
  });
  await txBuy.wait();

  const item = await market.items(1);
  console.log(item)
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
