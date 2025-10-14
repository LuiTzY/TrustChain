import { network } from "hardhat";

const { ethers } = await network.connect();


async function main() {
  const [owner] = await ethers.getSigners();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const market = await ethers.getContractAt("Marketplace", contractAddress);

  console.log(" Listando product.");
  const tx = await market.connect(owner).listItem("Laptop Vostro","Mi primer producto", ethers.parseEther("2.0"));
  await tx.wait();
  console.log(" Producto publicado en la blockchain!");

  const count = await market.itemCount();
  const item = await market.items(count);

console.log({
  id: item[0].toString(),
  name: item[1],
  description: item[2],
  priceWei: item[3].toString(),
  priceEth: ethers.formatEther(item[3]),
  seller: item[4],
  sold: item[5],
});

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
