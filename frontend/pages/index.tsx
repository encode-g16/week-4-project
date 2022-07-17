import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import PictureFrame from '../components/PictureFrame'

interface imageProp {
  cid: string;
  created: string;
  deals: [];
  files: [];
  name: string;
  pin: {};
  scope: string;
  size: number;
  type: string;
}

// end = collectionSize from the contract
function fillRange(start:number, end:number) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

const Home: NextPage = () => {
  const data = fillRange(1,10);
  // baseURL = baseURL from the contract
  const baseURL = "https://nftstorage.link/ipfs/bafybeigoawqimlk6suhfdsxnndy7ix5uvxatyr6dq5hy75k7ytaa2pika4/";
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex w-screen items-center justify-center px-10 pt-5">
        <div className="grid grid-cols-3 gap-5">
        {
          data.map((_, i:number) => (<PictureFrame key={`${i+1}`} imgUrl={`${baseURL}${i+1}.jpg`}/>))
        }
        </div>

      </main>

      <footer className="flex h-24 w-screen items-center justify-center">
        
      </footer>
    </div>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const nftStorageApiKey = process.env.NFTSTORAGE_API_KEY;
//   //fetch NFT metadata
//   const res = await fetch(`https://api.nft.storage/`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${nftStorageApiKey}`
//     }
//   });
//   const data = await res.json();

//   console.log(data)
//   // Pass data to the page via props
//   return { props: { data } }
// }

export default Home

