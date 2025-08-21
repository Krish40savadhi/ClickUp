import { useAuth } from '../context/Authcontext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm h-16 flex items-center px-6 z-50">
      <div>
        <img
          src="https://cdn.prod.website-files.com/66c5b29662fc6ac27b54a965/66c5d861d60462d91e3e1111_sarvadhi-logo.svg"
          alt="Sarvadhi"
          className="h-30 w-30"
        />
      </div>
      <nav className="ml-auto flex items-center gap-6">
        {/* Admin only */}
        {user.role === 'admin' && (
          <>
            <Link to="/admin">Dashboard</Link>
             <Link to="/projects">Projects</Link>
            <Link to="/employees">Employees</Link>
          </>
        )}

        {/* Employee only */}
        {user.role === 'employee' && <Link to="/projects">Projects</Link>}

        <Link to="/tasks">Tasks</Link>
        <div className='flex gap-2'>
        <button
          onClick={logout}
          className="text-lg text-black font-bold bg-gray-200 px-5 py-2.5 rounded-lg"
          >
          Logout
        </button>
          <button
        onClick={() => navigate(-1)}
        className="text-lg text-black font-bold bg-gray-200 px-2.5 py-2.5 rounded-lg"
      >
        ←
      </button>
        </div>
      </nav>
    
    </header>
  )
}
