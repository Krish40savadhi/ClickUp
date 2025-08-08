import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationContext';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const userName = user?.email ? user.email.split('@')[0] : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-800">TaskManager</h1>
              <div className="hidden md:flex space-x-4">
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/tasks" 
                  className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Tasks
                </Link>
                <Link 
                  to="/dashboard/profile" 
                  className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </Link>
                 <Link 
                  to="/dashboard/game" 
                  className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Games
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {userName[0]?.toUpperCase()}
                </div>
                <span className="text-gray-700">{userName}</span>
              </div>
              <button 
                onClick={logout} 
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}