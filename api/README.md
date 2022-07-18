# Instructions

1. run `yarn` to install dependencies

2. add `.env` file with `NFT_CONTRACT_ADDRESS` - use `0x87ef0E9e15877dDdEC2a14552F924c9F58e9256D` or deploy and mint new NFTs by running the script in the top level blockchain folder.

3. make sure ipfs daemon is running by running `ipfs daemon`

4. run `yarn start` this will start server on port 8000

## API Reference

GET /metdata/{id}:

```json
{
  "name": "bulbasaur",
  "image": "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/bulbasaur.png"
}
```

GET /metadata

```json
{
  "results": [
    {
      "name": "bulbasaur",
      "image": "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/bulbasaur.png"
    },
    {
      "name": "cat",
      "image": "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/cat.png"
    },
    {
      "name": "caterpillar",
      "image": "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/caterpillar.png"
    },
    {
      "name": "charmander",
      "image": "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/charmander.png"
    }
  ]
}
```

GET /nfts/images?uri={imageUri}

```
binary data: content-type=image/png
```
