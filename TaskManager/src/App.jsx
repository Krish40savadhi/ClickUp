import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContent";
import { AuthProvider } from "./context/AuthenticationContext";
import Boards from "./pages/Boards";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Login from "./pages/LoginRegister";
import './App.css'
import DashboardLayout from "./pages/Dashboard";
import WelcomeDashboard from "./pages/WelcomeDashboard";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout/>
                </ProtectedRoute>
            }>
              <Route index element={<WelcomeDashboard/>}/>
              <Route path="tasks" element={
                <TaskProvider>
                <Boards/>
                  </TaskProvider>}/>
              <Route path="profile" element={<Profile/>}/>
           </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
