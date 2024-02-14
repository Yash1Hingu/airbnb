import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {
    const [photoLink, setPhotoLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        setIsLoading(true);
        await axios.post('/upload-by-link', { link: photoLink }).then(({ data }) => {
            setAddedPhotos(prev => {
                return [...prev, data.newPath];
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

    function removePhoto(ev,filename) {
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
    }
    
    function selectedAsFirstPhoto(ev,filename){
        ev.preventDefault();
        setAddedPhotos([filename,...addedPhotos.filter(photo => photo !== filename)]);
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
                        <button onClick={addPhotoByLink} className="bg-primary text-white p-2 rounded-lg"
                            disabled={photoLink === '' ? true : false}
                        >
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
                            <div className='h-32 flex relative' key={link}>
                                <img
                                    src={link}
                                    alt=""
                                    className='w-full rounded-lg object-cover'
                                />
                                <button onClick={(ev) => selectedAsFirstPhoto(ev,link)} className="absolute bottom-2 left-2 text-white bg-black opacity-50 p-2 rounded-2xl">
                                    {link === addedPhotos[0] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff00a" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>

                                    )}
                                    {link !== addedPhotos[0] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    )}
                                </button>
                                <button onClick={(ev) => removePhoto(ev,link)} className="absolute bottom-2 right-2 text-white bg-black opacity-50 p-2 rounded-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
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