import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContent';
import { useAuth } from '../context/AuthenticationContext';

export default function WelcomeDashboard() {
  const { user } = useAuth();

  const userName = user?.email ? user.email.split('@')[0] : '';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600">
          Here's your task management overview
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/dashboard/tasks"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Manage Tasks
          </h2>
          <p className="text-gray-600">
            Create, update, and organize your tasks across different boards
          </p>
        </Link>

        <Link 
          to="/dashboard/profile"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Update Profile
          </h2>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </Link>
      </div>
    </div>
  );
}