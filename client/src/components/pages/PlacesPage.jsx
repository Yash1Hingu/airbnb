import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    return (<>
        {action !== 'new' &&
            <div className="flex flex-col items-center mt-8">
                <Link to={'/account/places/new'} className="bg-primary py-2 px-4 rounded-full text-white flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Places
                </Link>
            </div>
        }

        {action === 'new' &&
            <div className="flex justify-center mt-8">
                <form action="" className="min-w-[900px]">
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Title</h2>
                        <p className="text-sm text-gray-500">Title for your places advertisment.</p>
                        <input
                            required
                            type="text"
                            className=""
                            placeholder="Title, for example: My Lovely House"
                        />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Address</h2>
                        <p className="text-sm text-gray-500">Address for reach to that place.</p>
                        <input
                            required
                            type="text"
                            className=""
                            placeholder="Address, for example: 202H, Near Vrudavan, Vadodara"
                        />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Photos</h2>
                        <p className="text-sm text-gray-500">for Get More Client's.</p>
                        <div className="flex gap-2 items-center">
                            <input type="text" placeholder="Add using a link ...jpg" />
                            <button className="bg-primary text-white p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-4 gap-2">
                            <button
                                className="flex justify-center py-8 bg-transparent border border-gray-700 text-gray-700 rounded-2xl hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Description</h2>
                        <p className="text-sm text-gray-500">for Get More Client's.</p>
                        <textarea placeholder="describe your places so client can book very fast!" required />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Perks</h2>
                        <p className="text-sm text-gray-500">select all the perks of your place.</p>
                        <div className="grid grid-cols-3">
                            <label className="placepage_checkbox">
                                <input type="checkbox" />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                    </svg>
                                    Wi-Fi
                                </span>
                            </label>
                            <label className="placepage_checkbox">
                                <input type="checkbox" />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M23 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v19a1 1 0 1 1-2 0V11h-1a2 2 0 0 1-2-2zm-1.5 0H10.407a4 4 0 0 0-3.905 3.132L5.864 9H5a1 1 0 0 0 0 2h.42l-.33 1.485A4 4 0 0 0 3 16v10a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-1h12v1a3 3 0 0 0 2.5 2.959v-2.093A1 1 0 0 1 24 26v-1h.5v-2H5v-7a2 2 0 0 1 2-2h17.5v-1.535A3.48 3.48 0 0 1 23.196 12H7.246l1.208-5.434A2 2 0 0 1 10.406 5H21.5zM5 26v-1h3v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1m7.5-6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m-3-1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M24 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                    Free Parking Spot
                                </span>
                            </label>
                            <label className="placepage_checkbox">
                                <input type="checkbox" />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M13.5 7v4m0 2v-2m0 0l1.37-1.566M17 7l-2.13 2.434m0 0L17 13M9.5 7l-3 4.5H10V13"></path><path d="M2 16.4V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6Z"></path></g></svg>
                                    TV
                                </span>
                            </label>
                            <label className="placepage_checkbox">
                                <input type="checkbox" />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9c.36 1.77-.29 3.35-1.47 3.53c-1.17.18-2.43-1.11-2.8-2.89c-.37-1.77.3-3.35 1.48-3.54m7.15 0c1.19.19 1.85 1.77 1.5 3.54c-.38 1.78-1.63 3.07-2.81 2.89c-1.19-.18-1.84-1.76-1.47-3.53c.36-1.78 1.61-3.07 2.78-2.9M3 7.6c1.14-.49 2.69.4 3.5 1.95c.76 1.58.5 3.24-.63 3.73c-1.13.49-2.67-.39-3.46-1.96C1.62 9.75 1.9 8.08 3 7.6m18 0c1.1.48 1.38 2.15.59 3.72c-.79 1.57-2.33 2.45-3.46 1.96c-1.13-.49-1.39-2.15-.63-3.73C18.31 8 19.86 7.11 21 7.6m-1.67 10.78c.04.94-.68 1.98-1.54 2.37c-1.79.82-3.91-.88-5.9-.88c-1.99 0-4.13 1.77-5.89.88c-1-.49-1.69-1.79-1.56-2.87c.18-1.49 1.97-2.29 3.03-3.38c1.41-1.41 2.41-4.06 4.42-4.06c2 0 3.06 2.61 4.41 4.06c1.11 1.22 2.96 2.25 3.03 3.88"></path></svg>
                                    Pets
                                </span>
                            </label>
                            <label className="placepage_checkbox">
                                <input type="checkbox" />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M232 218h-26V40a14 14 0 0 0-14-14H64a14 14 0 0 0-14 14v178H24a6 6 0 0 0 0 12h208a6 6 0 0 0 0-12M194 40v178h-20V40a14.71 14.71 0 0 0-.16-2H192a2 2 0 0 1 2 2M62 40a2 2 0 0 1 2-2h96a2 2 0 0 1 2 2v178H62Zm82 92a12 12 0 1 1-12-12a12 12 0 0 1 12 12"></path></svg>
                                    Private Entrance
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Extra Info</h2>
                        <p className="text-sm text-gray-500">House rules, etc.</p>
                        <textarea placeholder="House Rules that must followed by client." required />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Check In & Out Times</h2>
                        <p className="text-sm text-gray-500">check in-out time & max head count.</p>
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Check In</h3>
                                <input type="time" required />
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Check Out</h3>
                                <input type="time" required />
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Max number</h3>
                                <input type="number" min='1' required />
                            </div>
                        </div>
                    </div>
                    <button className="flex p-4 gap-2 border rounded-3xl mt-4 items-center justify-center bg-gray-700 text-white w-full hover:bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        Save
                    </button>
                </form>
            </div>
        }
    </>
    )
}