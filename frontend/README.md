# Week 4 Weekend Project

* Build a web server and API for providing the features using the RESTful architecture
* Run a local node of IPFS
* Upload 10 images to this node
* Create a JSON and build metadata descriptions for 10 NFTs, each using one unique image
* Make a GET method in the API to get the metadata by id
* Deploy a NFT Collection and mint 10 NFTs, and assign the API endpoint to the token URI
* Integrate this NFT Collection contract and APIs in a frontend application to display NFTs metadata and images
* (Bonus) provide wallet functions in the frontend to buy, transfer, allow, transfer from and burn NFTs

### Create Frontend using NextJS

1. Initialise the NextJS folders with Typescript and TailwindCSS

```
npx create-next-app --example nft-showroom with-tailwindcss-app

```
### Use NFT Storage to Store and Retrieve Images from IPFS

2. Register an account with <a href="https://nft.storage">NFT.storage</a>
   
3. Get the API key to allow for uploading and retrieving data. Store API key in .env file (``.env.example`` file provided)

4. Retrieve API data

```
export async function getServerSideProps() {
  // Fetch data from external API
  const nftStorageApiKey = process.env.NFTSTORAGE_API_KEY;
  
  //fetch NFT metadata
  const res = await fetch(`https://api.nft.storage/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${nftStorageApiKey}`
    }
  });
  
  const data = await res.json();
  
  // Pass data to the page via props
  return { props: { data } }
}

```
### Display on Frontend

5. Display data on the frontend

```
<div className="grid grid-cols-3 gap-5">
    {
        data.map((_, i:number) => (<PictureFrame key={`${i+1}`} imgUrl={`${baseURL}${i+1}.jpg`}/>))
    }
</div>

```

* PictureFrame Component
```
const PictureFrame = ({imgUrl}: PictureFrameProp) => {
    return (
        <div className="border-solid border-red-500 my-5 mx-5 rounded-md h-[400px] overflow-hidden shadow-lg shadow-slate-800">
            <img src={imgUrl} alt="beach holiday" className="object-cover w-full h-full"/>
        </div>
    );
}
```

6. Run ``npm run dev`` to view the frontend

<img src="/frontend.png" alt="frontend">
