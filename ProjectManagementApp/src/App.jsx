import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthProvider from './context/Authcontext'
import ProtectedRoutes from './routes/protectedroutes'
import Login from './pages/LoginPage'
import './App.css'
import AdminDashboard from './pages/AdminDashborad'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Layout from './components/Layout'
import ProjectsPage from './pages/ProjectsPage'
import ProjectsNew from './pages/ProjectsNew'
import EmployeeNew from './pages/EmplolyeeNew'
import Tasks from './pages/Tasks'
import ProjectsDetails from './pages/ProjectsDetails'


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            element={
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
            }
          > */}
         
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectsDetails />} />
          <Route path="/projects/new" element={<ProjectsNew  />} />
          <Route path="/employees/new" element={<EmployeeNew/>} />
          <Route path="/tasks" element={<Tasks/>} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
