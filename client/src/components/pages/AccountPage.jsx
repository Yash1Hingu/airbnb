import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

export default function AccountPage() {
    const userDoc = useSelector(state => state.user.userDoc);
    const uiReady = useSelector(state => state.ui.isReady);

    return (
        <>
            {!uiReady &&
                <h1>Loading...</h1>
            }
            {(!userDoc && uiReady) &&
                <Navigate to={'/login'} />
            }
        </>
    )
}