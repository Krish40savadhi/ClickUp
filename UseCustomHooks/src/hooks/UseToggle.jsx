import { useState} from "react";


function useToggle(initial=false){
    const [state,setState]=useState(initial);
    const toggle = ()=> setState(prev=>!prev);
    return [state,toggle];
}

export default function UseToggle(){
        const [isOn , isToggleOn]=useToggle(false); // aa state aane toggle ni values lese\
        return(
            <button onClick={isToggleOn}>Use Toggle :{isOn ? "ON" : "OFF"}</button>
        );
}   