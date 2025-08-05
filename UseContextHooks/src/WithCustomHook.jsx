import { createContext,useContext } from "react";


const AuthContext = createContext();

function UseAuth(){   // Custom Hook
    return useContext(AuthContext);
}

function Profile(){
    const {userId , password} = UseAuth();
    return(
        <>
            UserName : {userId} <br />
            Password : {password} <br />
        </>
    );
    }

export default function WithUseReducer(){
    const auth = {userId:"Krish_40" , password:"12345"};

    return(
        <AuthContext.Provider value={auth}>
          <Profile/>  
        </AuthContext.Provider>
    )

}