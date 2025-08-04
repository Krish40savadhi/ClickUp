import { useState,useMemo } from "react";


 function SlowFactorial(n){
    if(n==0){
        return 1;
    }
    return n*SlowFactorial(n-1);
}

export default function FactorialExample(){
    const [num,setNum]=useState(5);
    const factorial = useMemo(()=>{
        SlowFactorial(num);
    },[num]);
    return(
        <>
            <h2>Factorial of {num} : {factorial}</h2>
            <button onClick={()=>{setNum(num+1)}}>Factorial++</button>
        </>
    );
}