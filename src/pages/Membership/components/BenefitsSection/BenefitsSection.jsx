import React from 'react';
import {
  FaBullhorn,
  FaMoneyBillAlt,
  FaHeartbeat,
  FaChartLine,
  FaTags,
  FaRocket,
} from 'react-icons/fa';
import './BenefitsSection.css';

const benefits = [
  {
    icon: <FaBullhorn className="benefit-icon text-blue" />,
    title: 'Advertise Your Business Locally & Globally',
    content:
      'Optimize your visibility on Google, Yahoo, Bing, and more. Reach customers anytime with WhatsApp and email marketing to boost engagement and drive growth.',
  },
  {
    icon: <FaMoneyBillAlt className="benefit-icon text-green" />,
    title: '100% Money Back Guarantee',
    content:
      'Not satisfied? Get a full refund within the first year—no questions asked. We proudly offer unmatched services with complete peace of mind.',
  },
  {
    icon: <FaHeartbeat className="benefit-icon text-red" />,
    title: 'Emergency Financial Assistance up to Rs. 100,000',
    content:
      'Health emergencies shouldn’t be delayed by finances. We offer support up to Rs. 100,000—available 24/7 for when life surprises you.',
  },
  {
    icon: <FaChartLine className="benefit-icon text-yellow" />,
    title: 'Targeted Marketing to Thousands',
    content:
      'We promote your business to our large daily audience and push custom offers via email and WhatsApp to boost sales and brand reach.',
  },
  {
    icon: <FaTags className="benefit-icon text-pink" />,
    title: 'Exclusive Deals & Discounts',
    content:
      'Save big every day with exclusive discounts from brands across health, beauty, groceries, travel, shopping, and more—just for our members!',
  },
  {
    icon: <FaRocket className="benefit-icon text-purple" />,
    title: 'A Platform for Your Success',
    content:
      'We’re more than a website. We help grow your business, launch new ventures, and support your success every step of the way.',
  },
];

export default function BenefitsSection() {
  return (
    <div>
        <div className="benefits-section">
      <h2 className="section-heading">What Benefits You Can Get!</h2>

      <div className="benefit-grid">
        {benefits.map((item, index) => (
          <div className="benefit-card" key={index}>
            {item.icon}
            <h3 className="benefit-title">{item.title}</h3>
            <p className="benefit-content">{item.content}</p>
          </div>
        ))}
      </div>

      <div className="register-btn-container">
        <button className="register-btn" onClick={()=>{window.location.href='/register'}}>Register Now</button>
      </div>
    </div>
    <div className="join-us-section">
      <h2 className="join-heading">Ready to Join Us?</h2>
      <p className="join-text">
        You can pay easily via <strong>Online Bank Transfer</strong>, <strong>JazzCash</strong>, <strong>EasyPaisa</strong> or whatever is your suitability.
      </p>
      <p className="bank-details">
        You can transfer funds to our official bank account of <strong>Global Listing</strong>.<br /><br />
        <strong>Account Title:</strong> Global Listing<br />
        <strong>Account No:</strong> -------------------------- <br />
        <strong>MCB Bank, Branch Code:</strong> ----
      </p>
      <button className="register-btn" onClick={()=>{window.location.href='/register'}}>Register Now</button>
    </div>
    </div>
  );
}
