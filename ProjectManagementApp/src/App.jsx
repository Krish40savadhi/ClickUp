import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import AuthProvider from './hooks/Authcontext'
import ProtectedRoutes from './routes/protectedroutes'
import Login from './pages/LoginPage'
import './App.css'
export default function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

