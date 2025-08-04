import {useRef} from "react";
import ChildFrwdRef from "./ForwardRefChild";

export default function ForwardRef(){
    const inputref=useRef();
    function handleclick(){
        inputref.current.focus();
    };

    return(
        <>
            <ChildFrwdRef ref={inputref} />
            <button onClick={handleclick}>(1) Click to Focus the input</button>
        </>
    );
}