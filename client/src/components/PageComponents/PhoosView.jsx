import { useState } from "react";

export default function ({ place }) {
    const [isShow, setIsShow] = useState(false);
    function showAllPhotos(ev, state) {
        ev.preventDefault();
        setIsShow(state);
    }

    if (isShow) {
        return (
            <div className="absolute bg-gray-900 top-0 left-0 w-full flex flex-col p-8 items-center gap-8">
                <div>
                    {place.photos.map(img => (
                        <img src={img} alt="" className="max-w-[700px] rounded-3xl mb-8"
                            key={img}
                        />
                    ))}
                </div>
                <button onClick={(ev) => showAllPhotos(ev, false)} className="flex fixed top-4 right-4 py-2 px-4 rounded-3xl gap-2 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    Close
                </button>
            </div>
        )
    }
    return (
        <div onClick={(ev) => showAllPhotos(ev, true)} className="relative my-6 cursor-pointer">
            <div className="grid grid-cols-[2fr_1fr] gap-4 rounded-2xl overflow-hidden">
                <div className="relative">
                    <img className="aspect-square object-cover w-full" src={(place.photos?.[0])} alt="" />
                </div>
                <div className="">
                    <img className="aspect-square object-cover" src={(place.photos?.[1])} alt="" />
                    <div className="relative overflow-hidden">
                        <img className="aspect-square object-cover pt-4" src={(place.photos?.[2])} alt="" />
                    </div>
                </div>
            </div>
            <button onClick={(ev) => showAllPhotos(ev, true)} className="flex gap-1 absolute bottom-4 right-4 py-2 px-4 rounded-xl text-black shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                show all photos
            </button>
        </div>
    )
}