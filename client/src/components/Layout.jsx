import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return <div className="md:p-4 flex flex-col min-h-screen">
        <Header/>
        <Outlet />
    </div>
}