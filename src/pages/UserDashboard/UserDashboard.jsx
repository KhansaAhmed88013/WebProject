import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import ChangePassword from "./Component/ChangePassword/ChangePassword";
import UserForm from "./Component/UserForm/UserForm";
import './UserDashboard.css'
import { useState,useEffect } from "react";

function UserDashboard() {
    const [user,setUser]=useState(null)
    
      useEffect(()=>{
        const usercheck=localStorage.getItem('User')
        if(usercheck){
        const User = JSON.parse(usercheck);
        setUser(User.id)
        }
      },[])
    return ( 
    <div className="userdashboard">
        <MyNavBar/>
        <UserForm userid={user}/>
        <ChangePassword userid={user}/>
        <MyFooter/>
    </div> );
}

export default UserDashboard;