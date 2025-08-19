import { useEffect, useState } from 'react';
import './UserForm.css';
import { getUser, updateUser } from '../../../../userService';

function UserForm() {
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch user data
  useEffect(() => {
    const getData = async () => {
      try {
        const userCheck = localStorage.getItem('User');
        if (userCheck) {
          const user = JSON.parse(userCheck);
          const result = await getUser(user.id);
          setFormData(result);
          if (result.profile_photo) setImg(result.profile_photo); // show current photo
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  console.log(formData)
  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file)); // preview
      setFormData((prev) => ({ ...prev, profile_photo: file }));
    }
  };

  // Handle text, select, radio, textarea changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting formData:", formData);
      const result = await updateUser(formData);
      console.log("Update result:", result);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="formContainer userprofileform">
      <form onSubmit={handleSubmit}>
        <h2>Profile Detail</h2>

        {/* Profile photo */}
        <div>
          <label className='avatar'>Change Avatar</label>
          <div className='avatarfile'>
            <input type="file" accept='image/*' onChange={handleFileChange} />
            {img && <img src={img} className="profile-photo" alt="Profile Preview" />}
          </div>
        </div>

        {/* First & Last Name */}
        <div className='row'>
          <div>
            <label>First Name</label>
            <input type="text" name='first_name' value={formData.first_name || ""} onChange={handleFormChange} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name='last_name' value={formData.last_name || ""} onChange={handleFormChange} required />
          </div>
        </div>

        {/* Username & Email */}
        <div className='row'>
          <div>
            <label>Nick Name / Username</label>
            <input type="text" name='username' value={formData.username || ""} onChange={handleFormChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name='email' value={formData.email || ""} onChange={handleFormChange} required />
          </div>
        </div>

        {/* Contact & Address */}
        <div className='row'>
          <div>
            <label>Contact No</label>
            <input type="tel" name='contact_number' value={formData.contact_number || ""} onChange={handleFormChange} required />
          </div>
          <div>
            <label>Address</label>
            <input type="text" name='address' value={formData.address || ""} onChange={handleFormChange} />
          </div>
        </div>

        {/* Website & Birthday */}
        <div className='row'>
          <div>
            <label>Website</label>
            <input type="url" name='website' value={formData.website || ""} onChange={handleFormChange} required />
          </div>
          <div>
            <label>Birthday</label>
            <input type="date" name='birthday' value={formData.birthday || ""} onChange={handleFormChange} />
          </div>
        </div>

        {/* Marital Status & Gender */}
        <div className='row'>
          <div>
            <label>Marital Status</label>
            <select name='marital_status' value={formData.marital_status || ""} onChange={handleFormChange}>
              <option value="">Select...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Engaged">Engaged</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow">Widow</option>
              <option value="Widower">Widower</option>
            </select>
          </div>
          <div>
            <label>Gender</label>
            <div className='radio'>
              {['Male', 'Female', 'Other'].map((g) => (
                <div key={g}>
                  <input type="radio" name='gender' value={g} onChange={handleFormChange} checked={formData.gender === g} />
                  <label>{g}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className='row'>
          {['facebook', 'twitter', 'pinterest', 'google', 'linkedin', 'instagram'].map((social) => (
            <div key={social}>
              <label>{social.charAt(0).toUpperCase() + social.slice(1)}</label>
              <input type="url" name={social} value={formData[social] || ""} onChange={handleFormChange} />
            </div>
          ))}
        </div>

        {/* About */}
        <div className="form-group">
          <label>About</label>
          <textarea name="about" value={formData.about || ""} onChange={handleFormChange} placeholder="Write something about yourself..." />
        </div>

        <button type='submit'>Change Profile</button>
      </form>
    </div>
  );
}

export default UserForm;
