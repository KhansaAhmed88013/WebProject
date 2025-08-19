import MyFooter from "../../components/MyFooter/MyFooter"
import ListingHeader from "./components/ListingHeader/ListingHeader"
import MyNavBar from "../../components/MyNavBar/MyNavBar"
import AllListing from "./components/AllListing/AllListing"
function ListCategories(){
    return(
        <>
            <MyNavBar/>
            <ListingHeader/>
            <AllListing/>
            <MyFooter/>
        </>
    )
}
export default ListCategories