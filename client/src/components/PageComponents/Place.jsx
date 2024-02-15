import { Link } from "react-router-dom";

export default function Place({ ...place }) {

    return (
        <Link to={'/account/places/edit/'+place._id} className="grid grid-cols-[2fr_4fr] gap-4">
            <div className="relative aspect-square">
                <img
                    src={place.photos[0]}
                    alt="place image"
                    className="relative rounded-2xl aspect-square"
                />
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-700">{place.title}</h1>
                <p>{place.description.substring(0,200)+'...'}</p>
            </div>
        </Link>
    )
}