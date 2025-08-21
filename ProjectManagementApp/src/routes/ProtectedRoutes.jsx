import { useAuth } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(children,roles){
    const user = useAuth();
    if(!user) <Navigate to="/login" replace/>
    if(roles && !roles.included(user.role)){
        return <Navigate to="/unauthorized" replace/>
    }
    return children;
}