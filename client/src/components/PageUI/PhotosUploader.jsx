import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {
    const [photoLink, setPhotoLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        setIsLoading(true);
        await axios.post('/upload-by-link', { link: photoLink }).then(({ data: fileName }) => {
            setAddedPhotos(prev => {
                return [...prev, fileName.newName];
            });
        }).catch((err) => {
            alert("Not Getting Image!,Please Try with other url!");
        })
        setIsLoading(false);
        setPhotoLink('');
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


    return (
        <>
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
                            <div className='h-32 flex' key={link}>
                                <img
                                    src={'http://localhost:4000/upload/' + link}
                                    alt=""
                                    className='w-full rounded-lg object-cover'
                                    />
                            </div>
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
        </>
    );
}