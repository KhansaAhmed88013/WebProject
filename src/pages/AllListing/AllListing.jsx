import MyNavBar from "../../components/MyNavBar/MyNavBar";
import MyFooter from "../../components/MyFooter/MyFooter";
import MyCategoriesForm from "../../components/MyCategoriesForm/MyCategoriesForm";
import ListingAll from "./components/ListingAll";
function AllListing() {
    return ( 
        <>
             <MyNavBar/>
        <div style={{ paddingTop: '120px' ,backgroundColor:'#1e1e1e',paddingBottom:'20px'}}>
            <MyCategoriesForm/>
        </div>
        <ListingAll/>
        <MyFooter/>
        </>
     );
}

export default AllListing;
