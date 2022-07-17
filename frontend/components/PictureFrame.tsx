import Link from "next/link";

interface PictureFrameProp {
    imgUrl: string;
}

const PictureFrame = ({ imgUrl }: PictureFrameProp) => {
    return (
        <div className="border-solid border-red-500 my-5 mx-5 rounded-md h-[400px] overflow-hidden shadow-lg shadow-slate-800">
            <Link href="/philip"><img src={imgUrl} alt="beach holiday" className="object-cover w-full h-full" /></Link>
        </div>
    );
}

export default PictureFrame;