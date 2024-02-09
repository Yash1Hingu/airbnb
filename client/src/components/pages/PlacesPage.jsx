import axios from 'axios';

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../PageUI/Perks";
import Loader from '../PageUI/Loader';

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
    const [isLoading, setIsLoading] = useState(false);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        setIsLoading(true);
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, fileName.newName];
        });
        setIsLoading(false);
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            })
        })
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
                <form action="" className="min-w-[900px]">
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
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">Photos</h2>
                        <p className="text-sm text-gray-500">for Get More Client's.</p>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Add using a link ...jpg"
                                value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                            />
                            {!isLoading &&
                                <button onClick={addPhotoByLink} className="bg-primary text-white p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                                    </svg>
                                </button>
                            }
                            {isLoading &&
                                <Loader />
                            }
                        </div>
                        <div className="flex flex-wrap mt-2 w-full items-center gap-2">
                            {addedPhotos.length > 0 &&
                                addedPhotos.map(link => (
                                    <img
                                        src={'http://localhost:4000/upload/' + link}
                                        alt=""
                                        className='w-60 rounded-lg '
                                        key={link} />
                                ))
                            }
                            <label
                                className="flex justify-center p-8 bg-transparent border border-gray-700 text-gray-700 rounded-2xl hover:bg-gray-100">
                                <input type="file" multiple hidden onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                            </label>
                        </div>
                    </div>
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