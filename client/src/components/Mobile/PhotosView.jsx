import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

export default function PhotosView({ place }) {
    const [isShow, setIsShow] = useState(false);
    function showAllPhotos(ev, state) {
        ev.preventDefault();
        setIsShow(state);
    }

    if (isShow) {
        return (
            <div className="absolute bg-gray-900 top-0 left-0 w-full flex flex-col p-8 items-center gap-8">
                <div>
                    {place.photos?.map(img => (
                        <img src={img} alt="" className="rounded-3xl mb-8"
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640, // Adjust this breakpoint based on your mobile design
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div onClick={(ev) => showAllPhotos(ev, true)} className="max-w-screen-sm  -mx-4 mt-4 relative overflow-hidden">
            <Slider {...settings}>
                {place.photos?.map((photo, index) => (
                    <>
                        <div key={index} className="mx-auto">
                            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-auto aspect-video object-cover" />
                        </div>
                        <div className='absolute bottom-2 right-2'>0/100</div>
                    </>
                ))}
            </Slider>
        </div>
    );
};