import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            await axios.post('/login', {
                email,
                password
            })
            alert('login success.')
            setRedirect(true);
        } catch (e) {
            alert('login failed.')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (<div className="grow flex flex-col items-center justify-center mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="primary">Login</button>
            <div className="text-gray-400 mt-2 text-center">Don't have an account yet?
                <Link to={'/register'} className="text-black underline"> Register</Link>
            </div>
        </form>
    </div>)
}   