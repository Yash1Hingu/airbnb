import axios from 'axios';

import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../PageUI/Perks";
import PhotosUploader from '../PageUI/PhotosUploader';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setRedirect(false);
    })

    function reSet() {
        setTitle('');
        setAddress('')
        setAddedPhotos([]);
        setDescription('');
        setPerks([]);
        setExtraInfo('');
        setCheckIn('');
        setCheckOut('');
        setMaxGuests(1);
    }
    async function handleOnSubmit(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        }).then((data) => {
            alert('Saved Place');
            setRedirect(true);
            reSet();
        });
    }

    if (redirect && action === 'new') {
        return <Navigate to='/account/places' />
    }

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
                <form className="min-w-[900px]" onSubmit={handleOnSubmit}>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Title</h2>
                        <p className="text-sm text-gray-500">Title for your places advertisment.</p>
                        <input
                            required
                            type="text"
                            className=""
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
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
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                            placeholder="Address, for example: 202H, Near Vrudavan, Vadodara"
                        />
                    </div>
                    <PhotosUploader
                        addedPhotos={addedPhotos}
                        setAddedPhotos={setAddedPhotos}
                    />
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Description</h2>
                        <p className="text-sm text-gray-500">for Get More Client's.</p>
                        <textarea
                            placeholder="describe your places so client can book very fast!"
                            required
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                    </div>
                    <Perks
                        selected={perks}
                        onChange={setPerks}
                    />
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Extra Info</h2>
                        <p className="text-sm text-gray-500">House rules, etc.</p>
                        <textarea
                            placeholder="House Rules that must followed by client."
                            required
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Check In & Out Times</h2>
                        <p className="text-sm text-gray-500">check in-out time & max head count.</p>
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Check In</h3>
                                <input
                                    type="time"
                                    required
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Check Out</h3>
                                <input
                                    type="time"
                                    required
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <h3 className="font-bold text-gray-600">Max number</h3>
                                <input
                                    type="number"
                                    min='1'
                                    required
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)}
                                />
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