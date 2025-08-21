import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout(){
    return(
        <div className="min-h-screen bg-white-50">
            <Navbar/>
        <main className="pt-20 px-4"><Outlet/></main>
        </div>
    );
}

