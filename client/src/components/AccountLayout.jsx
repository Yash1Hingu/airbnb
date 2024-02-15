import { Outlet } from "react-router-dom";
import AccountNavbar from "./PageComponents/AccountNavbar";

export default function Layout() {
    return <div className="">
        <AccountNavbar />
        <Outlet />
    </div>
}