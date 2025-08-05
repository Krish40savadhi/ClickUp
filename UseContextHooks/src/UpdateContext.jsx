import { useState } from "react";
import { createContext,useContext } from "react";


const ThemeContext = createContext();

function ThemeToggle(){
    const {theme,toggletheme}=useContext(ThemeContext);
    return(
        <button onClick={toggletheme}>Switch to {theme==='light'? 'Dark':'Light' }</button>
    );
}


export default function UpdateContext(){
    const [theme,setTheme]=useState('light');
    const toggletheme=()=>setTheme(theme === 'light'?'dark':'light');

    return(
        <ThemeContext.Provider value={{theme,toggletheme}}>
            <ThemeToggle/>
            </ThemeContext.Provider>
    );
}