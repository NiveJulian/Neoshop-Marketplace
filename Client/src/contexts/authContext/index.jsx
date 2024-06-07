import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import onAuthStateChanged from "firebase/auth";

const authContext = React.createContext();

export function useAuth() {
    return useContext(authContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, initializeUser);
        return unsuscribe;
    })

    async function initializeUser(user) {
        if(user) {
            setCurrentUser({...user});
            setUserLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    }

    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    )
}
    
