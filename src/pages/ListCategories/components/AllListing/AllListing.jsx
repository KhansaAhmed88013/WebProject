import React, { useState } from "react";
import './AllListing.css'
import { categoryOptions } from "../../../../components/categories";
import { GetBusinesses,getbusinessno } from "../../../../userService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllListing() {
    const dispatch = useDispatch();
    const state = useSelector(a => a);
    const navigate = useNavigate();

    const [listingCounts,setListingCounts]=useState({})

    const filtercat = [...new Set(categoryOptions.map(value => value.group))];

    

    function handleClick(item) {
        if (!item) return;
            dispatch({ type: "changeyou", payloade: `/${item}` });
             navigate(`/${item}`, { state: item });
    }

    async function handleListingno(category) {
        try{
            if (listingCounts[category] !== undefined) return;
            const result = await getbusinessno(category);
            setListingCounts(prev => ({ ...prev, [category]: result }));
        }catch(error){
            console.log("error in fetching business")
        }
    }


    return (
        <div className="listing-section">
            {
                filtercat.map((groupName, index) => (
                    <div className="group-section" key={index}>
                        
                        <h2 className="listing-section-heading">{groupName}</h2>
                        <div className="listing-cards">
                            {
                                categoryOptions
                                    .filter(item => item.group === groupName)
                                    .map((obj, key) => (
                                        <div
                                            onClick={() => handleClick(obj.value)}
                                            key={key}
                                            className="listing-card"
                                        >
                                            <h3 className="card-title">{obj.label}</h3>
                                             <p
                                        className="card-hover-text"
                                        onMouseEnter={() => handleListingno(obj.label)}
                                    >
                                        {listingCounts[obj.label] ?? 0} Listing
                                    </p>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default AllListing;
