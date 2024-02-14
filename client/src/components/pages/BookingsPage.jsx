import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/booking').then((res) => {
            setBookings(res.data);
        })
    }, [])
    return (
        <div>
            {bookings.map(place => (
                <div>{place.checkIn}</div>
            ))}
        </div>
    )
}