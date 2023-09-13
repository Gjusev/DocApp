"use client"
import React ,{useContext, useEffect, useState}from 'react'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import{AuthContext} from './context/AuthContext'
import { db } from "../firebase/firebase.js";
import '../styles/globals.css'
import { doc, getDoc } from "firebase/firestore";

function HomePage() { 
    
    const [userType, setUserType] = useState("");
    const  {currentUser}  = useContext(AuthContext);
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
      }
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser.email);
          const getUserRole = async () => {
            const userDoc = await getDoc(doc(db, "users", currentUser.email));
            const type = userDoc.data().userType;
            setUserType(type);
          };
          getUserRole();
        }
      }, [currentUser]);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%', padding: '20px' }}>
        <h1>Bienvenido</h1>
        <p>Texto de la mitad izquierda.</p>
      </div>
      <div style={{ width: '50%', padding: '20px' }}>
      {currentUser ? (
        <div className="mt-8">
          <h1>Bienvenido {currentUser.email}</h1>
        </div>
      ) : (
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        )}
      </div>
      </div>
  )
}

export default HomePage