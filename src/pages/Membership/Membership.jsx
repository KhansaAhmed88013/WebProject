import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import MyMembershipMain from "./components/MyMembershipMain.jsx/MyMembershipMain";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import BenefitsSection from "./components/BenefitsSection/BenefitsSection";

function Membership() {
    return ( 
        <>
        <MyNavBar/>
        <MyMembershipMain/>
        <PricingPlans/>
        <BenefitsSection/>
        <MyFooter/>
        </>
     );
}

export default Membership;