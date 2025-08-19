import React, { useState,useEffect } from 'react';
import "./RegistrationForm.css";
import MyLogin from "../../../components/MyLogin/MyLogin";
import { addUser } from '../../../userService'; 
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    whatsapp_number: '',
    website: '',
  });
 const navigate=useNavigate()
  const [loggedIn,setLoggedIn]=useState(false)
  useEffect(()=>{
      const loggedUser=JSON.parse(localStorage.getItem('User'))
      if(loggedUser && loggedUser.username){
       setLoggedIn(true);
      }
    },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validations
    if (formData.email !== formData.confirmEmail) {
      alert("Emails don't match");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match");
   return;
    }

    try {
      console.log(formData);
      
      const response = await addUser(formData);
      alert('User registered successfully!');
     
    } catch (error) {
      alert('Registration failed: ' + error.message);
      console.error(error);
    }
  };

  return (
    <>
      {loggedIn ? 
      <div className='login-wrapper'>
        <div className="login-form-container">
          <p className='para'>You are already Registered</p>
          <button onClick={()=>navigate('/')}>Go to Home</button>
        </div>
      </div>
      :
    <div className="register-form">
      <div className="form-container">
        <h2>Registration Form</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-left">
            <div className="form-group">
              <label>Username *</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>User Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Email *</label>
              <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>User Password *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Contact Number *</label>
              <input type="tel" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp Number</label>
              <input type="tel" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
      <div className="login-section">
        <p>Already Registered? <strong>Login</strong></p>
        <MyLogin />
      </div>
    </div>
    }
    </>
  );
};

export default RegistrationForm;
