import React, { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import firebase from './firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    onAuthStateChanged(firebase, (user) => {
        if (user) {
          console.log(user.email + ' is signed in')
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
          console.log('signed out');
        }
    });

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}