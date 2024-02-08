import { Link } from "react-router-dom";

export default function LoginPage(){
    return (<div className="grow flex flex-col items-center justify-center mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
            <input type="email" placeholder="your@gmail.com"/>
            <input type="password" placeholder="password"/>
            <button className="primary">Login</button>
            <div className="text-gray-400 mt-2 text-center">Don't have an account yet?
                <Link to={'/register'} className="text-black underline"> Register</Link>
            </div>
        </form>
    </div>)
}   