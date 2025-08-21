import Navbar from "./Navbar";

export default function Layout({children}){
    return(
        <div className="min-h-screen bg-white-50">
            <Navbar/>
        <main className="pt-20 px-4">{children}</main>
        </div>
    );
}

