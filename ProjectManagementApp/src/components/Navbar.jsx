import { useAuth } from "../context/Authcontext";
import { Link } from "react-router-dom";


export default function Navbar(){
    const {user,logout}=useAuth();

    return(
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm h-16 flex items-center px-6 z-50">
            <div>
                <img
          src="https://cdn.prod.website-files.com/66c5b29662fc6ac27b54a965/66c5d861d60462d91e3e1111_sarvadhi-logo.svg"
          alt="Sarvadhi"
          className="h-30 w-30"
        />
            </div>
            <nav className="ml-auto flex items-center gap-6">
                {user &&(
                    <>
                   <Link to="/admin">Dashboard</Link>
                   <Link to="/employees">Employees</Link>
                   <Link to="/projects">Projects</Link>
                   <Link to="/tasks">Task</Link>
                    <button
              onClick={logout}
              className="text-sm text-black font-bold bg-gray-200 px-3 py-1.5 rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
                </>)}
            {/* {!user && <Link to="/login" className="text-blue-600">Login</Link>}         */}
            
            </nav>
        </header>
    );
}