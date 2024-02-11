import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../PageUI/Loader";
import Place from "./Place";

export default function Places() {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/places').then((placeDoc) => {
            setPlaces(placeDoc.data);
            setIsLoading(false);
        });
    }, [])

    return (
        <>
            {!isLoading && <div className="flex flex-col gap-8 w-[700px]">
                {places.map(place => (
                    <Place {...place} key={place._id}/>
                ))}
            </div>}
            {isLoading &&
                <div className="mb-4">
                    <Loader />
                </div>
            }
        </>
    );
}