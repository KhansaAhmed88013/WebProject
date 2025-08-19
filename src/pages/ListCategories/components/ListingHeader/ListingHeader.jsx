import MyCategoriesForm from "../../../../components/MyCategoriesForm/MyCategoriesForm"
import './ListingHeader.css'

function ListingHeader() {
    return (
        <div className="ListingHeader">
            <div className="listing-header-top">
                <h2 className="heading">List Categories</h2>
                <p className="breadcrumb">Home &gt; <span> List Categories </span></p>
            </div>
            <div className="categoryform">
                <MyCategoriesForm/>
            </div>
        </div>
    );
}

export default ListingHeader;
