
const hre = require("hardhat");

const {BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS, precision} = require('../CONST');

// const {BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS} =require('../src/CONSTANTS')


async function main() {

  const Decentralize_Exchange = await hre.ethers.getContractFactory("Decentralize_Exchange");

  const tokengenerator = await Decentralize_Exchange.deploy(BEAST_TOKEN_ADDRESS,KGF_TOKEN_ADDRESS);

  await tokengenerator.deployed();
  
  // contract address 
  console.log("Decentralize_Exchange deployed to:", tokengenerator.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });