import { useState,useMemo } from "react";

const numbers=[10,50,20,30,40];

export default function ExpensiveSorting(){
    const [toggle,setToggle]=useState(false);
    const sortedNUmbers=useMemo(()=>{
        console.log("sorting....");
        return [...numbers].sort((a,b)=>{a-b})
    },[]);


    return(
        <>
        <h3>Sorted Numbers: {sortedNUmbers.join(',')}</h3>
        <button onClick={()=>{setToggle(!toggle)}}>Re-render</button>
        </>
    );
}