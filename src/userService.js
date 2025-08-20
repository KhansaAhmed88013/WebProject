// userService.js
import axios from 'axios';

const API_BASE_URL = "https://webproject-backend-production.up.railway.app";

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/adduser`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // or response if you want full response object
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//login
export const loginUser = async (identifier, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, { identifier, password });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
export const changePassword =async (data)=>{
  try{
    const res=await axios.put(`${API_BASE_URL}/changePassword`,data,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    return res.data
  }catch(err){
    throw err.response? err.response.data :err
  }
}
export const getUser=async(Userid)=>{
  try{
    const res=await axios.get(`${API_BASE_URL}/getProfile?Userid=${Userid}`)
    return res.data
  }catch(err){
    throw err.response? err.message.data :err;
  }
}
const convertData = (data) => {
  const formData = new FormData();
  formData.append('id', data.id);
  formData.append('about', data.about );
  formData.append('address', data.address);
  formData.append('birthday', data.birthday );
  formData.append('contact_number', data.contact_number );
  formData.append('created_at', data.created_at );
  formData.append('updated_at', data.updated_at );
  formData.append('email', data.email );
  formData.append('facebook', data.facebook );
  formData.append('first_name', data.first_name );
  formData.append('last_name', data.last_name );
  formData.append('username', data.username );
  formData.append('website', data.website );
  formData.append('gender', data.gender );
  formData.append('marital_status', data.marital_status );
  formData.append('google', data.google );
  formData.append('instagram', data.instagram );
  formData.append('linkedin', data.linkedin );
  formData.append('pinterest', data.pinterest );
  formData.append('twitter', data.twitter );

  if(data.profile_photo instanceof File){
    formData.append('profile_photo',data.profile_photo)
  }

  return formData;
};

export const updateUser=async(data)=>{
  const newFormData=convertData(data)
  try{
    const res = await axios.put(`${API_BASE_URL}/updateProfile`, newFormData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
    return res.data
  }catch(err){
    throw err.message?err.message.data:err
  }
}
export const BusinessSearch = async (data) => {
  try {
    console.log("Sending search data:", data);

    const res = await axios.get(`${API_BASE_URL}/businessSearch`, {
      params: {
        searchText: data.searchText,
        location: data.location,
        category: data.category,
      },
    });

    console.log("Response:", res.data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

const convertToFormData = (data) => {
  const formData = new FormData();

  // Basic fields
  formData.append('business_name', data.business_name);
  formData.append('company_owner', data.company_owner);
  formData.append('description', data.description);
  formData.append('email', data.email);
  formData.append('inquiry_email', data.inquiry_email);
  formData.append('phone', data.phone);
  formData.append('facebook', data.facebook);
  formData.append('instagram', data.instagram);
  formData.append('linkedin', data.linkedin);
  formData.append('youtube', data.youtube);
  formData.append('website', data.website);
  formData.append('establishment_year', data.establishment_year);
  formData.append('tagline', data.tagline);
  formData.append('tags', data.tags);
  formData.append('category',data.category)
  formData.append('region', data.region);
  formData.append('location', data.location);
  formData.append('relation_with_business', data.relation_with_business);
  formData.append('remote_Position', data.remote_Position ? 'true' : 'false');
  formData.append('scheduled_date', data.scheduled_date);
  formData.append('aboutBusiness', data.aboutBusiness);
  formData.append('video', data.video);
  formData.append('offer', data.offer);
  formData.append('price_from', data.price_from);
  formData.append('price_to', data.price_to);
  formData.append('price_range', data.price_range);
  formData.append('no_of_employes', data.no_of_employes);
  formData.append('username', data.username);

  // Logo
  if (data.Logo) {
    formData.append('Logo', data.Logo);
  }

  // Gallery
  if (Array.isArray(data.gallery)) {
    data.gallery.forEach((file) => {
      formData.append('gallery', file);
    });
  }

  // Amenities
  if (data.amenities) {
    Object.keys(data.amenities).forEach(key => {
      if (data.amenities[key] === "on") {
        formData.append('amenities[]', key);
      }
    });
  }

  // Hours
  if (data.hours) {
    Object.entries(data.hours).forEach(([day, times]) => {
      formData.append(`hours[${day}][open]`, times.open);
      formData.append(`hours[${day}][close]`, times.close);
    });
  }

  // Menu Sections
  if (Array.isArray(data.menuSection)) {
    data.menuSection.forEach((section, sectionIndex) => {
      formData.append(`menuSection[${sectionIndex}][sectionTitle]`, section.sectionTitle);
      section.items.forEach((item, itemIndex) => {
        formData.append(`menuSection[${sectionIndex}][items][${itemIndex}][title]`, item.title);
        formData.append(`menuSection[${sectionIndex}][items][${itemIndex}][price]`, item.price);
        formData.append(`menuSection[${sectionIndex}][items][${itemIndex}][description]`, item.description);
      });
    });
  }

  return formData;
};

export const addBusiness = async (businessData) => {
  const formData = convertToFormData(businessData);
  try {
    const res = await axios.post(`${API_BASE_URL}/submitBusiness`, formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const AddContact=async (contactData)=>{
  try{
    const res=await axios.post(`${API_BASE_URL}/contactform`,contactData,{
      headers:{
        'Content-Type': 'application/json'
      }
    })

    return res.data
  }catch(error){
    console.error("❌ Error submitting contact form:", error);
    throw error.response?.data ||error.message
  }
}
export const GetBusinesses = async (businessCategory) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/business?category=${businessCategory}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getAllBusiness=async()=>{
  try {
    const res = await axios.get(`${API_BASE_URL}/Allbusiness`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
export const getbusinessno=async (businessCategory)=>{
  try{
    const res=await axios.get(`${API_BASE_URL}/businessno?category=${businessCategory}`)
    return res.data
  }catch(error){
    throw error.response?.data || error.message;
  }
}

export const addreview=async(reviewData)=>{
  console.log(reviewData)
  try{
    const res=await axios.post(`${API_BASE_URL}/review`,reviewData,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}
export const AddContactMessage=async(ContactMessage)=>{
  try{
      const res=await axios.post(`${API_BASE_URL}/contactBusiness`,ContactMessage,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}
export const Addbookmark=async(bookmarkData)=>{
  try{
    console.log(bookmarkData)
    const res=await axios.post(`${API_BASE_URL}/bookmark`,bookmarkData,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    console.log(res)
    return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}
export const getbookmark=async(bookmarkData)=>{
  try{
    const res=await axios.get(`${API_BASE_URL}/getBookmark?bid=${bookmarkData.business_id}&uid=${bookmarkData.user_id}`)
    console.log(res)
    return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}

export const getUserBookmark=async(userId)=>{
  try{
    const res=await axios.get(`${API_BASE_URL}/getUserBookmark?userId=${userId}`)
    return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}

export const getUserBusinessList=async(user_id)=>{
  try{
    const res=await axios.get(`${API_BASE_URL}/getUserListing?user_id=${user_id}`)
    return res.data
  }catch(error){
    throw error.response?.data||error.message
  }
}
