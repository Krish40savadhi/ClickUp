import { useAuth } from '../context/Authcontext'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const linkClass = ({ isActive }) =>
    isActive ? 'border-b-2 border-blue-600 pb-1' : 'text-gray-700 pb-1'

  function handleLogout() {
    logout()
    navigate('/login')
  }
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm h-[74px] flex items-center px-10 z-50">
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
            <NavLink to="/admin" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/employees" className={linkClass}>
              Employees
            </NavLink>
          </>
        )}

        {/* Employee only */}
        {user.role === 'employee' && (
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
        )}

        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>

        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="text-lg text-black font-bold bg-gray-200 px-5 py-2.5 rounded-lg"
          >
            Logout
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-lg text-black font-bold bg-gray-200 px-2.5 py-2.5 rounded-lg"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_239)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.5 10.5C17.5 10.8452 17.2202 11.125 16.875 11.125H4.63359L9.19219 15.6828C9.4364 15.927 9.4364 16.323 9.19219 16.5672C8.94797 16.8114 8.55203 16.8114 8.30781 16.5672L2.68281 10.9422C2.56545 10.825 2.49951 10.6659 2.49951 10.5C2.49951 10.3341 2.56545 10.175 2.68281 10.0578L8.30781 4.43281C8.55203 4.1886 8.94797 4.1886 9.19219 4.43281C9.4364 4.67703 9.4364 5.07297 9.19219 5.31719L4.63359 9.875H16.875C17.2202 9.875 17.5 10.1548 17.5 10.5Z"
                  fill="#121417"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_239">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
