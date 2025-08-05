import { useMemo } from "react";
import { createContext,useContext,useState } from "react";

const DataContext = createContext();

function DisplayValue(){
    const data= useContext(DataContext);
    return <h1> {data.value}</h1>

}

export default function Memoization(){
    const [count,setCount]=useState(0);
    const memoizedvalue = useMemo(()=>{
        return {value:count};
    },[count]);

    return(
        <DataContext.Provider value={memoizedvalue}>
            <DisplayValue/>
            <button onClick={()=>{setCount(count+1)}}>Button ++</button>
        </DataContext.Provider>
    );

}