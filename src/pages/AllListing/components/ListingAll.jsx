import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import GoogleMapList from "../../../components/Mapmy/Maplist";
import { getAllBusiness } from "../../../userService";

function ListingAll() {
    const [business,setBusiness]=useState([])
    let dis=useDispatch()
    let state=useSelector(a=>a)
    const navigate=useNavigate()
    useEffect(()=>
    {
      async function fetchbusiness(){
        try{
        const result=await getAllBusiness();
        setBusiness(result)
      }catch(err){
        console.log(err)
      }
      }
      fetchbusiness();
    },[])
  if (!business || business.length === 0) {
    return <p>No business data found.</p>;
  }
    function handleClick(option){
        dis({type:"change2",payloade:`/${option.business_name}`})
        navigate(`/${option.business_name}`,{state:option})
    }
    return ( <>
            <div className="ListBusinessSection">
  <h2 className="business-heading">"Business List"</h2>


  <div className="ListBusiness-Row">
    {/* Left: Business Cards */}
    <div className="ListBusiness-Left">
      {business && business.length > 0 ? (
        <div className="ListBusines-Container">
          {business.map((option, key) => (
            <div
              className="ListBusines-Card"
              onClick={() => handleClick(option)}
              key={key}
            >
              <div
                className="Card-img"
                style={{
                  backgroundImage: `url(${option.Logo})`,
                }}
              ></div>
              {console.log(option.Logo)}
              <div className="Card-description">
                <h4>{option.business_name}</h4>
                <p>{option.tagline}</p>
                <div className="card-subdescription">
                  <p>{option.category}</p>
                  <p>{option.review.length} Rating</p>
                  <div className="rating">{option.rating ? option.rating : '0.0'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No list here</p>
      )}
    </div>

    {/* Right: Google Map */}
    <div className="ListBusiness-Map">
      <GoogleMapList />
    </div>
  </div>
</div>
    </> );
}

export default ListingAll;
