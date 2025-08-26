import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthProvider from './context/Authcontext'

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
import Unauthorised from './components/Unauthorized'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorised />} />
          <Route element={<Layout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/employees" element={<EmployeeNew />} />
            <Route path="/projects/new" element={<ProjectsNew />} />
            <Route path="/projects/edit/:id" element={<ProjectsEdit />} />

            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectsDetails />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
