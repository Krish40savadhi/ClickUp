import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthProvider from './context/Authcontext'
import ProtectedRoutes from './routes/ProtectedRoutes'

import Login from './pages/LoginPage'
import Layout from './components/Layout'

import './App.css'
import 'antd/dist/reset.css' 

import AdminDashboard from './pages/AdminDashborad'
import ProjectsPage from './pages/ProjectsPage'
import ProjectsDetails from './pages/ProjectsDetails'
import ProjectsNew from './pages/ProjectsNew'
import EmployeeNew from './pages/EmplolyeeNew'
import Tasks from './pages/Tasks'
import ProjectsEdit from './pages/ProjectsEdit'

function Unauthorised() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-gray-600 mt-2">You don’t have access to this page.</p>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorised />} />
          {/* Role-based Routes */}

          {/* <Route element={<ProtectedRoutes />}> */}
            <Route element={<Layout />}>
              <Route element={<ProtectedRoutes roles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/employees" element={<EmployeeNew />} />
                <Route path="/projects/new" element={<ProjectsNew />} />
                <Route path="/projects/edit/:id" element={<ProjectsEdit/>} />
              </Route>

              <Route
                element={<ProtectedRoutes roles={['admin', 'employee']} />}
              >
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectsDetails />} />
                <Route path="/tasks" element={<Tasks />} />
              </Route>
            </Route>
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
