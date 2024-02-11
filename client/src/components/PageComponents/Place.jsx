import { Link } from "react-router-dom";

export default function Place({ ...place }) {
    return (
        <Link to={'/account/places/edit/'+place._id} className="grid grid-cols-2 h-[200px] gap-8 overflow-hidden rounded-2xl">
            <div className="relative w-full rounded-2xl overflow-hidden">
                <img
                    src={'http://localhost:4000/upload/' + place.photos[0]}
                    alt="place image"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover w-full h-full"
                />
            </div>
            <div>
                <h1 className="text-xl font-bold text-gray-700">{place.title}</h1>
                <p>{place.description}</p>
            </div>
        </Link>
    )
}