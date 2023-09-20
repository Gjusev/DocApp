import React, { useState,useEffect } from 'react';
import signUp from '../../firebase/signUp';
import uploadPhoto from '../../firebase/uploadFoto'; // Import the uploadPhoto function
import '../../styles/globals.css';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("normal");
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [companyName, setCompanyName] = useState('');

  const [sameCompany, setSameCompany] = useState(true);
  const [isCompanyEmailAvailable, setIsCompanyEmailAvailable] = useState(false); // New state for company email availability
  


  const handleRegister = async (e) => {
    e.preventDefault();
    let photoURL = null;
    
    let updatedCompanyEmail = companyEmail;


    if (userType === 'company') {
      
      // Check if a photo file is selected
      if (photoFile) {
        photoURL = await uploadPhoto(photoFile);
        console.log('Uploaded photo URL:', photoURL);
      }
      if (!companyEmail) {
        updatedCompanyEmail = email;
        setCompanyEmail(email); // Update the state for immediate UI feedback
      }
    }
    console.log("companyEmail is now 1: ", companyEmail)
    const { result, error } =  await signUp(
      email, password, userType,companyName, companyAddress, updatedCompanyEmail, companyPhone,isCompanyEmailAvailable,photoURL);
  
    console.log("companyEmail is now 2: ", companyEmail)  
    if (error) {
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
        {userType === 'normal' && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={isCompanyEmailAvailable}
              onChange={() => setIsCompanyEmailAvailable(!isCompanyEmailAvailable)}
            />
            Company Email available
          </label>
        </div>)}
        
        {isCompanyEmailAvailable && (
          <div>
            <label htmlFor="linkedCompanyEmail">Linked Company Email:</label>
            <input
              type="email"
              id="linkedCompanyEmail"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
              required
            />
          </div>
        )}
        {userType === 'company' && (
          <>
          <label>
            <input
              type="checkbox"
              checked={!sameCompany}
              onChange={() => setSameCompany(!sameCompany)}
            />
            Same Company Email as User Email
          </label>
          {sameCompany && (<div>
              <label htmlFor="companyEmail">Company Email:</label>
              <input
                type="email"
                id="companyEmail"
                value={companyEmail}
                
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
            </div>)}
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="companyAddress">Company Address:</label>
              <input
                type="text"
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="companyPhone">Company Phone:</label>
              <input
                type="tel"
                id="companyPhone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="photo">Upload Photo:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                required
              />
            </div>
          </>
        )}
        <button>Sign Up</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  );
}

export default Register;
