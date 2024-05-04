import { useContext, createContext, useEffect, useState} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const AuthContext = createContext();
import { auth } from "../firebase";

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    };

    const googleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {  
            setUser(currentUser);
            console.log(currentUser);
        });   
        return () => {
            unsubscribe();
        };
    }
    , []);
  return <AuthContext.Provider value={{ googleSignIn, googleSignOut, user  }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
