import "./MyCategoriesForm.css"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { categoryOptions } from "../categories";
import { groupedRegionOptions } from "../Regions";
import { BusinessSearch } from "../../userService";
function MyCategoriesForm() {
   const [formData,setFormData]=useState({'searchText':"",'location':"",'category':""})
   const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(formData)
    try{
      const result=await BusinessSearch(formData);
      navigate('/list-business',{state:{item:result}})
    }catch(error){
      console.log(error)
    }
  }
     return ( 
        <div className="form categoryForm" >
            <form className="inputs" onSubmit={handleSubmit}>
  <div className="form-group">
    <input type="text" placeholder="What are you looking for?" name="searchText" onChange={(e)=>{setFormData({...formData,'searchText':e.target.value})}}/>
  </div>
  <div className="form-group">
    <Select className="react-select-container category-select" classNamePrefix='react-select' options={groupedRegionOptions} placeholder='Select location'
    styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
       menuPortalTarget={document.body}
       onChange={(Selected)=>setFormData((prev)=>({...prev,'location':Selected.value}))}
    />
  </div>
  <div className="form-group">
    <Select
      className="react-select-container category-select"
      classNamePrefix="react-select"
      options={categoryOptions}
      placeholder="-- Select Category --"
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
       onChange={(Selected)=>setFormData((prev)=>({...prev,'category':Selected.value}))}
    />
  </div>
  <div className="form-group">
    <button type="submit" className="submit-btn">Search 🔍</button>
  </div>
</form>


        <div className="popular-searchs">
          <h6>Popular Searches</h6>
          <Link to="/">Restaurants</Link>
          <Link to="/">Services</Link>
        </div>
        </div>
     );
}

export default MyCategoriesForm;