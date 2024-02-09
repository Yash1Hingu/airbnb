export default function Perks({ selected, onChange }) {
    return (
        <>
            <div className="mt-2">
                <h2 className="text-2xl font-bold">Perks</h2>
                <p className="text-sm text-gray-500">select all the perks of your place.</p>
                <div className="grid grid-cols-3">
                    <label className="placepage_checkbox">
                        <input type="checkbox" />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                            Wi-Fi
                        </span>
                    </label>
                    <label className="placepage_checkbox">
                        <input type="checkbox" />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M23 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v19a1 1 0 1 1-2 0V11h-1a2 2 0 0 1-2-2zm-1.5 0H10.407a4 4 0 0 0-3.905 3.132L5.864 9H5a1 1 0 0 0 0 2h.42l-.33 1.485A4 4 0 0 0 3 16v10a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-1h12v1a3 3 0 0 0 2.5 2.959v-2.093A1 1 0 0 1 24 26v-1h.5v-2H5v-7a2 2 0 0 1 2-2h17.5v-1.535A3.48 3.48 0 0 1 23.196 12H7.246l1.208-5.434A2 2 0 0 1 10.406 5H21.5zM5 26v-1h3v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1m7.5-6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m-3-1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M24 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
                            </svg>
                            Free Parking Spot
                        </span>
                    </label>
                    <label className="placepage_checkbox">
                        <input type="checkbox" />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M13.5 7v4m0 2v-2m0 0l1.37-1.566M17 7l-2.13 2.434m0 0L17 13M9.5 7l-3 4.5H10V13"></path><path d="M2 16.4V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6v12.8a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6Z"></path></g></svg>
                            TV
                        </span>
                    </label>
                    <label className="placepage_checkbox">
                        <input type="checkbox" />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9c.36 1.77-.29 3.35-1.47 3.53c-1.17.18-2.43-1.11-2.8-2.89c-.37-1.77.3-3.35 1.48-3.54m7.15 0c1.19.19 1.85 1.77 1.5 3.54c-.38 1.78-1.63 3.07-2.81 2.89c-1.19-.18-1.84-1.76-1.47-3.53c.36-1.78 1.61-3.07 2.78-2.9M3 7.6c1.14-.49 2.69.4 3.5 1.95c.76 1.58.5 3.24-.63 3.73c-1.13.49-2.67-.39-3.46-1.96C1.62 9.75 1.9 8.08 3 7.6m18 0c1.1.48 1.38 2.15.59 3.72c-.79 1.57-2.33 2.45-3.46 1.96c-1.13-.49-1.39-2.15-.63-3.73C18.31 8 19.86 7.11 21 7.6m-1.67 10.78c.04.94-.68 1.98-1.54 2.37c-1.79.82-3.91-.88-5.9-.88c-1.99 0-4.13 1.77-5.89.88c-1-.49-1.69-1.79-1.56-2.87c.18-1.49 1.97-2.29 3.03-3.38c1.41-1.41 2.41-4.06 4.42-4.06c2 0 3.06 2.61 4.41 4.06c1.11 1.22 2.96 2.25 3.03 3.88"></path></svg>
                            Pets
                        </span>
                    </label>
                    <label className="placepage_checkbox">
                        <input type="checkbox" />
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M232 218h-26V40a14 14 0 0 0-14-14H64a14 14 0 0 0-14 14v178H24a6 6 0 0 0 0 12h208a6 6 0 0 0 0-12M194 40v178h-20V40a14.71 14.71 0 0 0-.16-2H192a2 2 0 0 1 2 2M62 40a2 2 0 0 1 2-2h96a2 2 0 0 1 2 2v178H62Zm82 92a12 12 0 1 1-12-12a12 12 0 0 1 12 12"></path></svg>
                            Private Entrance
                        </span>
                    </label>
                </div>
            </div>
        </>
    )
}