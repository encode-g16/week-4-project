import Link from "next/link";

interface PictureFrameProp {
    imgUrl: string;
    id: string;
}

const PictureFrame = ({ imgUrl, id }: PictureFrameProp) => {
    console.log(imgUrl);
    return (
        <div className="border-solid border-red-500 my-5 mx-5 rounded-md h-[400px] overflow-hidden shadow-lg shadow-slate-800 hover:scale-110 transition-all cursor-pointer">
            <Link href={`/${id}`}><img src={imgUrl} alt="beach holiday" className="object-contain w-full h-full" /></Link>
        </div>
    );
}

export default PictureFrame;