import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import ViewLists from "./Components/view/ViewLists";


function ViewYourListing() {
    return ( 
        <>
        <MyNavBar/>
        <ViewLists/>
        <MyFooter/>
        </>
     );
}

export default ViewYourListing;