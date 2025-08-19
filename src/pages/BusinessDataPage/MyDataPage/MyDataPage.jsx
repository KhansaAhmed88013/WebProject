import React, { useEffect, useState, useRef } from 'react';
import 'react-phone-number-input/style.css';
import './MyDataPage.css';
import moment from 'moment';
import { addreview, AddContactMessage, Addbookmark, getbookmark } from '../../../userService';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaShareAlt, FaStar, FaBookmark } from "react-icons/fa";

function MyDataPage({ Data }) {
const formrev = useRef(null);
  const [stars, setStars] = useState(null);
  const [hoverstar, setHoverstar] = useState(-1);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentday, setcurrentday] = useState();
  const [Open, setOpen] = useState("Close");
  const [reviewForm, setReviewForm] = useState({});
  const [businessContactForm, setBusinessContactForm] = useState({});
  const [currentPage, setCurrentpage] = useState(0);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timing = Data?.hours ? JSON.parse(Data.hours) : {};

  // convert 12hr time string → minutes
  function convertToMinutes(timeStr) {
    if (!timeStr || timeStr === "Closed") return null;
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  // 🔹 Always called, checks bookmark
  useEffect(() => {
    const bookmarkdata = async () => {
      let User;
      try {
        User = JSON.parse(localStorage.getItem('User'));
      } catch (err) {
        console.log(err.message);
      }

      try {
        if (User && Data?.id) {
          const markData = { business_id: Data.id, user_id: User.id };
          const result = await getbookmark(markData);
          setBookmarked(result.message === "marked");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    bookmarkdata();
  }, []);

  // 🔹 Always called, handles open/close status
  useEffect(() => {
    if (!timing) return;

    const checkOpenStatus = () => {
  const now = new Date();
  const day = days[now.getDay()];
  setcurrentday(day);

  const today = timing[day];
  if (
    !today ||
    !today.open || !today.close ||
    today.open.trim() === "" ||
    today.close.trim() === "" ||
    today.open === "Closed" ||
    today.close === "Closed"
  ) {
    setOpen("close");
    return;
  }

  const openMinutes = convertToMinutes(today.open);
  const closeMinutes = convertToMinutes(today.close);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (openMinutes <= currentMinutes && currentMinutes <= closeMinutes) {
    setOpen("open");
  } else {
    setOpen("close");
  }
};

    checkOpenStatus(); // run immediately
    const intervalId = setInterval(checkOpenStatus, 60000);

    return () => clearInterval(intervalId);
  }, [timing]);

  // 🛑 Important: hooks above, early return below (no violation)
  if (!Data) {
    return <p>No item here</p>;
  }

  // ---------------- Business Logic ----------------
  const counting = [1, 2, 3, 4, 5];
  const arrayTags = (Data.tags || "").split(",");

  function handleChange(e) {
    const { value, name } = e.target;
    setReviewForm((Prev) => ({ ...Prev, [name]: value }));
  }

  function handleContactChange(e) {
    const { value, name } = e.target;
    setBusinessContactForm((prev) => ({ ...prev, [name]: value }));
  }

  async function hableContactSubmit(e) {
    e.preventDefault();
    const final = { ...businessContactForm, business_id: Data.id };
    try {
      await AddContactMessage(final);
      alert("Message submitted");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBookmark() {
    const User = JSON.parse(localStorage.getItem('User'));
    if (User) {
      const markData = { business_id: Data.id, user_id: User.id };
      try {
        const result = await Addbookmark(markData);
        setBookmarked(result.message === "marked");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please login first");
      window.location.href = '/login';
    }
  }

// ✅ Reviews Pagination (safe checks added)
const itemperpage = 3;
const reviews = Array.isArray(Data?.review) ? Data.review : [];
const newReviews = reviews.slice(currentPage * itemperpage, (currentPage + 1) * itemperpage);
const noOfPages = reviews.length > 0 ? Math.ceil(reviews.length / itemperpage) : 0;
const pageIndex = Array.from({ length: noOfPages }, (_, index) => index + 1);


  const handlePageChange = (pageNo) => {
    setCurrentpage(pageNo);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const final = { ...reviewForm, rating: stars, business_id: Data.id };
      const result = await addreview(final);
      alert(result);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }
  return (
    <div className="Data-body">
      {/* Business Header */}
      <div className="business-header">
        <img
          className="business-image"
          src={Data.Logo}
          alt={Data.business_name}
        />
        <div className="business-title">
          <h2>{Data.business_name}</h2>
          <span className={`status-tag ${Open === "open" ? "open" : "closed"}`}>
    {Open === "open" ? "Open Now" : "Closed"}
  </span>


        </div>
        <p className="member-since">
            Member since: <strong>{new Date(Data.establishment_year).toLocaleDateString()}</strong>
        </p>
        <p className="tagline">{Data.tagline}</p>
        <div className="rating-row">
          <span className="category">{Data.category}</span>
          <span className="rating">
  {Data.rating ? Data.rating : "0.0"} ⭐ ({Data.review?.length || 0} Ratings)
</span>

          <span className="price-range">Price: {Data.price_range} (Rs {Data.price_from} - Rs {Data.price_to})</span>
        </div>

       <div className="business-actions">
  {Data.youtube && (
    <a className="action-button" href={Data.youtube} target="_blank" rel="noopener noreferrer">
      ▶ Watch Video
    </a>
  )}

  <button className="action-button" onClick={() => formrev.current.scrollIntoView({ behavior: "smooth" })}>
    Add Your Review
  </button>

  <button className="action-button" onClick={handleBookmark} >
    <FaBookmark className="bookmark-icon" />
    {bookmarked ? "Bookmarked" : "Bookmark"}
  </button>
</div>

      </div>

        <div className="row">
            <div className=" col-60">
      {/* Other Sections */}
      <div className="business-description" >
        <h3>Our Services</h3>
      <p className="rich-text" dangerouslySetInnerHTML={{__html:Data.aboutBusiness}}/>

      </div>
      <div className="business-description">
        <h3>Description</h3>
        <p className="rich-text" dangerouslySetInnerHTML={{__html:Data.description}}/>
      </div>

      <div className="business-contact">
        <h3>Contact Information</h3>
        <p><strong>Address:</strong> {Data.location}</p>
        <p><strong>Phone:</strong> {Data.phone}</p>
        <p><strong>Email:</strong> {Data.inquiry_email}</p>
        <p><strong>Website:</strong> <a href={Data.website} >{Data.website}</a></p>
      </div>

      <div className="business-tags">
        <h3>Tags</h3>
        {arrayTags.map((value,key)=>(
            <span className='tag' >{value}</span>
        ))}
      </div>
      {
  Data.anemities && (
    <div className="business-tags-section">
      <h3>Amenities</h3>
      <div className="amenity-tags">
        {Data.anemities.map((value, key) => (
          <span className="amenity-tag" key={key}>{value}</span>
        ))}
      </div>
    </div>
  )
}

            </div>
            <div className=" col-40">
                <p className="location-phone">
        📍 {Data.location} | 📞 {Data.phone}
      </p>

        <div className="business-share" style={{marginBottom:"1rem"}}>
        <h3><FaShareAlt /> Social</h3>
        <div className="social-icons">
          <a href={Data.facebook}  target='blank'><FaFacebook title="Visit our Facebook"/></a>
          <a href={Data.instagram} target='blank'><FaInstagram title="Visit our Instagram"/></a>
           <a href={Data.linkedin} target='blank'><FaLinkedin title="Visit our LinkedIn"/></a>
            <a href={Data.youtube} target='blank'><FaYoutube title="Visit our Youtube"/></a>
        </div>
      </div>
      <div className="contact-business">
        <label >Contact Business</label>
        <form  onSubmit={hableContactSubmit}>
            <input type="text" placeholder='Your name' name='name' onChange={handleContactChange} required/>
            <input type="text" placeholder='subject' name='subject' onChange={handleContactChange}/>
            <input type="email" placeholder='email' name='email' onChange={handleContactChange} required/>
            <input type="number" placeholder='Contact Number' name='Contact_number' onChange={handleContactChange}/>
            <textarea id="" placeholder='Message' name='Message' onChange={handleContactChange} required/>
            <button type='submit'>Send Mesage</button>
        </form>
      </div>

        <div className="nearby-cars">
            <h4>Other Rent A Car nearby</h4>
            <p>Find more {Data.category} near <a href="">{Data.business_name}</a></p>
        </div>
        <div className="claim-business">
            <p>Claim your free business page to have your changes published immediately.</p>
            <a href="">Claim this business</a>
        </div>
            </div>
        </div>

      <div className="business-hours">
        <h3>Opening Hours</h3>
        <table>
            <thead>
                <tr>
                    <td>days</td>
                    <td>open</td>
                    <td>close</td>
                </tr>
            </thead>
            <tbody>
            {
            days.map((value,index)=>(
                <tr key={index} className={currentday===value?"highlight-day":""}>
                    <td>{value}</td>
                    {(timing[value]).open ? <td>{(timing[value]).open}</td>: <td>Closed</td>}
                    {(timing[value]).close ? <td>{(timing[value]).close}</td>: <td>Closed</td>}
                </tr>
            ))
          }
            </tbody>
        </table>
      </div>

{Array.isArray(Data?.review) && Data.review.length > 0 ? (
  <div className="reviews-container">
    <h3>Reviews</h3>
    {Data.review.map((item, index) => (
      <div key={index} className="review-card">
        <div className="review-header">
          <div className="reviewer-info">
            <span className="reviewer-name">{item.name}</span>
            <span className="reviewer-email">{item.email}</span>
          </div>
          <div className="review-meta">
            <span className="review-stars">
              {"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}
            </span>
            <span className="review-date">
              {moment(item.date).format("MMM D, YYYY")}
            </span>
          </div>
        </div>
        <div className="review-comment">
          <p>{item.comment}</p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No reviews yet.</p>
)}

<div>
  <button disabled={currentPage<1} onClick={()=>handlePageChange(currentPage-1)}>&lt;</button>
  {pageIndex.slice(
    Math.max(0,currentPage-2),Math.min(noOfPages,currentPage+3)
  ).map(page=>
  <button key={page} className={page===currentPage+1?"active":""} onClick={()=>handlePageChange(page-1)}>{page}</button>
  )}
  <button disabled={currentPage >=noOfPages-1} onClick={()=>handlePageChange(currentPage+1)}>&gt;</button>
</div>


      {/* Review Section */}
      <div className="business-review-form" ref={formrev}>
          <h3>Rate Plz</h3>
          {counting.map((value,index)=>(
            <FaStar className="star" 
            onMouseEnter={()=>setHoverstar(index)}
            onMouseLeave={()=>{setHoverstar(-1)}}
            value={value} id={value} 
            onClick={()=>{setStars(value)}} 
            style={{color : index <(hoverstar===-1?stars:(hoverstar+1))? 'yellow':"white",paddingBottom:'1rem'}}/>
          ))}
        <h3>Write a Review for {Data.business_name}</h3>
        <form onSubmit={handleSubmit} className='formreview'>
        <input type="text" onChange={handleChange} name='name' placeholder="Your Name" />
        <input type="email" onChange={handleChange} name='email' placeholder="Your Email" required/>
        <textarea placeholder="Write your comment..." name='comment' onChange={handleChange} rows="5" required></textarea>
        
        <button type='submit'>Submit Review</button>
        </form>
       
      </div>
    </div>
  );
}

export default MyDataPage;
