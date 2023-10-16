# CertifyChain

# Index

- [CertifyChain](#certifychain)
- [Index](#index)
- [About](#about)
  - [Techstack](#techstack)
- [How to setup](#how-to-setup)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Create a .env file](#create-a-env-file)
- [Contracts](#contracts)
  - [Conpile Contract (Hardhat)](#conpile-contract-hardhat)
  - [Deploy Contract (Hardhat)](#deploy-contract-hardhat)
- [Finally run the webapp](#finally-run-the-webapp)
- [License](#license)

# About

CertifyChain is a project that aims to provide certificate management and verification through the Ethereum blockchain.

The project is divided into two parts:

## Techstack

    - ReactJS
    - RemixIDE
    - Solidity
    - EtherJS
    - Hardhat

# How to setup

## Clone the repo

Fork and clone the repo

```bash
git clone git:github@<YOUR_USERNAME>/CertifyChain.git
cd CertifyChain
```

## Install dependencies

```bash
npm install
```

## Create a .env file

Create a .env file in the root of the project and add the following variables:

```bash
INFURA_API_KEY=YOUR_INFURA_API_KEY
PRIVATE_KEY=PVT_KEY_OF_YOUR_METAMASK_WALLET
```

Replace the key with your Indura API key generated from [Infura](https://infura.io/) and the private key of your metamask wallet.

# Contracts

Inside the `contracts` folder you will find the `certificate.sol` smart contract that will be deployed on the ethereum blockchain.
Open the contract on [RemixIDE](https://remix.ethereum.org/) and deploy it on the Sepolia test network.

**NOTE: Perform the following steps if you are deploying your own contract. A test contract has already been deployed at `0x4aF28d9e9e056620bbB78d8870b1942cc9B34954`**

## Conpile Contract (Hardhat)

```bash
npx hardhat compile
```

## Deploy Contract (Hardhat)

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

After the contract is deployed, copy the contract address and paste it in the `App.js` `file in the`src` folder.

```javascript
const certificateAddress = "NEW_CONTRACT_ADDRESS";
```

And replace the contract abi file in `contracts/certificate.sol/certificate.json`

# Finally run the webapp

```bash
npm start
```

The webapp will be running on `localhost:3000`

To open the same application of another device for testing purposes, make sure that the device is connected to the same network as the device on which the webapp is running. Then visit `http://<IP_ADDRESS_OF_THE_DEVICE_RUNNING_THE_WEBAPP>:3000`

# License

The projects is licensed under [MIT](https://choosealicense.com/licenses/mit/)
