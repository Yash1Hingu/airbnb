import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { dateShow } from "../../util/dateShow";
import { Link } from "react-router-dom";
import ruppesShow from "../../util/ruppesShow";
import PlaceLoader from "../PageUI/PlaceLoader";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/indexplaces').then((res) => {
            setPlaces(res.data);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <PlaceLoader />
    }

    return (<>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8">
            {places.map(place => (
                <Link
                    to={'/place/' + place._id}
                    key={place._id}
                    className=""
                >
                    <div
                        className="rounded-2xl flex"
                    >
                        {place.photos[0] &&
                            <img src={`http://localhost:4000/upload/${place.photos[0]}`} alt="place photo"
                                className="rounded-2xl object-cover aspect-square" />
                        }
                    </div>
                    <h2 className="font-semibold mt-2 text-gray-900">{place.address}</h2>
                    <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
                    <h4 className="text-sm text-gray-500">
                        {dateShow(place.checkIn)} - {dateShow(place.checkOut)}
                    </h4>
                    <p className="flex items-center gap-1 text-sm">
                        <strong className="text-[14px] text-gray-700">&#8377;{ruppesShow(place.price)}</strong> night
                    </p>
                </Link>
            ))}
        </div>
    </>)
}