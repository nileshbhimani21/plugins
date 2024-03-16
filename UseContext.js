import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(false);
  const themeChange = () => {
    setTheme(!theme);
  };
  return <ThemeContext.Provider value={{ theme, themeChange }}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };

---------------------

import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function Content() {
  const { theme, themeChange } = useContext(ThemeContext);
  return (
    <div className="App" style={{ background: theme ? "#000" : "#f00" }}>
      <header className="App-header">
        <p>Welcome</p>
        <button type="button" onClick={() => themeChange()} className="App-link">
          Theme Toggle
        </button>
      </header>
    </div>
  );
}
