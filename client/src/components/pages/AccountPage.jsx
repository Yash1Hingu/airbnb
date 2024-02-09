import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { userAction } from '../../store/user';
export default function AccountPage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const uiReady = useSelector(state => state.ui.isReady);
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState(false);

    const { subpage } = useParams();

    function linkClasses(type = null) {
        let classes = 'px-4 py-2';

        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' rounded-full bg-primary text-white'
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
                        <Link to={'/account'} className={linkClasses('profile')}>My Profile</Link>
                        <Link to={'/account/booking'} className={linkClasses('booking')}>My Bookings</Link>
                        <Link to={'/account/places'} className={linkClasses('places')}>My Accommodations</Link>
                    </nav>
                    {subpage === undefined &&
                        <div className='text-center mt-8'>
                            <h1>Hello,{userDoc.name}</h1>
                            <button
                                className='px-4 py-2 mt-4 rounded-full bg-primary text-white'
                                onClick={handleLogout}
                            >Logout</button>
                        </div>
                    }
                </div>
            }
        </>
    )
}