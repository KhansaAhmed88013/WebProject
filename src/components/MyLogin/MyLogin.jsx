import React, { useEffect, useState } from 'react';
import './MyLogin.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../userService';

function MyLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedIn,setLoggedIn]=useState(false)
  const navigate=useNavigate()
  
  useEffect(()=>{
    const loggedUser=JSON.parse(localStorage.getItem('User'))
    if(loggedUser && loggedUser.username){
     setLoggedIn(true);
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await loginUser(identifier, password);
      alert(result.user);
      localStorage.setItem('User', JSON.stringify(result.user));
      window.location.href = '/';
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    }
  };
  
  return (
      <>
      {loggedIn ? 
      <div className='login-wrapper'>
        <div className="login-form-container">
          <p className='para'>You are already logged in</p>
          <button onClick={()=>navigate('/')}>Go to Home</button>
        </div>
      </div>
      :
          <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username or Email Address *</label>
          <input
            type="text"
            id="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your username or email"
            required
          />

          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="#" className="lost-password">Lost your password?</Link>
          </div>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
      }
      </>
  );
}

export default MyLogin;
