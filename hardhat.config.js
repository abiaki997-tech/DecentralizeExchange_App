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
      url: process.env.ALCHEMY_URL,
      // url:"https://ropsten.infura.io/v3/011db3c1ff27443e94989144cc120c2a",
      // url:"https://eth-goerli.alchemyapi.io/v2/KlIhpAsLxeRVLoqrgorLAXQSF8eGmnwh",
      accounts: [process.env.ACCOUNT_1]
    }
  },
  paths:{
    artifacts: "src/artifacts"
  }
};
