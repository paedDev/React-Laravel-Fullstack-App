import { createContext, useState } from "react";

export const GlobalContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
});

export default function GlobalState({ children }) {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };
    return <GlobalContext.Provider value={{ user, token, setUser, setToken }}>
        {children}
    </GlobalContext.Provider>;
}