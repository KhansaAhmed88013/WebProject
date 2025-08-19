import { useState } from "react";
import { useLocation } from "react-router-dom";
import './EditForm.css'
import Select from 'react-select'
import { categoryOptions } from "../../../components/categories";
import ReactQuill from "react-quill";
import GoogleMapComponent from "../../../components/Mapmy/Mapmy";
function EditForm() {
  const location=useLocation()
  const {business}=location.state

  const [data,setData]=useState({...business})
  const [aboutBusiness,setAboutBusiness]=useState(business.aboutBusiness)
  const [description,setDescription]=useState(business.description)
  const [amenities,setamenities]=useState(
    Array.isArray(business.amenities)?business.amenities:[]
  )
  const [hours,sethours]=useState(business.hours? JSON.parse(business.hours):{})
  const [menuSections,setMenuSections]=useState(
    business.section?.map((sec)=>({  
        section_title:sec.section_title || "",
        Items: sec.Items?.map((item)=>({
          title: item.title|| "",
          price: item.price|| "",
          description: item.description|| "",
        })) || []
    })) || [ { sectionTitle: "", items: [{ title: "", price: "", description: "" }] }]
  )


  const timeOptions = [
    "Closed",
    ...Array.from({ length: 48 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const ampm = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${displayHour}:${minute} ${ampm}`;
    }),
  ];

  const daysofweek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  function handleChange(e){
    const {value,name,type,checked,files}=e.target
    if (type === "file") {
  if (name === "gallery") {
    setData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...Array.from(files)]
    }));
  } else {
    setData((prev) => ({
      ...prev,
      [name]: files[0]
    }));
  }
} else {
  // existing code for checkbox/other inputs
  setData((prev)=>({...prev,[name]:
      type==="checkbox"?checked:value
    }))
}

  }

  const handleMapLocation = (loc) => {
  // Save as "lat,lng" string (or object if you want)
  const locationStr = `${loc.lat},${loc.lng}`;
  setData((prev) => ({
    ...prev,
    location: locationStr,
  }));
};

function handleTitleChange(value,index){
  const dummyMenuSection=[...menuSections]
  dummyMenuSection[index].section_title=value
  setMenuSections(dummyMenuSection)
}
  function handleItemChange(value,attribute,Secindex,itemIndex){
    const dummy=[...menuSections]
    dummy[Secindex].Items[itemIndex][attribute]=value
    setMenuSections(dummy)
  }

  function addMenuItem(index){
    const dummy=[...menuSections]
    dummy[index].Items.push({title:"",description:"",price:""})
    setMenuSections(dummy)
  }
  function removeMenuItem(index){
    const dummy=[...menuSections]
    if(dummy[index].Items.length>1){
      dummy[index].Items.pop();
      setMenuSections(dummy)
    }
  }
  function addMenuSection(){
    const dummy=[...menuSections]
    dummy.push({ sectionTitle: "", Items: [{ title: "", price: "", description: "" }] })
    setMenuSections(dummy)
  }
  function removeMenuSection(){
    const dummy=[...menuSections]
    if(dummy.length>1){
      dummy.pop()
      setMenuSections(dummy)
    }
  }

  function handlegalleryImg(index){
    const demo=data.gallery.filter((value,i)=>i!==index)
    setData({...data,gallery:demo})
  }
  function handleSubmit(e){
    e.preventDefault();
    const newdata={...data,aboutBusiness,hours,description,amenities,section:menuSections}
    console.log(newdata)
  }

  function handleHoursChange(day,openOclose,value){
    sethours(prev=>({...prev,[day]:{...prev[day],[openOclose]:value}}))
  }
  function handleAmenityChange(e){
    const {name,checked}=e.target
    setamenities((prev)=> checked? [...prev,name]:prev.filter((a)=>a!==name))
  }
  return ( 
    <div className="editformContainer">
    <form onSubmit={handleSubmit} className="editfrom">
      <div className="form-row">
          <div className="form-group">
            <label>Business Name *</label>
            <input name="business_name" value={data.business_name} required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Your email *</label>
            <input
              name="email"
              value={data.email}
              placeholder="you@yourdomain.com"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Tagline *</label>
            <input name="tagline" onChange={handleChange} value={data.tagline} required />
          </div>
          <div className="form-group">
            <label >Business Category *</label>
        <Select
          classNamePrefix="react-select"
          options={categoryOptions}
          value={categoryOptions.find(
            (opt) => opt.value === data.category
          )}
          onChange={(selected) =>
            setData((prev) => ({ ...prev, category: selected.value }))
          }
        />
          </div>
        </div>
          <div className="form-row">
                  <div className="form-group">
          <label>Business Region / City *</label>
          <select name="region" required onChange={handleChange} value={data.region || ""}>
            <option>Pakistan</option>
            <option>Azad Jammu and Kashmir</option>
            <option>Balochistan</option>
            <option>Gilgit Baltistan</option>
            <option>Islamabad Capital Territory</option>
            <option>Khyber Pakhtunkhwa</option>
            <option>Punjab</option>
            <option>Sindh</option>
            <option>International</option>
          </select>
        </div>


        <div className="form-group">
          <label>Price Range *</label>
          <select name="price_range" onChange={handleChange} value={data.price_range} required>
            <option>Affordable</option>
            <option>Normal</option>
            <option>Low</option>
            <option>Cheap</option>
            <option>Expensive</option>
            <option>Very Expensive</option>
          </select>
        </div>
          </div>
          <div className="form-row">
          <div className="form-group">
          <label>Price From *</label>
          <input
          type="number"
            name="price_from"
            value={data.price_from}
            placeholder="e.g. Rs. 1000"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price To *</label>
          <input
          type="number"
            name="price_to"
            value={data.price_to}
            placeholder="e.g. Rs. 5000"
            onChange={handleChange}
            required
          />
        </div>
        </div>
          <div className="form-group">
                    <label>Amenities</label>
                    <div className="amenities">
                      {[
                        "Parking",
                        "Reservations",
                        "Smoking Allowed",
                        "Wheelchair Accesible",
                        "Wireless Internet",
                        "ATM Nearby",
                        "Elevator",
                        "Near Markets",
                        "Near Hospital",
                        "Public Transport Available",
                        "Near Mosque",
                        "Breakfast",
                        "Accepts Credit Cards",
                        "Discount Coupons",
                        "Outdoor Seating",
                      ].map((amenity) => (
                        <label key={amenity}>
                          <input
                type="checkbox"
                name={amenity}
                checked={amenities.includes(amenity)}
                onChange={handleAmenityChange}
              />{" "}
                          {amenity}
                        </label>
                      ))}
                    </div>
                  </div>
          
                  <div className="form-group qui">
                    <label className="section-heading">Description *</label>
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      className="dark-quill"
                    />
                  </div>
          
                      <h4><label >Hours of Operation</label></h4>
        <div className="business-hours-container">
      <table className="business-hours-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
            {daysofweek.map((day)=>(
              <tr key={day}>
                <td>{day}</td>
                <td>
                  <select value={hours[day].open || ""} onChange={(e)=>handleHoursChange(day,"open",e.target.value)}>
                     {timeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                  </select>
                </td>
                <td>
                  <select value={hours[day].close || ""} onChange={(e)=>handleHoursChange(day,"close",e.target.value)}>
                     {timeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
          </div>
        <div className="form-group">
          <label>Location (Click Icon in right for Auto Location) *</label>
          <input
  name="location"
  required
  placeholder="e.g Blue Area, Islamabad Pakistan"
  value={data.location || ""}
  onChange={handleChange}
/>

          <GoogleMapComponent onLocationSelect={handleMapLocation} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
          <label>Official Website / URL *</label>
          <input
            name="website"
            placeholder="e.g yourwebsite.com"
            value={data.website || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone / Mobile (Select Country Code First) *</label>
          <input
            name="phone"
            required
            value={data.phone || ""}
            placeholder="e.g +92-51-8772881 / +92-300-8511182"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>E-mail (To receive Inquiries) *</label>
          <input
            name="inquiry_email"
            value={data.inquiry_email || ""}
            placeholder="e.g youremail@email.com"
            onChange={handleChange}
            required
          />
        </div>

            <div >
              {menuSections?.map((sec,secindex)=>(
                <div key={secindex} className="menu-section">
                  <h3>Section</h3>
                  <input
                  value={sec.section_title || ""}
                  placeholder="Section title"
                  onChange={(e)=>handleTitleChange(e.target.value,secindex)}/>
                  <h6>Item</h6>
                  {sec.Items.map((it,itindex)=>(
                    <div key={itindex} className="menu-item">
                      <input
                    value={it.title || ""}
                    onChange={(e)=>handleItemChange(e.target.value,"title",secindex,itindex)}
                    placeholder="Item title"
                  />
                <input
                  value={it.price || ""}
                  type="number"
                  onChange={(e)=>handleItemChange(e.target.value,"price",secindex,itindex)}
                  placeholder="Item price"
                />
                <input
                  value={it.description || ""}
                  placeholder="Item description"
                  onChange={(e)=>handleItemChange(e.target.value,"description",secindex,itindex)}
                />
                    </div>
                  ))}
                   <button
  type="button"
  className="action-btn add"
  onClick={() => addMenuItem(secindex)}
>
  Add New Menu 
</button>

<button
  type="button"
  className="action-btn remove"
  onClick={() => removeMenuItem(secindex)}
>
  Remove Menu
</button>
            
                </div>
              ))}
              <button
  type="button"
  className="action-btn add"
  onClick={addMenuSection}
>
  Add New Section
</button>

<button
  type="button"
  className="action-btn remove"
  onClick={removeMenuSection}
>
  Remove Section
</button>
            </div>
        </div>
             <div className="form-group">
                      <label>Video</label>
                      <input
                        name="video"
                        value={data.video || ""}
                        placeholder="A link to video about your company"
                        onChange={handleChange}
                      />
                    </div>
            
                    <h3><label>Social</label></h3>
                    <div className="form-row">
                      <div className="form-group">
                      <label>Facebook URL</label>
                      <input
                        value={data.facebook || ""}
                        name="facebook"
                        placeholder="https://facebook.com/yourusername"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Instagram URL</label>
                      <input
                        name="instagram"
                        value={data.instagram || ""}
                        placeholder="https://instagram.com/yourusername"
                        onChange={handleChange}
                      />
                    </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                      <label>LinkedIn</label>
                      <input
                        name="linkedin"
                        value={data.linkedin || ""}
                        placeholder="https://linkedin.com/yourusername"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>YouTube URL</label>
                      <input
                        name="youtube"
                        value={data.youtube || ""}
                        placeholder="https://youtube.com/yourusername"
                        onChange={handleChange}
                      />
                    </div>
                    </div>
                    <div className="form-group qui">
                      <label className="section-heading">What is unique about the business?</label>
                      <ReactQuill
                        theme="snow"
                        value={aboutBusiness}
                        onChange={setAboutBusiness}
                        required
                        className="dark-quill"
                      />
                    </div>
                    <div className="form-group">
                      <label>Would you like to offer any discount or deals to our Directory customers?</label>
                      <div className="discount-radio">
                        <label >
                            <input type="radio" name="offer" checked={data.offer==="yes"} value="yes" onChange={handleChange} />Yes
                      </label>
                      <label >
                            <input type="radio" name="offer" checked={data.offer==="No"} value="No" onChange={handleChange} />No
                      </label>
                      <label >
                            <input type="radio" name="offer" checked={data.offer==="Seasonal"} value="Seasonal" onChange={handleChange} />Seasonal
                      </label>
                      <label >
                            <input type="radio" name="offer" checked={data.offer==="For Members Only"} value="For Members Only" onChange={handleChange} />For Members Only
                      </label>
                      </div>
                    </div>
                      
                      <div className="form-group">
                        <label>Your relationship with this business? *</label>
                        <input name="relation_with_business" value={data.relation_with_business} onChange={handleChange} placeholder="Ex: I work here, I'm CEO, do marketing for this company."/>
                      </div>
                      <div className="form-group">
                        <label >
                            <input type="checkbox" name="remote_Position" checked={data.remote_Position} value="true" onChange={handleChange} />Remote Position
                      </label>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                        <label >Establishment Year</label>
                        <input type="date" name="establishment_year" value={data.establishment_year} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} />
                      </div>
                      <div className="form-group">
                      <label>No of employees</label>
                      <select name="no_of_employes" value={data.no_of_employes} onChange={handleChange} required>
                        <option>None</option>
                        <option>1-5</option>
                        <option>6-10</option>
                        <option>11-15</option>
                        <option>16-20</option>
                        <option>21-25</option>
                        <option>26-50</option>
                        <option>51-100</option>
                        <option>More than 100</option>
                        <option>More than 200</option>
                        <option>More than 500</option>
                        <option>More than 1000</option>
                      </select>
                    </div>
                      </div>
            
                      <div className="form-group">
                        <label >Tags</label>
                        <input type="text" name="tags" value={data.tags} onChange={handleChange} placeholder="e.g. Hospitality, Restaurant, Social Media, Management"/>
                      </div>
            
                      <div className="form-group">
                        <label >Company Owner/ Focal Person</label>
                        <input type="text" name="company_owner" value={data.company_owner} onChange={handleChange} placeholder="Something about Company owner"/>
                      </div>
            
                      <div className="form-group">
                        <label >Scheduled Date</label>
                        <input type="date" name="scheduled_date" value={data.scheduled_date} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} />
                      </div>

                     <div>
                       <h4>Logo</h4>
                      <input type="file" name="Logo" id="" onChange={handleChange} />
                      <div>
                        <img src={data.Logo} alt="logo" />
                      <button type="button" onClick={()=>setData({...data,Logo:""})}>Remove Logo</button>
                      </div>
                     </div>
                     <div>
                      <h4>Gallery</h4>
                      <input type="file" name="gallery" multiple onChange={handleChange}/>
                      {(data.gallery).map((file,index)=>(
                        <div key={index}>
                          <img src={typeof file === "string" ? file : URL.createObjectURL(file)} alt='GalleryImg' />
                          <button onClick={()=>handlegalleryImg(index)}>Remove</button>
                        </div>
                      ))}
                     </div>
                      
          
      <button type="submit" className="update-btn">
   Update Business
</button>
    </form>

    </div>
   );
}

export default EditForm;