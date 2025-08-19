import { Form } from "react-bootstrap";
import './ChangePassword.css'
import { useState } from "react";
import { changePassword } from "../../../../userService";

function ChangePassword({userid}) {
    const [FormData,setFormData]=useState({})
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...FormData,[name]:value})
        setError("");
    }

    const HandleSubmit=async(e)=>{
        e.preventDefault();
        if(FormData.newPassword!== FormData.newPassword2){
            setError("Passwords do not match.")
            return
        }
        if(userid){
        const data={oldPassword:FormData.oldPassword,newPassword:FormData.newPassword,userid}
        try{
            const result=await changePassword(data)
        alert(result.message)
        }catch(err){
            alert(err.message)
        }
    }
    }

    return ( 
        <div className="formcontainer">
            <Form className="change-password-form" onSubmit={HandleSubmit}>
            <h4>Change Password</h4>

            <div className="form-group">
                <label>Old Password</label>
                <input type="password" name="oldPassword" required onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label>New Password</label>
                <input type="password" name="newPassword" minLength={6} required onChange={handleChange}/>
            </div>

            <div className="form-group">
                <label>Retype Password</label>
                <input type="password" name="newPassword2" minLength={6} required onChange={handleChange}/>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="submit-btn">Update Password</button>
        </Form>

        </div>     );
}

export default ChangePassword;
