import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure Google provider to request profile information
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }



    const authData = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        googleLogin,
        logOut,
    };

useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('Auth state changed - currentUser:', {
            uid: currentUser?.uid,
            email: currentUser?.email,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL
        });
        setUser(currentUser);
        setLoading(false);
        if (currentUser?.email) {
            // Send current user email to the server for JWT token
            axios.post("https://server-sepia-nine.vercel.app/jwt", { email: currentUser.email })
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