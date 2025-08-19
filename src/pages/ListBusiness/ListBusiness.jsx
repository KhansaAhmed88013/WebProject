import React from "react";
import { useLocation } from "react-router-dom";
import ListBusinessCards from "./components/ListBusinessCards/ListBusinessCards";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import MyFooter from "../../components/MyFooter/MyFooter";
import MyCategoriesForm from "../../components/MyCategoriesForm/MyCategoriesForm";
function ListBusiness() {
  const location = useLocation();
  const item = location.state;



  return (
    <>
        <MyNavBar/>
        <div style={{ paddingTop: '120px' ,backgroundColor:'#1e1e1e',paddingBottom:'20px'}}>
            <MyCategoriesForm/>
        </div>
        <ListBusinessCards business={item}/>
        <MyFooter/>
    </>
  );
}

export default ListBusiness;
