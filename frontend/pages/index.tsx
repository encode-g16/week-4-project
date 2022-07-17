import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import PictureFrame from '../components/PictureFrame'

interface imageProps {
  name: string,
  image: string
}

// end = collectionSize from the contract
function fillRange(start:number, end:number) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

const Home: NextPage = ({data}: any) => {
  const collection = fillRange(1,1);
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <Head>
        <title>Group 16 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex w-screen items-center justify-center px-10 pt-5">
        <div className="grid grid-cols-3 gap-5">
        {
          collection.map((id:number) => (<PictureFrame key={`${id}`} imgUrl={`https://ipfs.io/${data.image}`} id={`${id}`}/>))
        }
        </div>

      </main>

      <footer className="flex h-24 w-screen items-center justify-center">
        
      </footer>
    </div>
  )
}

export async function getServerSideProps() {

  //fetch NFT metadata
  const res = await fetch(`http://localhost:8000/nfts/metadata/1`, {
    method: "GET"
  });
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } }
}

export default Home

