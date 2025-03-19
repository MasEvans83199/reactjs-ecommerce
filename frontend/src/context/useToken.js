import { useState } from "react";

export const useToken = () => {
    const [token, setInternalToken] = useState(() => localStorage.getItem("token"));

    const setToken = (newToken) => {
        if(!newToken) {
            localStorage.removeItem("token");
            setInternalToken(null);
        } else {
            localStorage.setItem("token", newToken);
            setInternalToken(newToken);
        }
    }

    return [token, setToken];
}