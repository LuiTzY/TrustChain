FROM node:22.21.0-alpine3.21

WORKDIR /blockchain-node

COPY package*.json ./ 

RUN npm install

#Copiamos todos los archivos requeridos
COPY . .

RUN apk add --no-cache wget busybox-extras


EXPOSE 8545

RUN chmod +x ./setup_hardhat.sh

ENTRYPOINT [ "sh", "-c", "./setup_hardhat.sh" ]

