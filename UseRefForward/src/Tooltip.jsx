import React,{useRef,useState,forwardRef} from "react";
import ReactDOM from 'react-dom';


function TooltipCompo({tarfetRef,text}){

    if(!tarfetRef.current) return null;
    const rect = tarfetRef.current.getBoundingClientRect();

    
      const style = {
    position: "absolute",
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX,
    background: "#333",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px"
  };

  return ReactDOM.createPortal(<div style={style}>{text}</ div>,document.body)   
}

export default function Tooltip (){
    const btn = useRef();
    const [show,setShow]=useState(false);
    return(
        <div style={{margin:"100px"}}>
            <button 
            ref={btn}
            onMouseEnter={()=>{setShow(true)}}
            onMouseLeave={()=>{setShow(false)}}
                >
                (3)hover me!!
            </button>
        {show && <TooltipCompo tarfetRef={btn} text={"Ha Ha , you hovered me!"}/>}

        </div>
    );
}
