import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../PageUI/Loader";
import { userAction } from "../../store/user";
import axios from "axios";

export default function ProfilePage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const uiReady = useSelector(state => state.ui.isReady);
    const dispatch = useDispatch();

    const [redirect, setRedirect] = useState(false);

    function handleLogout() {
        try {
            axios.get('/logout');
            dispatch(userAction.setUserDoc(null));
            setRedirect(true);
        } catch (e) {
            alert(e);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (<>
        {!uiReady &&
            <div className="mb-4 mx-auto">
            <Loader />
        </div>
        }
        {uiReady &&

            <div className='text-center mt-8'>
                <h1>Hello,{userDoc.name}</h1>
                <button
                    className='px-4 py-2 mt-4 rounded-full text-white transition ease-in-out delay-150 bg-primary hover:bg-indigo-700 duration-300'
                    onClick={handleLogout}
                >Logout</button>
            </div>
        }
    </>
    )
}