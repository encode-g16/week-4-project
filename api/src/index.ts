import express from 'express';
import { IpfsClient } from './services/ipfs/IpfsClient.js';
import { NFTContractClient } from './services/blockchain/NFTContract.js';
import { ethers } from 'ethers';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const NFT_COLLECTION_SIZE = 10;
const provider = ethers.getDefaultProvider('ropsten');

console.log(`using contract address: ${NFT_CONTRACT_ADDRESS}`);

const contractClient = new NFTContractClient(NFT_CONTRACT_ADDRESS, NFT_COLLECTION_SIZE, provider);
const ipfsClient = new IpfsClient('localhost', 5001, 'http');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/nfts/metadata/:id', async (req, res) => {
    const tokenId = req.params.id;
    try {
        const tokenIdInt = parseInt(tokenId, 10);
        if (isNaN(tokenIdInt)) {
            res.sendStatus(400).send(`id provided ${tokenId} is not a number`);
            return;
        }
    
        const tokenUri = await contractClient.tokenURI(parseInt(tokenId, 10));
        const metadata = await ipfsClient.getContent(tokenUri);
        res.contentType('application/json').send(metadata);
    } catch(err) {
        console.log(`error calling ===> /nfts/metadata/${tokenId}`, err)
        res.status(500).send(err.message)
    }
});

app.get('/nfts/metadata', async (req, res) => {
    try {
        const tokenUris = await contractClient.listTokenURIs();

        console.log('GOT URIS:', tokenUris);
    
        const metadataList = await ipfsClient.listContent(tokenUris);
    
        const results = [];
        metadataList.forEach((md) => {
            results.push(JSON.parse(md.toString('utf8')));
        });
        res.contentType('application/json').send({ results });
    } catch(err) {
        console.log("error calling ===> /nfts/metadata", err)
        res.status(500).send(err.message)
    }
});

app.get('/nfts/images', async (req, res) => {
    const uri = req.query.uri as string;
    try {
        const imageBuffer = await ipfsClient.getContent(uri);
        res.contentType('image/png').send(imageBuffer);
    } catch(err) {
        console.log(`error calling ===> /nfts/image?uri=${uri}`, err)
        res.status(500).send(err.message)
    }
});

app.listen(8000, () => {
    console.log('app started on port 8000');
});
