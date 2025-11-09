#iniciamos el proyecto de hardhat
# echo "Iniciando instalacion de hardhat "
# npm install 

echo "niciaremos le proyecto"
npx hardhat
#compilamos el smart contact del marketplace
npx hardhat compile 
#inicamos el nodo de hardhat 
echo "Iniciando servidor de blockchain JSON-RPC Server"
npx hardhat node &

until nc -z hardhat-node 8545; do
    echo "Esperando que el nodo de hardhat inicie..."
    sleep 3
done

echo "Nodo desplegado, Desplegando Marketplace..."
npx hardhat run scripts/deploy.ts --network localhost

wait  # mantener el contenedor activo