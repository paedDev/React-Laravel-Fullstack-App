import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { },
    theme: 'light',
    toggleTheme: () => {

    }
});

export default function GlobalState({ children }) {
    const [user, setUser] = useState({
    });
    const [theme, setTheme] = useState(localStorage.getItem('theme' || 'light'));
    // const [token, _setToken] = useState(123);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const toggleTheme = () => {
        setTheme(t => (t === "light" ? 'dark' : 'light'));
    };
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem("theme", theme);
    }, [theme]);
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <GlobalContext.Provider value={{ user, token, setUser, setToken, theme, toggleTheme }}>
            {children}
        </GlobalContext.Provider>
    );
}
// just a shorthand of using the global context
// export const useStateContext = () => useContext(GlobalContext);
