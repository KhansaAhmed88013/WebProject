import React from "react";
import {
  FaBriefcase, FaHeartbeat, FaBook, FaUtensils, FaLaptopCode,
  FaStore, FaShoppingBag, FaBuilding, FaPaintBrush, FaHandsHelping,
  FaTruck, FaDumbbell, FaUmbrellaBeach, FaLeaf, FaBullhorn,
  FaIndustry, FaQuestion, FaArrowRight
} from "react-icons/fa";
import "./MyCategories.css";
import { categoryOptions } from "../../../../components/categories";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



// Icon mapping
const iconMap = {
  // Accommodation
  "Hotels": <FaBuilding />,

  // Food & Beverages
  "Restaurants": <FaUtensils />,

  // Buyers
  "Car Buyers": <FaShoppingBag />,

  // Marketing
  "Advertising": <FaBullhorn />,

  // Agriculture
  "Poultry Farms": <FaLeaf />,

  // Healthcare
  "Hospitals": <FaHeartbeat />,

  // Education
  "Schools": <FaBook />,

  // Technology
  "Software Houses": <FaLaptopCode />,

  // Services
  "Plumbing Services": <FaHandsHelping />,

  // Shopping & Malls
  "Supermarkets": <FaShoppingBag />,

  // Health and Medical
  "Pharmacies": <FaHeartbeat />,

  // Real Estate
  "Real Estate Agents": <FaBuilding />,

  // Arts & Entertainment
  "Event Planners": <FaPaintBrush />,

  // Digital Media & IT
  "Digital Studios": <FaLaptopCode />,

  // Transport & Logistics
  "Taxi Services": <FaTruck />,

  // Beauty & Fitness
  "Gyms": <FaDumbbell />,

  // Tourism & Hospitality
  "Tour Agencies": <FaUmbrellaBeach />,

  // Businesses & Trades
  "Import Export": <FaBriefcase />,

  // Others
  "Others": <FaQuestion />
};

function MyCategories() {
  const allGroups = [...new Set(categoryOptions.map(item => item.value))];

// keep only those that you mapped
const topGroups = allGroups.filter(item => iconMap[item]);
 // only first 14
  const nav=useNavigate()
  const dispatch = useDispatch();
    const state = useSelector(a => a);
    function handleClick(item) {
        if (!item) return;
            dispatch({ type: "changeyou", payloade: `/${item}` });
             nav(`/${item}`, { state: item });
    }

  return (
    <div className="categories">
      <h1 className="cat-heading">Featured Categories</h1>
      <p className="cat-subtext">What do you need to find?</p>

      <div className="cat-cards">
        {topGroups.map((group, index) => (
  <div
    className="cat-card"
    key={index}
    onClick={() => handleClick(group)}   // ✅ now group is correct
  >
    <div className="cat-icon">{iconMap[group] || <FaQuestion />}</div>
    <h5 className="cat-label">{group}</h5>
  </div>
))}

      </div>

      <div className="cat-button-wrapper">
        <button className="cat-btn" onClick={()=>nav('/list-categories')}>
          View All Categories <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default MyCategories;
