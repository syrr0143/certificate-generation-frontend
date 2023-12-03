import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseurl from './config'

export default function Signup() {
 
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [dob, setdob] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [employeeIdError, setEmployeeIdError] = useState('');
    const [dobError, setDobError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');


   const navigate = useNavigate();
   const navigateToSignin = () => {
    navigate('/');
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSignup = async () => {
    setNameError('');
    setPasswordError('');
    setEmployeeIdError('');
    setDobError('');
    setEmailError('');
    setPhoneError('');
    setAddressError('');

    if (!name) {
        setNameError('Name is required');
        return;
      }
    if (!password) {
        setPasswordError('Password is required');
        return;
      }
      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        return;
      }
    if (!employeeId) {
        setEmployeeIdError('EmployeeId is required');
        return;
      }
    if (!dob) {
        setDobError('Date of birth is required');
        return;
      }
    if (!email) {
        setEmailError('Email is required');
        return;
      }
      if (!validateEmail(email)) {
        setEmailError('Enter a valid email address');
        return;
      }
    if (!phone) {
        setPhoneError('Phone number is required');
        return;
      }
    if (!address) {
        setAddressError('Address is required');
        return;
      }

    try {
      const response = await fetch(`${baseurl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          employee_id: employeeId,
          dob,
          email,
          mobileNumber: phone,
          address,
        }),
      });
      const data = await response.json(); 
      if (response.ok) {
        // Signup successful, you might want to redirect or show a success message
        setSignupSuccess(true);
        console.log('Signup successful');
        setname('');
      setPassword('');
      setEmployeeId('');
      setdob('');
      setemail('');
      setphone('');
      setaddress('');
      } else {
        setSignupSuccess(false);
        if (data.error === 'Username already exists') {
            setEmployeeIdError('Username already exists. Please choose a different one.');
          } else {
            // Handle other signup errors
            console.error('Signup failed:', data.error);
          }
        // Handle signup failure, show an error message to the user
        console.error('Signup failed');
      }
    } catch (error) {
        setSignupSuccess(false);

      console.error('Error during signup:', error.message);
    }
  };
    
    return (
        <div className='login-background' >
            <div class="wrap-login" >
                <div class="card-body" >
                    <p class="loginformtitle" ><h3><strong>Sign Up</strong></h3></p>
                    <div class="wrapinput" >
                        <input id='inputbox' type="text" class="form-control" placeholder="Enter your Full Name"
                         value={name}
                         onChange={(e) => setname(e.target.value)}aria-label="Username" aria-describedby="basic-addon1"  />
                    </div>
                    {nameError && <div  className="error-message">{nameError}</div>}
          
                    <div class="wrapinput">
                        <input id='inputbox' type="password" class="form-control" placeholder="Password" aria-label="Recipient's username" 
                         value={password}
                         minLength={8}
                         onChange={(e) => setPassword(e.target.value)}aria-describedby="basic-addon2"
                             />
                    </div>
                    {passwordError && <div className="error-message">{passwordError}</div>}
                    <div class="wrapinput" >
                        <input id='inputbox' type="text" class="form-control" placeholder="Enter your employee id" 
                         value={employeeId}
                         onChange={(e) => setEmployeeId(e.target.value)}aria-label="Username" aria-describedby="basic-addon1"  />
                    </div>
                    {employeeIdError && <div className="error-message">{employeeIdError}</div>}
                    <div class="wrapinput">
                        <input id='inputbox' type="Date" class="form-control" placeholder="Date Of Birth"
                         value={dob}
                         onChange={(e) => setdob(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"
                             />
                    </div>
                    {dobError && <div className="error-message">{dobError}</div>}
                    <div class="wrapinput" >
                        <input id='inputbox' type="email" class="form-control" placeholder="Email Id" 
                         value={email}
                         autoComplete='on'
                         onChange={(e) => setemail(e.target.value)}aria-label="Username" aria-describedby="basic-addon1"  />
                    </div>
                    {emailError && <div className="error-message">{emailError}</div>}
                    <div class="wrapinput">
                        <input id='inputbox' type="number" class="form-control" placeholder="Mobile Number"
                         value={phone}
                         onChange={(e) => setphone(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"
                             />
                    </div>
                    {phoneError && <div className="error-message">{phoneError}</div>}
                    <div class="wrapinput" >
                        <input id='inputbox' type="text" class="form-control" placeholder="Address" 
                         value={address}
                         onChange={(e) => setaddress(e.target.value)}aria-label="Username" aria-describedby="basic-addon1"  />
                    </div>
                    {addressError && <div className="error-message">{addressError}</div>}
                   
                    <div className='signinbutton'>
                        <button onClick={handleSignup} id='signinbutton'>Sign Up</button>
                    </div>
                    {signupSuccess && (
            <div  style={{fontWeight:"bold",color:"green",textAlign:"center"}} className=' success-message '>
              Signup successful! You can now Sign In.
            </div>
          )}
                    <div className='textbelowbutton'>
                        <span className='txt1'>Already have an account ?</span>
                    </div>
                    
                     <div className='signinbutton'>
                        <button id='signinbutton' onClick={navigateToSignin} >Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
