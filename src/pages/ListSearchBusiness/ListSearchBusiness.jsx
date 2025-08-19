import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBusinessList from "./components/SearchBusinessList";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import MyFooter from "../../components/MyFooter/MyFooter";
import MyCategoriesForm from "../../components/MyCategoriesForm/MyCategoriesForm";
import { BusinessSearch } from "../../userService";  // import your API

function ListSearchBusiness() {
  const location = useLocation();
const item = location.state?.item || [];   // grab the array only

return (
  <>
    <MyNavBar/>
    <div style={{ paddingTop: '120px' ,backgroundColor:'#1e1e1e',paddingBottom:'20px'}}>
      <MyCategoriesForm/>
    </div>
    <SearchBusinessList business={item}/>   {/* now item is always the array */}
    <MyFooter/>
  </>
);
}

export default ListSearchBusiness;
