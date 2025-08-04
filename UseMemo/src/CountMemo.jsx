import React,{ useState,useMemo } from "react";

export default function CountMemo(){
    const [count, setCount] = useState(0);
    const Squared = useMemo(()=>{return count*count},[count]);

    return(
        <>
            <h2>Square:{Squared}</h2>
            <button onClick={()=>{setCount(count+1)}}>Increment Count</button>
        </>
    );
}