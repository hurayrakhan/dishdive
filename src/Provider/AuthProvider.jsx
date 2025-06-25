import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create, signIn user with email and password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    // google signin
    
    const signInWithGoogle = () => {
        setLoading(true);
        
        return signInWithPopup(auth, provider);
    }

    // Update User

    const updateUser = (updatedUser) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updatedUser)
    };

    // SignOut user
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }



    // observe the userdata
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, []);



    const authData = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        updateUser,
        signOutUser,

    }

    return (
        <AuthContext value={authData}>
            {
                children
            }
        </AuthContext>
    )
};

export default AuthProvider;

