import React from "react";
import "./searchBusinessList.css"; // reuse same css for styling
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleMapList from "../../../components/Mapmy/Maplist";

function SearchBusinessList({ business }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ensure business is always an array
  const businessList = Array.isArray(business) ? business : [];

  if (businessList.length === 0) {
    return <p>No business data found.</p>;
  }

  function handleClick(option) {
    dispatch({ type: "change2", payloade: `/${option.business_name}` });
    navigate(`/${option.business_name}`, { state: option });
  }

  return (
    <div className="ListBusinessSection">
      <h2 className="business-heading">
        "Business List"
      </h2>

      <div className="ListBusiness-Row">
        <div className="ListBusiness-Left">
          <div className="ListBusines-Container">
            {businessList.map((option, key) => (
              <div
                className="ListBusines-Card"
                onClick={() => handleClick(option)}
                key={key}
              >
                <div
                  className="Card-img"
                  style={{
                    backgroundImage: `url(${option.Logo})`,
                  }}
                ></div>
                <div className="Card-description">
                  <h4>{option.business_name}</h4>
                  <p>{option.tagline}</p>
                  <div className="card-subdescription">
                    <p>{option.category}</p>
                    <p>{option.review?.length || 0} Rating</p>
                    <div className="rating">
                      {option.rating ? option.rating : "0.0"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ListBusiness-Map">
          <GoogleMapList />
        </div>
      </div>
    </div>
  );
}

export default SearchBusinessList;
