import ruppesShow from "../../util/ruppesShow";
import Loader from "../PageUI/Loader";

export default function BookingForm({bookThisPlace,place,checkIn,checkOut,setCheckIn,setCheckOut,setGuest,guest,name,setName,phone,setPhone,isBooking,numberOfDays}){
    return (
        <form className=" bg-white p-8 rounded-2xl shadow-lg mt-4" onSubmit={bookThisPlace}>
            <div className="text-center text-2xl">Price: <strong className="text-gray-700">&#8377;{ruppesShow(place.price)}</strong> /per night</div>
            <div className="grid grid-cols-2 border border-gray-600 rounded-2xl mt-4">
                <div className="border-r border-gray-600 p-2">
                    Check In:
                    <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
                        min={place.checkIn}
                        max={place.checkOut}
                        required
                    />
                </div>
                <div className="p-2">
                    Check Out:
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                        min={place.checkIn}
                        max={place.checkOut}
                        required
                    />
                </div>
                <div className="col-span-2 p-2 border-t border-gray-600">
                    Guest:
                    <input type="number" min={1} max={place.maxGuests} value={guest} onChange={ev => setGuest(ev.target.value)} required />
                </div>
            </div>
            <div className="col-span-2 p-2 border-gray-600">
                Name
                <input type="text" value={name} onChange={ev => setName(ev.target.value)} required />
            </div>
            <div className="col-span-2 p-2 border-gray-600">
                Phone
                <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} required />
            </div>
            {isBooking &&
                <Loader  />
            }
            {!isBooking &&
                <button className={` ${numberOfDays <= 0 ? "bg-gray-600 cursor-not-allowed" : "bg-primary hover:opacity-90 "} w-full mt-4 p-2 rounded-xl text-white`}
                    disabled={numberOfDays <= 0}
                >Book Now
                    <span className="pl-2">{numberOfDays > 0 && ruppesShow(numberOfDays * place.price + place.price)}</span>
                </button>
            }
        </form>
    )
}