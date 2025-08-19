import { useLocation } from "react-router-dom"
import MyDataPage from "./MyDataPage/MyDataPage";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import MyFooter from "../../components/MyFooter/MyFooter";
function BusinessDataPage(){
    const location =useLocation()
    const result=location.state;
    return(
        <>
            <MyNavBar/>
            <MyDataPage Data={result} />
            <MyFooter/>
        </>
    )
}
export default BusinessDataPage