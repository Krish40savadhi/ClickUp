import { useState } from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext();
const LanguageContext = createContext();

function ThemeProvider() {
  const theme = useContext(ThemeContext);
  const lang = useContext(LanguageContext);
  return (
    <div>
      <h1>Nested Context's </h1>
      <h1>Theme : {theme}</h1>
      <h1>Language : {lang}</h1>
    </div>
  );
}

export default function NestedConext() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={lang}>
        <ThemeProvider />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
