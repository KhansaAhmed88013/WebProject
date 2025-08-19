import { getUserBusinessList } from "../../../../userService";
import { useEffect, useState } from "react";
import "./ViewLists.css";
import { useNavigate } from "react-router-dom";

function ViewLists() {
  const [data, setData] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    async function getData() {
      try {
        const usercheck = localStorage.getItem("User");
        if (usercheck) {
          const User = JSON.parse(usercheck);
          const result = await getUserBusinessList(User.id);
          setData(result);
          console.log(result)
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  if (!data) return <p className="no-data">No data here</p>;

  return (
    <div className="viewlists-container">
      {data.map((value, index) => (
        <div key={index} className="business-card">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={value.Logo}
              alt={value.business_name}
              className="business-logo"
            />
            <div>
              <h5 style={{paddingTop:"1rem"}}>Gallery Images</h5>
              {value.gallery.map((img,index)=>(
                <img src={img} alt={`Gallery ${index}`} key={index} className="business-logo"/>
              ))}
            </div>
          </div>
          <div className="business-details">
            <h2>{value.business_name}</h2>
            <p><strong>Tagline:</strong> {value.tagline}</p>
            <p><strong>Owner:</strong> {value.company_owner}</p>
            <p><strong>Username:</strong> {value.username}</p>
            <p><strong>Category:</strong> {value.category}</p>
            <p><strong>Email:</strong> {value.email}</p>
            <p><strong>Inquiry Email:</strong> {value.inquiry_email}</p>
            <p><strong>Phone:</strong> {value.phone}</p>
            <p><strong>Region:</strong> {value.region}</p>
            <p><strong>Location:</strong> {value.location}</p>
            <p><strong>Price Range:</strong> {value.price_range} ({value.price_from} - {value.price_to})</p>
            <p><strong>Offer:</strong> {value.offer}</p>
            <p><strong>No. of Employees:</strong> {value.no_of_employes}</p>
            <p><strong>Established:</strong> {value.establishment_year}</p>
            <p><strong>Relation with Business:</strong> {value.relation_with_business}</p>
            <p><strong>Remote Position:</strong> {value.remote_Position ? "Yes" : "No"}</p>
            <p><strong>Scheduled Date:</strong> {value.scheduled_date}</p>
            <p><strong>Tags:</strong> {value.tags}</p>
            <p><strong>About Business:</strong> <span dangerouslySetInnerHTML={{ __html: value.aboutBusiness }} /></p>
            <p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: value.description }} /></p>
            <p><strong>Video:</strong> <a href={value.video} target="_blank" rel="noreferrer">{value.video}</a></p>
            <p><strong>Website:</strong> <a href={value.website} target="_blank" rel="noreferrer">{value.website}</a></p>
            <p><strong>Facebook:</strong> <a href={value.facebook} target="_blank" rel="noreferrer">{value.facebook}</a></p>
            <p><strong>Instagram:</strong> <a href={value.instagram} target="_blank" rel="noreferrer">{value.instagram}</a></p>
            <p><strong>LinkedIn:</strong> <a href={value.linkedin} target="_blank" rel="noreferrer">{value.linkedin}</a></p>
            <p><strong>YouTube:</strong> <a href={value.youtube} target="_blank" rel="noreferrer">{value.youtube}</a></p>
            <h6><strong>Hours</strong></h6>
            <p>{Object.entries(JSON.parse(value.hours)).map(([day,time])=>(
              <div key={day}>
                <p><strong>{day}</strong> : {time.open} - {time.close}</p>
              </div>
            ))}</p>
            <p><strong>Amenities: </strong></p>
            <div className="amenities-list">
              {value.amenities?.map((item, i) => (
                <span key={i} className="amenity-badge">{item}</span>
              ))}
            </div>

            <div className="sections-container">
              <strong>Sections</strong>
              {value.section?.map((sectionvalue, secIndex) => (
                <div key={secIndex} className="section-card">
                  <h4>{sectionvalue.section_title}</h4>
                  {sectionvalue.Items?.map((entity, entityIndex) => (
                    <div key={entityIndex} className="section-item">
                        <h6>Item</h6>
                      <p><strong>Title: </strong>{entity.title}</p>
                      <p><strong>Description: </strong>{entity.description}</p>
                      <p className="price">Price: {entity.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="business-actions">
              <button className="edit-btn" onClick={() =>  navigate('/ViewLists/EditBusiness',{state:{business:value}})}>Edit</button>
              <button className="delete-btn" onClick={() => console.log("Delete", value.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewLists;
