import Button from 'react-bootstrap/Button';
import img1 from '../../../../assets/images/img1.jpg';
import './MyJoinUs.css';

function MyJoinUs() {
    return ( 
        <div className="join-us-wrapper">
            <div className="background" style={{ backgroundImage: `url(${img1})` }}>
                <div className="overlay">
                    <div className="join-us container text-center text-light">
                        <h2>Join the fastest growing free online business directory & be a part of a vibrant community</h2>
                        <p>
                            Global Listing is premium Online business directory of Pakistan that promises results, our comprehensive database of Global business listings promotes your services and your brand and get you ranking on search engine results pages.
                         </p>
                         <p>   Directory Pakistan is not just an online business directory but also a fast-growing community to share their concerns, resources, issues and can help each other to solve our daily life problems.
                        </p>
                        <h5>Let’s join to promote & grow your business, to find valuable information & businesses around you.</h5>
                        <Button variant="outline-light" onClick={()=>window.location.href='/membership'}>Join Us For Free Today!</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyJoinUs;
