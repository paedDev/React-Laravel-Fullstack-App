import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
});

export default function GlobalState({ children }) {
    const [user, setUser] = useState({
        name: "John"
    });
    // const [token, _setToken] = useState(123);
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
// just a shorthand of using the global context
// export const useStateContext = () => useContext(GlobalContext);