import { ethers } from 'ethers';
import contractAbi from '../artifacts/NFTContract.js';

export class NFTContractClient {
    private contractInstance: ethers.Contract;
    private cache: { [key: number]: string } = {};
    private collectionSize: number;

    constructor(contractAddress: string, collectionSize: number, provider: ethers.providers.BaseProvider) {
        this.contractInstance = new ethers.Contract(contractAddress, contractAbi.abi, provider);
        this.collectionSize = collectionSize;
    }

    async tokenURI(id: number): Promise<string> {
        console.log(`tokenURI(${id}) called`);
        if (id in this.cache) {
            console.log(`tokenURI(${id}) returning from cache`);
            return this.cache[id];
        }
        const result = await this.contractInstance.tokenURI(id);
        console.log(`tokenURI(${id}) fetched from blockchain`);
        this.cache[id] = result.toString();
        return this.cache[id];
    }

    async listTokenURIs(): Promise<string[]> {
        const promises: Promise<string>[] = [];
        for (let id = 1; id <= this.collectionSize; id++) {
            promises.push(this.tokenURI(id));
        }
        return await Promise.all(promises);
    }
}
