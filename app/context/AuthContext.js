import React, { useEffect, useReducer, useState } from "react";
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import {auth} from '../../firebase/firebase';

const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };
  export const AuthContext = React.createContext();
  const initialState = {
    currentUser: null,
  };

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = React.useState(true);
    const [state, dispatch] = useReducer(reducer, initialState);
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("Auth state changed:", user);
            setCurrentUser(user);
            console.log("currentUser in Auth.js:", user); // Add this lin
            setLoading(false);
            dispatch({ type: "SET_USER", payload: user });
          });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};