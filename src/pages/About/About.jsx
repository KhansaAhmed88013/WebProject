import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import "./About.css"

function About() {
    return ( 
        <>
        <MyNavBar/>
        <div className="about-directory text-light py-5 px-3 offset-fixed-navbar">
            <div className="container">
                <p className="breadcrumb-path">Home / About Us</p>
                <h2 className="about-heading">About Global Listing</h2>
                
                <p className="about-text">
                    Global Listing is a project of The FIT institute. The main purpose of the project is to online the small and large businesses so people can access their basic information easily and businesses can get benefit from the online world.
                </p>
                <p className="about-text">
                    Millions of people all over the world search different queries online, they want to do business, they are looking for potential opportunities, there are millions of customers searching their desired products and services on daily basis but unfortunately very few businesses are online today.
                </p>
                <p className="about-text">
                    There are many reasons but the most is we did not accept digital technologies & most of us think it is useless, the companies providing IT services are not familiar with the proper use of internet and digital technologies.
                </p>
                <p className="about-text">
                    We at The FIT are trying to promote online culture by offering a variety of services at very economical pricing with tons of features and benefits.
                </p>
            </div>
        </div>
        <MyFooter/>
        </>
     );
}

export default About;