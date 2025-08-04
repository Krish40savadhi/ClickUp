import {useEffect, useRef} from "react";

function Focus(){
    const ipref = useRef(null);
    useEffect(()=>{
        ipref.current.focus();
    },[])
    return(<>
        (1)
        <input ref={ipref} placeholder="Focus ON ME!!!"/>
    </>
    );
}

function Counter(){
    const countref = useRef(0);
    function handleclick(){
        countref.current++;
        console.log("(2)Counter",countref.current)
    }
    return(
        <>
            <button onClick={handleclick}>(2)click and check console</button>
        </>
    );
} 

function Timer(){
    const intervalref = useRef(null);
    useEffect(()=>{
        intervalref.current = setInterval(()=>{
            console.log("(3) Ref's Using timeouts")
        },[3000]);
        return ()=>{clearInterval(intervalref.current)}   //this is a cleanup function inside a useEffect 
        //Unmount :	Component is removed from DOM. Time to clean up timers, listeners, etc.
    },[]);
    return <p>(3) Check the console / session time</p>
}

function Previousprop({count}){
    const prevpropref = useRef();
    useEffect(()=>{
        prevpropref.current = count;
    },[count]);
    return(
        <>
           (4) Now:{count} and PreviousCount :{prevpropref.current}
        </>
    );
}


export default function UseRefdemo(){
    return(
        <>
        <Focus/>
        <Counter />
        <Timer />
        <Previousprop count={6}/>
        </>
    );
}