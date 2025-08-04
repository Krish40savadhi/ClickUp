import React,{useState, useMemo, memo } from "react";

//Memoizing an object to prevent child render 

const Child = memo(function Child({config}){

    console.log('Child rendered');
    return <div>Theme:{config.theme} This'll not render using memo</div>

});

export default function PreventChildRender(){
    const [count,setCount]=useState(0);
    const config = useMemo(()=>({theme:"dark"}),[]);
    return(
        <>
            <Child config={config}/>
            <button onClick={()=>{setCount(count+1)}}>Increment:{count}</button>
        </>
    );
}