import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthenticationContext';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
    const userName = user?.email ? user.email.split('@')[0] : '';

    return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
            <Link to="/dashboard/tasks" className="text-gray-700 hover:text-blue-500">Tasks</Link>
            <Link to="/dashboard/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
          </div>
          <div className="flex items-center space-x-4">
            <span>{userName || user?.email}</span>
            <button onClick={logout} className="text-red-500">Logout</button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}