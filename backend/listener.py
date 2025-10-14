from web3 import Web3
import json

w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

with open("../hardhat/artifacts/contracts/Marketplace.sol/Marketplace.json") as f:
    abi = json.load(f)["abi"]

contract = w3.eth.contract(address=contract_address, abi=abi)

account = w3.eth.accounts[0] 
private_key = "0x..."  

tx = contract.functions.listItem("Laptop ASUS", 2000000000000000000).build_transaction({
    "from": account,
    "nonce": w3.eth.get_transaction_count(account),
    "gas": 2000000,
    "gasPrice": w3.eth.gas_price,
})



tx_hash = w3.eth.send_transaction(tx)

receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print(" Producto creado. Hash:", tx_hash.hex())
