import { useState } from "react";
import { AddContact } from "../../userService";
import "./MyContactForm.css"
function MyContactForm() {
  const [contactData,setContactData]=useState({})
  function handleChange(e){
    const {name,value}=e.target
    setContactData((prev)=>({...prev,[name]:value}))
  }
  function handleSubmit(e){
    console.log(contactData)
    const result=AddContact(contactData);
    alert(result)
    e.preventDefault();
  }
    return ( 
        <div className="contact-form-container">
      <h2 className="contact-form-heading">Send Us a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" name="name" onChange={handleChange} required />
        <input type="email" placeholder="Email Address" name="email" onChange={handleChange} required />
        <input type="text" placeholder="Mobile Number" name="number" onChange={handleChange} required />
        <input type="text" placeholder="Business Name" name="business_name" onChange={handleChange} />
        <textarea rows="5" placeholder="Your Message" name="message" onChange={handleChange} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
     );
}

export default MyContactForm;