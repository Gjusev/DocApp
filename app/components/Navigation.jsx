"use client"
import {useContext}from 'react'
import Link from "next/link"
import styles from './Navigation.module.css'
import{AuthContext} from '../context/AuthContext'
import { auth } from '../../firebase/firebase'; 
const links = [{
  label:'Home',
  route:'/'
},{
  label:'About',
  route:'/about'
}]

export function Navigation(){

  const  currentUser  = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
          {currentUser && (
            <li>
              <button onClick={() => auth.signOut()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}