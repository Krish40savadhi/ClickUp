import { createContext,useContext } from "react";

const ThemeContext = createContext('light'); // Default value is 'light'

function Child(){
    const theme = useContext(ThemeContext);
    return <h1>Current Theme : {theme}</h1> 
}

export default function BasicContext(){
    return(
        <ThemeContext.Provider value="dark">
            <Child/>           {/*aane props pass karia vagar hu dark display karavi eku */}
                               {/* Aane aa Child ne jo Themecontext.Provide ni vache wrap no kairo hoi ne to Light aavet */}
        </ThemeContext.Provider>
    );
}