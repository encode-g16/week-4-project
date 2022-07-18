# Smart Contracts

This is the blockchain part of the project.

### Install Dependencies

```
yarn install
```

Ensure you fill in the parameters in `env.example` and rename this file `.env`

### Deploy the NFT.sol contract

Pass in the base URI directory path (perhaps using IPFS as below) as a command line paramenter using the `--buri` flag e.g:

```
yarn ts-node --files scripts/deployNFT.ts --buri /ipfs/QmWDpqdbWobAfC1jE924dRsiz7q99BUJr2GnqtyuCjumCB
```

The contract will apend an increasing tokenId to this base URI to provide the token specific meta data URI.

The `deployNFT.ts` script will deploy `NFT.sol` and mint 10 NFTs to the connected deployer account.
