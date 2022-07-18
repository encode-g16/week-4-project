import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Header from "../components/Header";
import HeroImage from "../components/HeroImage";

interface JsonMetadata {
    name: string,
    image: string
}

export default function MintPage() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<JsonMetadata>({ name: "", image: "" });
    // const {name, image} = data;
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:8000/nfts/metadata/${id}`, {
                method: "GET",
            })
            const json = await data.json();
            setData(json)
        }
        fetchData().catch(err => console.log(err));
        console.log(data)
    }, [])

    return (
        <div className="flex w-screen flex-col items-center justify-center">
            <Header />
            <main className="flex w-screen items-center justify-center px-10 pt-5">
                <HeroImage name={data!.name} image={data!.image} />
            </main>

            <footer className="flex h-24 w-screen items-center justify-center">

            </footer>
        </div>
    )
}