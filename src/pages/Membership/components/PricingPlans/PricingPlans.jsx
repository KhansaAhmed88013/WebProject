import React from 'react';
import './PricingPlans.css';
import { FaCheck } from 'react-icons/fa';

const PricingPlans = () => {
  return (
    <div className="pricing-container">
      <h1 className="pricing-heading">
        100% Risk Free, If you're not satisfied we'll return your full amount
      </h1>
      <h3 className="pricing-subheading">Do you really want to Boast your Business?</h3>

      <div className="pricing-cards">
        {/* Basic */}
        <div className="pricing-card">
          <h2>Basic Package</h2>
          <p className="pricing-tag">Free Forever</p>
          <h1 className="price">₨ 0</h1>
          <p>Yearly</p>
          <ul>
            <li><FaCheck /> 1 business listing</li>
            <li><FaCheck /> Max 3 Pictures</li>
            <li><FaCheck /> Opening & Closing Hours</li>
            <li><FaCheck /> 3 Business Categories</li>
            <li><FaCheck /> Business Address with Location</li>
            <li><FaCheck /> Review, Bookmark & Social Share</li>
            <li><FaCheck /> Brief Introduction of Business</li>
            <li><FaCheck /> Contact/Inquiry Form</li>
          </ul>
          <button className="join-btn">Join Today</button>
          <p>Grow your business today!</p>
        </div>

        {/* Standard */}
        <div className="pricing-card highlighted">
          <h2>Standard Package</h2>
          <p className="pricing-tag">Best for Small Businesses</p>
          <h1 className="price">₨ 7500</h1>
          <p>Yearly</p>
          <ul>
            <li><FaCheck /> Verified business tag</li>
            <li><FaCheck /> 3 business listing</li>
            <li><FaCheck /> Max 10 Pictures</li>
            <li><FaCheck /> Opening & Closing Hours</li>
            <li><FaCheck /> 3 Business Categories</li>
            <li><FaCheck /> Business Address with Location</li>
            <li><FaCheck /> Review, Bookmark & Social Share</li>
            <li><FaCheck /> Brief Introduction of Business</li>
            <li><FaCheck /> Contact/Inquiry Form</li>
            <li><FaCheck /> Featured Image Design</li>
            <li><FaCheck /> Dedicated Helpline & Support</li>
            <li><FaCheck /> Access to Job Portal</li>
            <li><FaCheck /> Social Media Page Setup</li>
            <li><FaCheck /> Extra Income Opportunities</li>
            <li><FaCheck /> Trainings & Events Invitation</li>
            <li><FaCheck /> Startup Guidance</li>
            <li><FaCheck /> Entertainment Discounts</li>
            <li><FaCheck /> Tour Packages</li>
            <li><FaCheck /> WhatsApp Group Access</li>
            <li><FaCheck /> Member-Only Discounts</li>
          </ul>
          <button className="join-btn">Join Today</button>
          <p>Grow your business today!</p>
        </div>

        {/* Premium */}
        <div className="pricing-card">
          <h2>Premium Package</h2>
          <p className="pricing-tag">Best for Small Businesses</p>
          <h1 className="price">₨ 25,000</h1>
          <p>Yearly</p>
          <ul>
            <li><FaCheck /> Everything in Standard Package</li>
            <li><FaCheck /> Verified business tag</li>
            <li><FaCheck /> 5 business listing</li>
            <li><FaCheck /> Max 20 Pictures</li>
            <li><FaCheck /> Marketing Assistance</li>
            <li><FaCheck /> Lead Generation Services</li>
            <li><FaCheck /> Business Profile Management</li>
            <li><FaCheck /> Networking Opportunities</li>
            <li><FaCheck /> SEO Optimization</li>
            <li><FaCheck /> Web Development Discounts</li>
            <li><FaCheck /> Banner Advertisement</li>
            <li><FaCheck /> One Page Website</li>
            <li><FaCheck /> WhatsApp & Email Marketing</li>
            <li><FaCheck /> 4 Social Campaigns (Design, Content, Audience)</li>
            <li><FaCheck /> Google Ads Campaign (Copy, Targeting)</li>
            <li><FaCheck /> Social Media Sharing</li>
          </ul>
          <button className="join-btn">Join Today</button>
          <p>Grow your business today!</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
