# Week 4 Project

In this project we uploaded images and metadata to IPFS using the script found in `./ipfs-upload` and then ran a script to mint 10 tokens to the same address for simplicity.

The backend api fetches data from the blockchain and ipfs and caches the data in memory. (in production we would not usually cache the images in the api memory and would cache by other means, this is for simplicity)

The frontend allows a user to view the NFTs as a list or individually.

# Instructions

1. Run instructions found in `./ipfs-upload` folder to upload data.

2. Run instructions found in `./blockchain` to mint tokens.

3. Run instructions found in `./api` to start the backend API.

4. Run instructions found in `./frontend` to start the frontend, and then go to `http://localhost:3000` to view the app.
