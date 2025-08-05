import { createContext,useContext } from "react";

const UserContext = createContext({ name: "Guest", age: 0 }); // Default user context aapvanu in case if now wrapped within UserContext.Provider

function Profile(){
    const user = useContext(UserContext);
    console.log(user);
    return <h1>User Name: {user.name}, Age: {user.age}</h1>;
}

export default function DynamicValues(){
    const user = {name: "John Doe", age: 30};
    return(
        <UserContext.Provider value={user}>
            <Profile/>
        </UserContext.Provider>
    );
}
