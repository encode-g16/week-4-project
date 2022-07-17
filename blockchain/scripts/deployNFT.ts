import { ethers } from "ethers";
import "dotenv/config";
import * as NFTJson from "../artifacts/contracts/NFT.sol/NFT.json";
import { args, getRopstenProvider, getWallet } from "../config/index";

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
        bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
}

/**
 * Example command:
 * yarn ts-node --files scripts/deployBallot.ts --ta 0x4337785FcD690BaA3C6C151B1b80747423683aBD -p cheese -p ham -p onions
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
    console.log("Deploying NFT contract");

    const NFTFactory = new ethers.ContractFactory(
        NFTJson.abi,
        NFTJson.bytecode,
        signer
    );
    console.log(`Deploying NFT contract with  tokenAddress=${args.tokenAddress}`);
    const NFTContract = await NFTFactory.deploy(baseURI, COLLECTION_SIZE);
    console.log("Awaiting confirmations");
    await NFTContract.deployed();
    console.log("Completed");
    console.log(`Contract deployed at ${NFTContract.address}`);
    console.log(`Now minting ${COLLECTION_SIZE} tokens`);
    // TO DO *******************************************************
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
