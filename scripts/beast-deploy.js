
const hre = require("hardhat");

async function main() {

  const Beast_Token = await hre.ethers.getContractFactory("Beast_Token");

  const tokengenerator = await Beast_Token.deploy("BST","VJ");

  await tokengenerator.deployed();
  
  // contract address 
  console.log("Beast_Token deployed to:", tokengenerator.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });