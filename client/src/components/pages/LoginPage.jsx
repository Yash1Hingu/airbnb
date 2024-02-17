import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from "react-router-dom";

import { userAction } from '../../store/user';
import Loader from '../PageUI/Loader';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [isLoging, setIsLoging] = useState(false);
    const [passwordinValid, setpasswordInValid] = useState(false);
    const [notExist, setNotExist] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setpasswordInValid(false);
        setNotExist(false);
        setIsLoging(true);

        await axios.post('/login', {
            email,
            password
        }).then((response) => {
            dispatch(userAction.setUserDoc(response.data));
            setIsLoging(false);
            setRedirect(true);
        }).catch((err) => {
            const msg = err.response.data.msg;
            setIsLoging(false);
            switch (msg) {
                case "NOTFOUND": setNotExist(true); break;
                case "INVALIDPASSWORD": setpasswordInValid(true); break;
            }
        })

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <>
            {isLoging && (
                <div className='h-[80vh] flex justify-center items-center'>
                    <Loader/>
                </div>
            )}
            {!isLoging &&
                <div className="grow flex flex-col items-center justify-center mb-32">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="your@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoging}
                            className={`${notExist && "border-red-500 text-black bg-red-300"}`}
                        />
                        {notExist && <span className='ml-2 text-red-500 text-sm'>*This email is not exist.</span>}
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={isLoging}
                            className={`${passwordinValid && "border-red-500 text-black bg-red-300"}`}
                        />
                        {passwordinValid && <span className='ml-2 text-red-500 text-sm'>*please enter valid password</span>}
                        <button type="submit" className="primary" disabled={isLoging}>Login</button>
                        <div className="text-gray-400 mt-2 text-center">Don't have an account yet?
                            <Link to={'/register'} className={`${notExist ? "text-red-600 " : "text-black "} underline`}> Register</Link>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}   