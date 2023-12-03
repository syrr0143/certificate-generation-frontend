import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseurl from './config'


export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [employeeIdError, setEmployeeIdError] = useState('');
  const [signuperror, setsignuperror] = useState('');
  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate('/Signup');
  };
  const handleLogin = async () => {
    setPasswordError('');
    setEmployeeIdError('');
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
    try {
      const response = await fetch(`${baseurl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id: employeeId, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        const { token } = data;

        // Add the "Bearer " prefix when storing the token
        localStorage.setItem('token', `${token}`);

        console.log('Login successful:', data);

        // Redirect to the '/Data' page
        navigate('/Data');
      } else {
        setSignupSuccess(false);
        if (data.error === 'Invalid credentials') {
          setsignuperror('Invalid credentials.Please enter a valid one');
        } else {
          // Handle other signup errors
          console.error('Signup failed:', data.error);
        }
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };



  return (
    <div className='login-background' >
      <div class="wrap-login" >
        <div class="card-body" >
          <p class="loginformtitle" ><h3><strong>Sign In</strong></h3></p>
          <div class="wrapinput" >
            <input id='inputbox' type="text" class="form-control" placeholder="Enter your employee id" aria-label="Username" aria-describedby="basic-addon1" value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)} />
          </div>
          {employeeIdError && <div className="error-message">{employeeIdError}</div>}
          <div class="wrapinput">
            <input id='inputbox' type="password" class="form-control" placeholder="Password" aria-label="Recipient's username" aria-describedby="basic-addon2" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
          <div className='signinbutton'>
            <button id='signinbutton' onClick={handleLogin}>Sign in</button>
          </div>
          {signuperror && <div className="error-message">{signuperror}</div>}
          <div className='textbelowbutton'>
            <span className='txt1'>Don't have an account ?</span>
          </div>
          {/* <div className='signinoption'>
                        <img id='googlegap' src={google} alt="" />
                        <img src={fb} alt="" />
                    </div> */}
          <div className='signinbutton'>
            <button id='signinbutton' onClick={navigateToSignup}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}
