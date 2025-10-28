FROM node:22.21.0-alpine3.21

WORKDIR /blockchain-node

COPY package*.json ./ 

#Copiamos todos los archivos requeridos
COPY . .


EXPOSE 8585

RUN chmod +x ./setup_hardhat.sh

ENTRYPOINT [ "sh", "-c", "./setup_hardhat.sh" ]

