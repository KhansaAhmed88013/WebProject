import { useEffect, useState } from "react";
import { getUserBookmark ,Addbookmark} from "../../../userService";
import "./FavoriteBusiness.css";
import {FaTrashAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function FavoriteBusiness() {
  const [data, setData] = useState(null);
    const [user,setUser]=useState(null)


  const navigate=useNavigate()
  let dis=useDispatch()
  let state=useSelector(a=>a)

  useEffect(() => {
    let User = null;
    const usercheck = localStorage.getItem("User");
    if (usercheck) {
      User = JSON.parse(usercheck);
      const bookmark = async (id) => {
        const result = await getUserBookmark(id);
        setData(result);
      };
      bookmark(User.id);
      setUser(User.id)
    }
  }, []);
  const handleitem=(item)=>{
    dis({type:"change2",payloade:`/${item.business_name}`})
        navigate(`/${item.business_name}`,{state:item})
  }
    async function handleBookmark(business_id){
      if(user){
        const markData={business_id,user_id:user}
        try{
          const result=await Addbookmark(markData);
          if(result.message!=="marked")
          {
            alert("deleted")
          }
          window.location.reload();
        }catch(error){
          alert(error.message)
        }
      }
    }

  return (
    <div className="favorite-container">
      <div className="container">
        <h3 className="title">My Favorite</h3>
      {data && data.length > 0? (
        <div className="card-list">
          {data?.map((item, index) => (
            <div className="card" key={index} >
              <img src={item.Logo} alt="Logo" className="card-img" onClick={()=>handleitem(item)}/>
              <div className="card-info">
                <h5 onClick={()=>handleitem(item)}>{item.business_name}</h5>
                <p onClick={()=>handleitem(item)}>{item.tagline }</p>
                <button onClick={()=>handleBookmark(item.id)}><FaTrashAlt/> Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>You have not bookmarked any Business</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default FavoriteBusiness;
