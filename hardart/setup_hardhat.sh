
#iniciamos el proyecto de hardhat
echo "Iniciando instalacion de hardhat "
npm install hardhat

echo "Instalacion realizada correctamente, ahora iniciaremos le proyecto"
npx hardhat
#compilamos el smart contact del marketplace
npx hardhat compile 
#inicamos el nodo de hardhat 
echo "Iniciando servidor de blockchain JSON-RPC Server"
npx hardhat node
#desplegamos el marketplace a un address
npx hardhat run scripts/deploy.ts --network localhost