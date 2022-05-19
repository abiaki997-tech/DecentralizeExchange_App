
const hre = require("hardhat");

async function main() {

  const Monster_Token = await hre.ethers.getContractFactory("Monster_Token");

  const tokengenerator = await Monster_Token.deploy("KGF","YASH");

  await tokengenerator.deployed();
  
  // contract address 
  console.log("Monster_Token deployed to:", tokengenerator.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });