import { Link } from "react-router-dom";

export default function RegisterPage(){
    return (<div className="grow flex flex-col items-center justify-center mb-32">
    <h1 className="text-4xl text-center mb-4">Register</h1>
    <form className="max-w-md mx-auto">
        <input type="text" placeholder="john doe"/>
        <input type="email" placeholder="your@gmail.com"/>
        <input type="password" placeholder="password"/>
        <button className="primary">Register</button>
        <div className="text-gray-400 mt-2 text-center">you'r already meamber?
            <Link to={'/login'} className="text-black underline"> Login</Link>
        </div>
    </form>
</div>)
}