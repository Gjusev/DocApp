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
    <div className="flex items-center justify-center h-screen bg-slate-800">
    <div className="w-full max-w-md p-8 rounded bg-slate-600">
      <h2 className="mb-6 text-3xl font-bold text-white underline">Register</h2>
      <form onSubmit={handleRegister} className="space-x-1 space-y-4">
        <div  className="space-x-1 ">
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
        <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="availableCheckbox"
          checked={isCompanyEmailAvailable}
          onChange={() => setIsCompanyEmailAvailable(!isCompanyEmailAvailable)}
          className="w-6 h-6 p-1 border border-gray-600 rounded"
        />
        <label htmlFor="availableCheckbox" className="text-white">Company Email available</label>
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sameCompanyCheckbox"
                checked={!sameCompany}
                onChange={() => setSameCompany(!sameCompany)}
                className="w-6 h-6 p-1 border border-gray-600 rounded"
              />
              <label htmlFor="sameCompanyCheckbox" className="text-white">Same Company Email as User Email</label>
            </div>
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
                className='text-white bg-slate-800 hover:underline'
                onChange={(e) => setPhotoFile(e.target.files[0])}
                required
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
      <button
        className="justify-center block mt-4 underline"
        onClick={() => props.onFormSwitch('login')}
      >
        Already have an account? Login here.
      </button>
    </div>
    </div>
  );
}

export default Register;
