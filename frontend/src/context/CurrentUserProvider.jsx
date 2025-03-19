import { createContext, useEffect, useState } from "react";
import { useToken } from "./useToken";
import { jwtDecode } from "jwt-decode";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
    const [token, setToken] = useToken();

    const getCurrentUser = () => {
        if(!token)
            return null;

        try {
            return jwtDecode(token);
        } catch(e) {
            console.log("Error decoding token:", token, e);
            setToken(null);
        }
    }

    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

    useEffect(()=> setCurrentUser(() => getCurrentUser()), [token]);
    console.log("Current user:", currentUser);

    return (
        <CurrentUserContext.Provider value={[currentUser, token, setToken]}>
            {children}
        </CurrentUserContext.Provider>
    )
}