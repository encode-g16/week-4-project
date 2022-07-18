import React from "react"

interface JsonMetada {
    name: string,
    image: string
}

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