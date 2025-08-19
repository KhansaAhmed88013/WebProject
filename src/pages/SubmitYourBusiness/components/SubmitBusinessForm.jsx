import React, { use, useState } from "react";
import "./SubmitBusinessForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import { categoryOptions } from "../../../components/categories";
import { addBusiness} from "../../../userService";
import GoogleMapComponent from "../../../components/Mapmy/Mapmy";
import { groupedRegionOptions } from "../../../components/Regions";


const timeOptions = [
  'Closed',
  ...Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const ampm = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minute} ${ampm}`;
  })
];

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
];


function SubmitBusinessForm() {
  const [description, setDescription] = useState("");
  const [aboutBusiness,setAboutBusiness]=useState("")
  const [amenities,setAnemities]=useState({})
  const [formData, setFormData] = useState({});
  const [menuSections, setMenuSections] = useState([
    {
      sectionTitle: "",
      items: [{ title: "", price: "", description: "" }],
    },
  ]);
  const [hours, setHours] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { open: '', close: '' };
      return acc;
    }, {})
  );

  const handleTimeChange = (day, type, value) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };
  const handleSectionTitleChange = (index, value) => {
    const updated = [...menuSections];
    updated[index].sectionTitle = value;
    setMenuSections(updated);
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    const updated = [...menuSections];
    updated[sectionIndex].items[itemIndex][field] = value;
    setMenuSections(updated);
  };

  const addMenuItem = (sectionIndex) => {
    const updated = [...menuSections];
    updated[sectionIndex].items.push({ title: "", price: "", description: "" });
    setMenuSections(updated);
  };

  const removeMenuItem = (sectionIndex) => {
    const updated = [...menuSections];
    if (updated[sectionIndex].items.length > 1) {
      updated[sectionIndex].items.pop();
      setMenuSections(updated);
    }
  };

  const addMenuSection = () => {
    setMenuSections([
      ...menuSections,
      {
        sectionTitle: "",
        items: [{ title: "", price: "", description: "" }],
      },
    ]);
  };

  const removeMenuSection = () => {
    if (menuSections.length > 1) {
      setMenuSections(menuSections.slice(0, -1));
    }
  };

  const handleAnemitiesChange =(e)=>{
    const {value,name}=e.target
    setAnemities((prev)=>({...prev,[name]:value}))
  }

  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox" ? checked :
      type === "file" ?
        (files.length > 1
          ? Array.from(files)
          : files[0]) 
      : value
  }));
};

const handleMapLocation = (loc) => {
  // Save as "lat,lng" string (or object if you want)
  const locationStr = `${loc.lat},${loc.lng}`;
  setFormData((prev) => ({
    ...prev,
    location: locationStr,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addBusiness({...formData,description:description,menuSection:menuSections,aboutBusiness:aboutBusiness,hours:hours,amenities:amenities});
      alert("submitted: " );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="submit-container">
      <h1>Join Pakistan’s Premier Online Business Directory!</h1>
      <p>
        How to add your business?
        <br />
        First <strong>Login</strong> OR <strong>Sign up</strong> to Submit your
        Business for FREE!
      </p>

      <div className="auth-links">
        <h5>Have an account?Login please</h5>
        <button onClick={() => (window.location.href = "/login")}>Login</button>
        <h5>Don't have account?Register yourself first</h5>
        <button onClick={() => (window.location.href = "/register")}>
          Register
        </button>
      </div>
      <p>
        Fill Required information, Select Category and Sub Categories, Contact
        Details & Save!
      </p>

      <form className="business-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Username *</label>
            <input name="username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Your email *</label>
            <input
              name="email"
              placeholder="you@yourdomain.com"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Business Name *</label>
            <input name="business_name" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Tagline *</label>
            <input name="tagline" onChange={handleChange} required />
          </div>
        </div>


        <div className="form-group">
  <label>Business Category *</label>
  <Select
  className="react-select-container"
  classNamePrefix="react-select"
  options={categoryOptions}
  onChange={(selected) =>
    setFormData((prev) => ({
      ...prev,
      category: selected.value
    }))
  }
  placeholder="-- Select Category --"
  menuPortalTarget={document.body}      // ✅ renders the dropdown at top level
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),   // ✅ visible above all
  }}
/>
</div>

            <div className="form-row">
            <div className="form-group">
          <label>Business Region / City *</label>
          <Select
  className="react-select-container"
  classNamePrefix="react-select"
  options={groupedRegionOptions} 
  onChange={(selected) =>
    setFormData((prev) => ({
      ...prev,
      region: selected.value
    }))
  }
  placeholder="-- Select Region / City --"
  isSearchable={true} 
  menuPortalTarget={document.body}
  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
/>
        </div>

        <div className="form-group">
          <label>Price Range *</label>
          <select name="price_range" onChange={handleChange} required>
            <option value="">-- Select Price Range --</option>
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
                <input type="checkbox" name={amenity} onChange={handleAnemitiesChange} />{" "}
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
          {daysOfWeek.map(day => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                <select
                  value={hours[day].open}
                  onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                >
                  {timeOptions.map((time, i) => (
                    <option key={i} value={time}>{time}</option>
                  ))}
                </select>
              </td>
              <td>
                <select 
                  value={hours[day].close}
                  onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                >
                  {timeOptions.map((time, i) => (
                    <option key={i} value={time}>{time}</option>
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
  value={formData.location || ""}
  onChange={handleChange}
/>

          <GoogleMapComponent onLocationSelect={handleMapLocation} />
        </div>

        <div className="form-row">
          <div className="form-group">
          <label>Official Website / URL *</label>
          <input
            name="website"
            type="url"
            placeholder="e.g yourwebsite.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone / Mobile (Select Country Code First) *</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="e.g +92-51-8772881 / +92-300-8511182"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>E-mail (To receive Inquiries) *</label>
          <input
          type="email"
            name="inquiry_email"
            placeholder="e.g youremail@email.com"
            onChange={handleChange}
            required
          />
        </div>
        </div>

        <div className="form-group">
          <label className="section-heading">Menu Prices *</label>

          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="menu-section">
              <div className="form-group">
                <label>Section Title *</label>
                <input
                  value={section.sectionTitle}
                  placeholder="e.g Lunch Menu / Services"
                  onChange={(e) =>
                    handleSectionTitleChange(sectionIndex, e.target.value)
                  }
                  required
                />
              </div>
              <label>Section Items *</label>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="form-row">
                  <div className="form-group">
                    <label className="item-heading">Item Title *</label>
                    <input
                      value={item.title}
                      placeholder="e.g Chicken Biryani"
                      onChange={(e) =>
                        handleItemChange(
                          sectionIndex,
                          itemIndex,
                          "title",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Item Price *</label>
                    <input
                      value={item.price}
                      type="number"
                      placeholder="e.g Rs. 500"
                      onChange={(e) =>
                        handleItemChange(
                          sectionIndex,
                          itemIndex,
                          "price",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Item Description *</label>
                    <input
                      value={item.description}
                      placeholder="e.g Spicy chicken biryani"
                      onChange={(e) =>
                        handleItemChange(
                          sectionIndex,
                          itemIndex,
                          "description",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="form-row" style={{ gap: "1rem" }}>
                <button type="button" onClick={() => addMenuItem(sectionIndex)}>
                  Add New Menu
                </button>
                <button
                  type="button"
                  onClick={() => removeMenuItem(sectionIndex)}
                >
                  Remove Menu
                </button>
              </div>

              <hr style={{ margin: "1.5rem 0", borderColor: "#444" }} />
            </div>
          ))}

          <div className="form-row" style={{ gap: "1rem" }}>
            <button type="button" onClick={addMenuSection}>
              Add New Section
            </button>
            <button type="button" onClick={removeMenuSection}>
              Remove Section
            </button>
          </div>
        </div>

          <h3><label >Media</label></h3>
          <div className="form-group">
          <label>Featured Image / Logo</label>
          <input
            type="file"
            name="Logo"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gallery Images</label>
          <input
            type="file"
            name="gallery"
            multiple
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Video</label>
          <input
            name="video"
            type="url"
            placeholder="A link to video about your company"
            onChange={handleChange}
          />
        </div>

        <h3><label>Social</label></h3>
        <div className="form-row">
          <div className="form-group">
          <label>Facebook URL</label>
          <input
          type="url"
            name="facebook"
            placeholder="https://facebook.com/yourusername"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Instagram URL</label>
          <input
            name="instagram"
            type="url"
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
            type="url"
            placeholder="https://linkedin.com/yourusername"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>YouTube URL</label>
          <input
            name="youtube"
            type="url"
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
                <input type="radio" name="offer" value="yes" onChange={handleChange} />Yes
          </label>
          <label >
                <input type="radio" name="offer" value="No" onChange={handleChange} />No
          </label>
          <label >
                <input type="radio" name="offer" value="Seasonal" onChange={handleChange} />Seasonal
          </label>
          <label >
                <input type="radio" name="offer" value="For Members Only" onChange={handleChange} />For Members Only
          </label>
          </div>
        </div>
          
          <div className="form-group">
            <label>Your relationship with this business? *</label>
            <input name="relation_with_business" onChange={handleChange} placeholder="Ex: I work here, I'm CEO, do marketing for this company."/>
          </div>
          <div className="form-group">
            <label >
                <input type="checkbox" name="remote_Position" value="true" onChange={handleChange} />Remote Position
          </label>
          </div>
          <div className="form-row">
            <div className="form-group">
            <label >Establishment Year</label>
            <input type="date" name="establishment_year"  onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} />
          </div>
          <div className="form-group">
          <label>No of employees</label>
          <select name="no_of_employes" onChange={handleChange} required>
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
            <input type="text" name="tags"  onChange={handleChange} placeholder="e.g. Hospitality, Restaurant, Social Media, Management"/>
          </div>

          <div className="form-group">
            <label >Company Owner/ Focal Person</label>
            <input type="text" name="company_owner" onChange={handleChange} placeholder="Something about Company owner"/>
          </div>

          <div className="form-group">
            <label >Scheduled Date</label>
            <input type="date" name="scheduled_date"  onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} />
          </div>
        <button className="submit-btn" type="submit">
          Submit Business
        </button>
      </form>
    </div>
  );
}

export default SubmitBusinessForm;
