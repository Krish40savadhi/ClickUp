import { useState,useCallback } from "react";

function debounce(fn, delay) {
  let timer;
  return (...args) => {          //returning a function with parameters like(...args)=>{}
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function Debouncing(){
    const [query , setQuery]=useState("");
    const handleChange = useCallback(
        debounce((value)=>console.log("Searching",value),500),[]);

    return(
        <>
            <input type="text" value={query}
             onChange={e=>{
                   setQuery(e.target.value);
                   handleChange(e.target.value); 
            }} />
            <p>search and check the console</p>
        </>
    );
} 