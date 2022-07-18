import express from 'express';
import { IpfsClient } from './services/ipfs/IpfsClient.js';
import { NFTContractClient } from './services/blockchain/NFTContract.js';
import { ethers } from 'ethers';
import 'dotenv';

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const NFT_COLLECTION_SIZE = 10;
const provider = ethers.getDefaultProvider('ropsten');
const contractClient = new NFTContractClient(NFT_CONTRACT_ADDRESS, NFT_COLLECTION_SIZE, provider);
const ipfsClient = new IpfsClient('localhost', 5001, 'http');

const app = express();

app.get('/nfts/metadata/:id', async (req, res) => {
    const tokenId = req.params.id;
    const tokenUri = await contractClient.tokenURI(parseInt(tokenId, 10));
    const metadata = await ipfsClient.getContent(tokenUri);
    res.contentType('application/json').send(metadata);
});

app.get('/nfts/metadata', async (req, res) => {
    const tokenUris = await contractClient.listTokenURIs();

    console.log('GOT URIS:', tokenUris);

    const metadataList = await ipfsClient.listContent(tokenUris);

    const results = [];
    metadataList.forEach((md) => {
        results.push(JSON.parse(md.toString('utf8')));
    });
    res.contentType('application/json').send({ results });
});

app.get('/nfts/images', async (req, res) => {
    const uri = req.query.uri as string;
    const imageBuffer = await ipfsClient.getContent(uri);
    res.contentType('image/png').send(imageBuffer);
});

app.listen(8000, () => {
    console.log('app started on port 8000');
});
