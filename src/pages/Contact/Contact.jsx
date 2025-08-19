import MyContactForm from "../../components/MyContactForm/MyContactForm";
import MyFooter from "../../components/MyFooter/MyFooter";
import MyNavBar from "../../components/MyNavBar/MyNavBar";
import "./Contact.css"

function Contact() {
    return ( 
        <>
            <MyNavBar/>
            <div className="contact-section" id="contact">
      <div className="container">
        <div className="contact-left">
            <p className="breadcrumb-path">Home / Contact</p>
          <h2 className="contact-heading">Contact Global Listing</h2>
          <p className="contact-description">
            We warmly welcome everyone for feedback, suggestions and visit to our Office for any business inquiry and offers.
          </p>
          <div className="contact-details">
            <p><strong>Address:</strong> 2nd Floor, FIT Computer Institute,<br />
              Al-Mustafa Plaza, near Chandni Chowk,<br />
              C Block, Satellite Town, Rawalpindi - 46000</p>
            <p><strong>Phone:</strong> (92-) 51-8772881-2, (92-) 321-5508811</p>
            <p><strong>Email:</strong> <a href="mailto:info@globallisting.com">info@globallisting.com</a></p>
            <p><strong>Hours:</strong> Mon – Sat: 9:00 – 18:00</p>
          </div>
        </div>
        <div className="contact-right">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10674.760215937038!2d73.06030936242086!3d33.6314290538931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x20cf6919a7b8f77b%3A0x54a713897aa91ca8!2s2nd%20Floor%2C%20FIT%20Computer%20institute%2C%20Al-Mustafa%20Plaza%2C%20near%20Chandni%20Chowk%2C%20C%20Block%20Block%20C%20Satellite%20Town%2C%20Rawalpindi%2C%2046000!5e0!3m2!1sen!2s!4v1721283701724!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <MyContactForm/>
    </div>
            <MyFooter/>
        </>
     );
}

export default Contact;