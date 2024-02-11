import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { userAction } from '../../store/user';
import PlacesPage from './PlacesPage';

export default function AccountPage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const uiReady = useSelector(state => state.ui.isReady);
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState(false);

    const { subpage } = useParams();

    function linkClasses(type = null) {
        let classes = 'flex gap-2 px-4 py-2';
        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' rounded-full bg-primary text-white'
        } else {
            classes += ' rounded-full bg-gray-300 text-black'
        }
        return classes;
    }

    function handleLogout() {
        try {
            axios.get('/logout');
            dispatch(userAction.setUserDoc(null));
            setRedirect(true);
        } catch (e) {
            alert('logout Fail.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            {!uiReady &&
                <h1>Loading...</h1>
            }
            {(!userDoc && uiReady) &&
                <Navigate to={'/login'} />
            }
            {(userDoc && uiReady) &&
                <div>
                    <nav className='w-full flex justify-center mt-8 gap-4'>
                        <Link to={'/account'} className={linkClasses('profile')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            My Profile
                        </Link>
                        <Link to={'/account/booking'} className={linkClasses('booking')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            My Bookings
                        </Link>
                        <Link to={'/account/places'} className={linkClasses('places')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                            My Accommodations
                        </Link>
                    </nav>
                    {subpage === undefined &&
                        <div className='text-center mt-8'>
                            <h1>Hello,{userDoc.name}</h1>
                            <button
                                className='px-4 py-2 mt-4 rounded-full text-white transition ease-in-out delay-150 bg-primary hover:bg-indigo-700 duration-300'
                                onClick={handleLogout}
                            >Logout</button>
                        </div>
                    }
                    {subpage === 'places' &&
                        <PlacesPage/>
                    }
                </div>
            }
        </>
    )
}