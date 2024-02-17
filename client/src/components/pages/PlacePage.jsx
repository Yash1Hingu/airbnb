import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns';
import PhoosView from "../PageComponents/PhoosView";
import { useSelector } from "react-redux";
import PhotosView from "../Mobile/PhotosView";
import PageLoader from "../PageUI/PageLoader";
import BookingForm from "../PageComponents/BookingForm";

export default function PlacePage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const ui = useSelector(state => state.ui.isMobile);

    const { id } = useParams();
    const [place, setPlace] = useState({});
    const [isShow, setIsShow] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guest, setGuest] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [price, setPrice] = useState(place.price);
    const [redirect, setRedirect] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    useEffect(() => {
        axios.get('/place/' + id).then(res => {
            setPlace(res.data);
            setIsLoading(false);
        })
    }, [id]);

    function showAllPhotos(ev, state) {
        ev.preventDefault();
        setIsShow(state);
    }

    function handleShowDescription(ev, state) {
        ev.preventDefault();
        setShowDescription(state);
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

    if (showDescription) {
        return (
            <div className="absolute bg-gray-900 top-0 left-0 w-full md:h-full flex flex-col p-8 items-center gap-8 text-gray-200">
                <span className="font-bold text-2xl">Description</span>
                <p className="">{place.description}</p>
                <button onClick={(ev) => handleShowDescription(ev, false)} className="flex fixed top-4 right-4 p-2 rounded-3xl gap-2 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        )
    }

    if (redirect) {
        return <Navigate to={'/account/bookings'} />
    }

    async function bookThisPlace(ev) {
        ev.preventDefault();
        const data = {
            id,
            checkIn,
            checkOut,
            name,
            phone,
            guest,
            price: numberOfDays * place.price + place.price
        }

        setIsBooking(true);
        await axios.post('/bookings', data);
        setIsBooking(false);
        setRedirect(true);
    }
    return (<>
        {isLoading &&
            <PageLoader />
        }
        {!isLoading && <>
            {ui &&
                <div className="md:bg-gray-100 md:-mx-4 md:py-4 md:px-8 md:my-8 md:rounded-2xl">
                    <PhotosView place={place} />
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">{place.title}</h1>
                        <a
                            href={"https://maps.google.com/?q=" + place.address}
                            className="text-xl underline hover:text-blue-600 flex gap-1 items-center"
                        >
                            {place.address}
                        </a>
                        <div className="mt-2">
                            <span className="font-bold text-2xl">Description</span>
                            {place.description?.length > 150 &&
                                <>
                                    <p>{place.description?.substring(0, 300)}...</p>
                                    <button className="mt-1 bg-transparent font-bold underline flex items-center" onClick={(ev) => handleShowDescription(ev, true)}>
                                        Show More
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </>
                            }
                            {place.description?.length < 150 &&
                                <p>{place.description}</p>
                            }
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

                        {userDoc &&
                            <>
                                {userDoc?.id === place.owner &&
                                    <div className="flex items-center justify-center gap-2 mt-4 bg-primary h-fit p-4 text-center font-bold text-white text-3xl rounded-3xl">
                                        You'r Owner of this Place
                                    </div>
                                }
                                {userDoc?.id !== place.owner &&
                                    <BookingForm
                                        bookThisPlace={bookThisPlace}
                                        place={place}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        setCheckIn={setCheckIn}
                                        setCheckOut={setCheckOut}
                                        setGuest={setGuest}
                                        guest={guest}
                                        name={name}
                                        setName={setName}
                                        phone={phone}
                                        setPhone={setPhone}
                                        isBooking={isBooking}
                                        numberOfDays={numberOfDays}
                                    />
                                }
                            </>
                        }
                        {!userDoc &&
                            <div className="mt-4">
                                <Link to={'/login'} className="block text-center p-2 rounded-2xl font-bold text-white bg-primary hover:opacity-90" >
                                    Book Now
                                </Link>
                            </div>
                        }

                        <div className="-mx-8 px-8 my-8">
                            <div>
                                <span className="font-bold text-2xl">Extra Info</span>
                                <p>{place.extraInfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!ui &&
                <div className="md:bg-gray-100 md:-mx-4 md:py-4 md:px-8 md:my-8 md:rounded-2xl">
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

                    <PhoosView place={place} />


                    <div className="grid grid-cols-[2fr_1fr] gap-8" >
                        <div>
                            {place.description?.length > 150 &&
                                <>
                                    <p>{place.description?.substring(0, 300)}...</p>
                                    <button className="mt-1 bg-transparent font-bold underline flex items-center" onClick={(ev) => handleShowDescription(ev, true)}>
                                        Show More
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </>
                            }
                            {place.description?.length < 150 &&
                                <p>{place.description}</p>
                            }
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
                        {userDoc &&
                            <>
                                {userDoc?.id === place.owner &&
                                    <div className="flex items-center justify-center gap-2 mt-4 bg-primary h-fit p-4 text-center font-bold text-white text-3xl rounded-3xl">
                                        You'r Owner of this Place
                                    </div>
                                }
                                {userDoc?.id !== place.owner &&
                                    <BookingForm
                                        bookThisPlace={bookThisPlace}
                                        place={place}
                                        checkIn={checkIn}
                                        checkOut={checkOut}
                                        setCheckIn={setCheckIn}
                                        setCheckOut={setCheckOut}
                                        setGuest={setGuest}
                                        guest={guest}
                                        name={name}
                                        setName={setName}
                                        phone={phone}
                                        setPhone={setPhone}
                                        isBooking={isBooking}
                                        numberOfDays={numberOfDays}
                                    />
                                }
                            </>
                        }
                        {!userDoc &&
                            <div className="mt-4">
                                <Link to={'/login'} className="block text-center p-2 rounded-2xl font-bold text-white bg-primary hover:opacity-90" >
                                    Book Now
                                </Link>
                            </div>
                        }
                    </div>

                    <div className="-mx-8 px-8 my-8">
                        <div>
                            <span className="font-bold text-2xl">Extra Info</span>
                            <p>{place.extraInfo}</p>
                        </div>
                    </div>
                </div>
            }
        </>
        }
    </>
    )
}