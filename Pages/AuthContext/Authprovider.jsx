import React, { createContext, use, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();
const auth = getAuth(app);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);




    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


       const logOut=()=>{
          return signOut(auth);

    }



     function googleLogin() {
    return signInWithPopup(auth, GoogleAuthProvider)
  }



    const authData = {
        user,
        setUser,
        createUser,
       googleLogin,
        logOut,
    };

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser?.email) {
            // Send current user email to the server for JWT token
            axios.post("http://localhost:3000/jwt", { email: currentUser.email })
               .then(res => {
                   console.log(res.data.token);
                   // You should store this token (e.g., in localStorage or cookies)
                   localStorage.setItem('token', res.data.token);
               })
               .catch(error => console.error('Token generation error:', error));
        } else {
            // Remove token if user logs out
            localStorage.removeItem('token');
        }
    });

    return () => unSubscribe();
}, []); // Empty dependency array is fine here since onAuthStateChanged manages its own subscriptions



    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};