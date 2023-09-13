'use client'
import React, { useState } from 'react';
import signUp from '../../firebase/signUp';
import { useRouter } from 'next/navigation';
import '../../styles/globals.css'
function Register(props) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [userType, setUserType] = useState('');
const router = useRouter();
const handleRegister = (e) => {
  e.preventDefault();
  const{result, error} = signUp(email, password, userType);
  
  if(error){
    return console.log(error);

  }
  return console.log(result);
};

return (
  <div>
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="normal">Normal User</option>
          <option value="company">Company Admin</option>
        </select>
      </div>
      <button >Sign Up</button>
    </form>
    <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
  </div>
);
};

export default Register;