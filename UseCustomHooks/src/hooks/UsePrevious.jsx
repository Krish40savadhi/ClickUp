import { useState,useEffect ,useRef } from "react";

function usePreviousHook(value){
    const ref = useRef();
    useEffect(()=>{
        ref.current = value;
    });
    return ref.current;
}

export default function UsePrevious(){
    const [count,setCount]=useState(0);
    const prev = usePreviousHook(count);
    return(<>   
    <p>Now:{count} And Previus :{prev}</p>
    <button onClick={(e)=>{setCount(count+1)}}>Count++</button>
    </>
    );

}