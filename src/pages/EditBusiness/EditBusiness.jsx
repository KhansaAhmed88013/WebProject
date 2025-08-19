import { useLocation } from "react-router-dom";
import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import EditForm from "./components/EditFrom";

function EditBusiness() {
    const location=useLocation()
    const {business}=location.state || {}
    return ( 
        <>
        <MyNavBar/>
        <EditForm business={business}/>
        <MyFooter/>
        </>
     );
}

export default EditBusiness;