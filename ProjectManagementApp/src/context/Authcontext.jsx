import { createContext, useContext, useEffect, useReducer } from "react";
import { loginRequest } from "../services/auth";

const AuthContext = createContext();

const initialize={
    user:null,
    token:null,
    status:"idle"
};

function reducer(state,action){
    switch(action.type){
        case "RESTORE":
            return {...state,...action.payload,status:action.payload?.user?"authenticated":"idle"};
        case "LOGIN_START":
            return {...state,status:"Loading"};
        case "LOGIN_SUCCESS":
            return {user:action.payload.user,token:action.payload.token,status:"authenticated"};
        case "LOGOUT":
            return{user:null,token:null,status:"idle"};
        default:
            return state;
        }
}


export default function AuthProvider({children}){
        
    const [state,dispatch] = useReducer(reducer,initialize, (initial) => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initial,
          ...parsed,
          status: parsed.user ? "authenticated" : "idle"
        };
      } catch {
        return initial;
      }
    }
    return initial;
  });
    
    useEffect(()=>{
        localStorage.setItem("auth",JSON.stringify({user:state.user , token:state.token}));
    },[state.user , state.token]);
    
    const login =async(email,password)=>{
        dispatch({type:"LOGIN_START"});
        const res = await loginRequest(email,password);
        dispatch({type:"LOGIN_SUCCESS",payload: res });
        return res;
    }

    const logout = ()=>{dispatch({type:"LOGOUT"})};

    return(
            <AuthContext.Provider value={{...state,login,logout}}>{children}</AuthContext.Provider>
        )
} 

export const useAuth = ()=>useContext(AuthContext);