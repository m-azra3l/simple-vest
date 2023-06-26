// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// imports
const hre = require("hardhat");
const fs = require('fs');

// funtion to deploy the contracts
async function main() {

  // // deploy the MarketPlace
  // const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  // const nftMarketplace = await MarketPlace.deploy();
  // await nftMarketplace.deployed();
  // console.log("nftMarketplace deployed to:", nftMarketplace.address);

  // //deploy the NFT
  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy(nftMarketplace.address);
  // await nft.deployed();
  // console.log("nft deployed to:", nft.address);


  // // export the addresses
  // fs.writeFileSync('./config.js', `
  //   export const marketplaceAddress = "${nftMarketplace.address}"
  //   export const nftAddress = "${nft.address}"

  // `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
