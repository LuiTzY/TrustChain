import { network } from 'hardhat';

const { ethers } = await  network.connect();

const [owner, buyer] = await ethers.getSigners();
const Marketplace = await ethers.getContractFactory("Marketplace");
const market = await Marketplace.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

// Listar un producto
await market.connect(owner).listItem("Laptop Dell", ethers.parseEther("1.5"));

// Verificar
await market.connect(buyer).buyItem(1, { value: ethers.parseEther("1.5") });
const item = await market.items(1);
console.log(item);