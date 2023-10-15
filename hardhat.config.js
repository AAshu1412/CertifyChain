/** @type import('hardhat/config').HardhatUserConfig */

// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");


require("dotenv").config()  ;
const {INFURA_API_KEY,PRIVATE_KEY}=process.env;


module.exports = {
  solidity: "0.8.20",
  defaultNetwork:"sepolia",
  paths: {
    artifacts: "./src",
  },
  networks:{
    hardhat:{},
    sepolia:{
      url:`https:sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]  ,
      chainID: 11155111  ,
      timeout: 600000,
    },
  }
};
