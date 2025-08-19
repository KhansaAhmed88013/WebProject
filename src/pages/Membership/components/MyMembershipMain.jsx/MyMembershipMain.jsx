import MyContactForm from "../../../../components/MyContactForm/MyContactForm";
import { FaCheckCircle } from 'react-icons/fa';
import "./MyMembershipMain.css"

function MyMembershipMain() {
    return ( 
        <>
           <div className="membership-main">
  <div className="membership-left">
    <h2 className="membership-heading">
      Grow Your Business with Pakistan's fast growing Online Business Directory
    </h2>
    <p className="membership-price">
      Just <span className="membership-highlight">Rs. 7500/yearly</span>
    </p>
    <p className="membership-description">
      Millions of people are searching businesses, products and services you're offering...
    </p>

    <ul className="membership-list">
      <li><FaCheckCircle /> 100% Money Back Guarantee</li>
      <li><FaCheckCircle /> PKR 100,000 Emergency Support Fund</li>
      <li><FaCheckCircle /> SEO optimized listings</li>
      <li><FaCheckCircle /> Discounts, Deals & Offers</li>
      <li><FaCheckCircle /> Marketing & Advertising your business</li>
      <li><FaCheckCircle /> Business Startup Ideas & feasibility study</li>
    </ul>

    <button className="membership-button">
      List your Business today for Free
    </button>
  </div>

  <div className="membership-right">
    <h4>Get a call from our expert to speak more about the benefits & services we are offering !</h4>
    <MyContactForm />
  </div>
</div>
        </>
     );
}

export default MyMembershipMain;