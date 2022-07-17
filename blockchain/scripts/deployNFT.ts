import { ethers } from "ethers";
import "dotenv/config";
import * as NFTJson from "../artifacts/contracts/NFT.sol/NFT.json";
import { args, getRopstenProvider, getWallet } from "../config/index";
const { run } = require("hardhat");


/*
* Run like this, passing in baseURI as a cmd line parameter:
* yarn ts-node --files scripts/deployNFT.ts --buri ipfs/QmWDpqdbWobAfC1jE924dRsiz7q99BUJr2GnqtyuCjumCB
*/
async function main() {
    const wallet = getWallet();
    const baseURI = args.baseURI;
    const COLLECTION_SIZE = 10;
    console.log(`Using address ${wallet.address}`);
    const provider = getRopstenProvider();
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    const balance = Number(ethers.utils.formatEther(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }
    console.log("Deploying NFT contract...");

    const NFTFactory = new ethers.ContractFactory(
        NFTJson.abi,
        NFTJson.bytecode,
        signer
    );

    const NFTContract = await NFTFactory.deploy(baseURI, COLLECTION_SIZE);
    console.log("Awaiting confirmations");
    await NFTContract.deployed();
    console.log("Completed");
    console.log(`Contract deployed at ${NFTContract.address}`);
    console.log(`Transaction hash ${NFTContract.deployTransaction.hash}`);
    console.log(`Now minting ${COLLECTION_SIZE} tokens to deployer...`);

    for (let i = 1; i <= COLLECTION_SIZE; i++) {
        const tx = await NFTContract.mint();
        const receipt = await tx.wait(1);
        console.log(
            `Minted an NFT to ${wallet.address}, Hash: ${receipt.transactionHash}`
        );
    }
    console.log("All NFTs minted.");
    console.log("********************************************************");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
