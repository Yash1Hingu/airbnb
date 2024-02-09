import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
export default function AccountPage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const uiReady = useSelector(state => state.ui.isReady);

    const dispatch = useDispatch();

    const parmas = useParams();

    function linkClasses(type = null) {
        let classes = 'px-4 py-2';

        if(type === parmas.subpage || (parmas.subpage === undefined && type === 'profile')){
            classes += ' rounded-full bg-primary text-white'
        }
        return classes;
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
                </div>
            }
        </>
    )
}