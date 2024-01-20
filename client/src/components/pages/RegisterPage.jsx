import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister(ev){
        ev.preventDefault();
        await axios.post('/register',{
            name,
            email,
            password
        });
        
    }
    return (<div className="grow flex flex-col items-center justify-center mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="john doe"
                value={name}
                onChange={ev => setName(ev.target.value)}
            />
            <input
                type="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
            />
            <input 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            />
            <button className="primary">Register</button>
            <div className="text-gray-400 mt-2 text-center">you'r already meamber?
                <Link to={'/login'} className="text-black underline"> Login</Link>
            </div>
        </form>
    </div>)
}