require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    hardhat: {
      // chainId:1337
    },
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/W9pb8SrEyaF5uEAtP4by9Ssq-uSQ_vyD",
      // url:"https://ropsten.infura.io/v3/011db3c1ff27443e94989144cc120c2a",
      // url:"https://eth-goerli.alchemyapi.io/v2/KlIhpAsLxeRVLoqrgorLAXQSF8eGmnwh",
      accounts: ["0x62a939f9bcd130b797cabdd81a6681f94b6df2bad99c6c3c2c6c77a3ef837d4e"]
    }
  },
  paths:{
    artifacts: "src/artifacts"
  }
};
