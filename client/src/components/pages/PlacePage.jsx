import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dateShow } from "../../util/dateShow";
import ruppesShow from "../../util/ruppesShow";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState({});
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        axios.get('/place/' + id).then(res => {
            setPlace(res.data);
        })
    }, [id]);

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
        <div className="bg-gray-100 -mx-4 py-4 px-8 my-8 rounded-2xl">
            <h1 className="text-2xl mb-4 font-bold">{place.title}</h1>
            <a
                href={"https://maps.google.com/?q=" + place.address}
                className="text-xl underline hover:text-blue-600 flex gap-1 items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
                {place.address}
            </a>

            <div onClick={(ev) => showAllPhotos(ev, true)} className="relative my-6 cursor-pointer">
                <div className="grid grid-cols-[2fr_1fr] gap-4 rounded-2xl overflow-hidden">
                    <div>
                        <img className="aspect-square object-cover" src={(place.photos?.[0])} alt="" />
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

            <div className="grid grid-cols-[2fr_1fr] gap-8">
                <div>
                    <div>
                        <span className="font-bold text-2xl">Description</span>
                        <p>{place.description}</p>
                    </div>
                    <div className="grid grid-cols-2 border border-gray-600 rounded-2xl mt-8 max-w-[500px] shadow-lg">
                        <div className="p-4">
                            <b>Check In : </b>
                            {place.checkIn}
                        </div>
                        <div className="p-4 border-l border-gray-600">
                            <b>Check Out : </b>
                            {place.checkOut}
                        </div>
                        <div className="p-4 border-t border-gray-600 col-span-2">
                            <b>Guest : </b>
                            {place.maxGuests}
                        </div>
                    </div>
                </div>
                <form className=" bg-white p-8 rounded-2xl shadow-lg">
                    <div className="text-center text-2xl">Price: <strong className="text-gray-700">&#8377;{ruppesShow(place.price)}</strong> /per night</div>
                    <div className="grid grid-cols-2 border border-gray-600 rounded-2xl mt-4">
                        <div className="border-r border-gray-600 p-2">
                            Check In:
                            <input type="date" />
                        </div>
                        <div className="p-2">
                            Check Out:
                            <input type="date" />
                        </div>
                        <div className="col-span-2 p-2 border-t border-gray-600">
                            Guest:
                            <input type="number" min={1} max={place.maxGuests} />
                        </div>
                    </div>
                    <button className="w-full mt-4 p-2 rounded-xl text-white bg-primary hover:opacity-90">Book Now</button>
                </form>
            </div>

            <div className="-mx-8 px-8">
                <div>
                    <span className="font-bold text-2xl">Extra Info</span>
                    <p>{place.extraInfo}</p>
                </div>
            </div>
        </div>
    )
}