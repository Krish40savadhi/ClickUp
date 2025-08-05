import { createContext,useContext } from "react";

const DefContext = createContext('Default value');

function DisplayValue(){
    const value = useContext(DefContext);
    return <h1>Default context's value is : {value}</h1>
}


export default function DefaultContext(){
    return(
        <DisplayValue/>    // if not wraped within DefaultContext.Provider, it will display 'Default value'
    );
}