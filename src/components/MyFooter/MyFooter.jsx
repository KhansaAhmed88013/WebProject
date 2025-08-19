import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import './MyFooter.css'; // We'll create this for styling
import logo from '../../assets/images/logo.png'; // update path if needed
import { Link } from 'react-router-dom';

function MyFooter() {
    return (
        <>
        <footer className="footer bg-dark text-light pt-5 pb-4">
            <div className="container">
                <div className="row">
                    {/* Column 1 */}
                    <div className="col-md-3 mb-4">
                        <img src={logo} alt="Logo" className="footer-logo mb-2" />
                        <p>Office 4 & 5, Mezzanine Floor, USAID Plaza,<br />
                            Jinnah Avenue, Blue Area, Islamabad - Pakistan</p>
                        <p>(92) 51-8772881-2 | 92-321-5508811</p>
                        <p><a href="mailto:info@directorypakistan.com" className="text-light">info@directorypakistan.com</a></p>
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase mb-3">Explore</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/about-us" className='footer-link'>About Us</Link></li>
                            <li><Link to="/" className='footer-link'>Submit your Business</Link></li>
                            <li><Link to="/" className='footer-link'>Pricing</Link></li>
                            <li><Link to="/" className='footer-link'>Blog</Link></li>
                            <li><Link to="/contact" className='footer-link'>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase mb-3">My Account</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className='footer-link'>User Dashboard</Link></li>
                            <li><Link to="/" className='footer-link'>My Account</Link></li>
                            <li><Link to="/" className='footer-link'>My Listings</Link></li>
                            <li><Link to="/" className='footer-link'>Favorite</Link></li>
                            <li><Link to="/" className='footer-link'>Cart</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase mb-3">Follow Us</h5>
                        <div className="d-flex gap-3">
                            <Link to="/" className='social-icon'><FaFacebookF /></Link>
                            <Link to="/" className='social-icon'><FaInstagram /></Link>
                            <Link to="/" className='social-icon'><FaLinkedinIn /></Link>
                            <Link to="/" className='social-icon'><FaTwitter /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div className="footer-bottom-bar text-center text-light py-3">
    © 2025 Global Listing. All rights reserved.
  </div>
  </>
    );
}

export default MyFooter;
