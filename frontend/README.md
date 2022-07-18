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
### Retrieve Image and Name from Endpoint

2. Retrieve API data

```
export async function getServerSideProps() {

  //fetch NFT metadata
  const res = await fetch(`http://localhost:8000/nfts/metadata/1`, {
    method: "GET"
  });
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } }
}

```
### Display on Frontend

3. Display data on the frontend

```
<div className="grid grid-cols-3 gap-5">
  {
    collection.map((id:number) => (<PictureFrame key={`${id}`} imgUrl={`https://ipfs.io/${data.image}`} id={`${id}`}/>))
  }
</div>

```

* PictureFrame Component
```
const PictureFrame = ({ imgUrl, id }: PictureFrameProp) => {
    console.log(imgUrl);
    return (
        <div className="border-solid border-red-500 my-5 mx-5 rounded-md h-[400px] overflow-hidden shadow-lg shadow-slate-800">
            <Link href={`/${id}`}><img src={imgUrl} alt="beach holiday" className="object-cover w-full h-full" /></Link>
        </div>
    );
}
```

4. Display Individual NFT page using NextJS dynamic routing & Reusable Component

```
export default function HeroImage(props: JsonMetada) {
    return (
        <div className="flex flex-col" >
            <div className="border-solid border-red-500 my-5 mx-5 rounded-md h-[400px] overflow-hidden shadow-lg shadow-slate-800">
                <img src={`https://ipfs.io/${props.image}`} alt="beach holiday" className="object-cover w-full h-full" />
            </div>
            <div>
                <h2 className="heading-2 text-center"> {props.name}</h2>
            </div>
        </div>

    )
}
```

5. Run ``npm run dev`` to view the frontend

<img src="/frontend.png" alt="frontend">
