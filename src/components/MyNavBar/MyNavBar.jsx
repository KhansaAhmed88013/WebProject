import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './MyNavBar.css';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function MyNavBar() {
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEmergencySubmenu, setShowEmergencySubmenu] = useState(false);
  const [showFoodSubmenu, setShowFoodSubmenu] = useState(false);
  const [user,setUser]=useState(null)
    const dispatch = useDispatch();
    const state = useSelector(a => a);
    const navigate = useNavigate();


  useEffect(()=>{
    const usercheck=localStorage.getItem('User')
    if(usercheck){
    const User = JSON.parse(usercheck);
    setUser(User.username)
    }
  },[])
    

    function handleClick(item) {
        if (!item) return;
            dispatch({ type: "changeyou", payloade: `/${item}` });
             navigate(`/${item}`, { state: item });
    }


  function logoutfunction() {
    localStorage.removeItem('User');
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top" className="my-navbar">
      <Container>
        <Navbar.Brand href="/">
          <img src="logo.png" className="imglogo" alt="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/membership">Membership</Nav.Link>

            <div
              className="hover-wrapper"
              onMouseEnter={() => setShowExploreMenu(true)}
              onMouseLeave={() => {
                setShowExploreMenu(false);
                setShowEmergencySubmenu(false);
                setShowFoodSubmenu(false);
              }}
            >
              <NavDropdown title="Explore" id="explore-dropdown" show={showExploreMenu}>
                <NavDropdown.Item href="/about-us">About Global Listing</NavDropdown.Item>

                <div
                  className="submenu-wrapper"
                  onMouseEnter={() => setShowEmergencySubmenu(true)}
                  onMouseLeave={() => setShowEmergencySubmenu(false)}
                >
                  <NavDropdown.Item as="span" className="dropdown-item-with-arrow">Emergency ▸</NavDropdown.Item>
                  {showEmergencySubmenu && (
                    <div className="submenu">
                      <NavDropdown.Item onClick={()=>handleClick("Hospitals")}>Hospitals</NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>handleClick("Health Care Center")}>Health Care Center</NavDropdown.Item>
                    </div>
                  )}
                </div>

                <div
                  className="submenu-wrapper"
                  onMouseEnter={() => setShowFoodSubmenu(true)}
                  onMouseLeave={() => setShowFoodSubmenu(false)}
                >
                  <NavDropdown.Item as="span" className="dropdown-item-with-arrow">Food & Restaurants ▸</NavDropdown.Item>
                  {showFoodSubmenu && (
                    <div className="submenu">
                      <NavDropdown.Item onClick={()=>handleClick("Restaurants")}>Restaurants</NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>handleClick("Cafe")}>Cafe</NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>handleClick("Fast Food")}>Fast Food</NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>handleClick("Food Street")}>Food Street</NavDropdown.Item>
                    </div>
                  )}
                </div>

                <NavDropdown.Item href="/membership">Services</NavDropdown.Item>
                <NavDropdown.Item href="/all-Listing">All Listings</NavDropdown.Item>
                <NavDropdown.Item href="/list-categories">List Categories</NavDropdown.Item>
              </NavDropdown>
            </div>

            <Nav.Link href="/register">Registration</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center ms-auto mt-2 mt-lg-0">
            <Button variant="warning" className="ms-2" href='/submit-your-business'>+ Add Listing</Button>

            <div
              className="hover-wrapper ms-3"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              {user ? (
                <div className="logged-in-user d-flex align-items-center gap-2">
                  <div>
                  <button className="btn btn-dark dropdown-toggle"><strong>👤 {user}</strong></button>
                  {showUserMenu && (
                    <div className="dropdown-menu show custom-user-menu ">
                      <a className='dropdown-item' href="/user-dashboard">User Dashboard</a>
                      <a className="dropdown-item" href="/ViewYourListing">Your Listing</a>
                      <a className="dropdown-item" href="/favorite">Favorites</a>
                      <button onClick={logoutfunction} className="btn btn-outline-dark ms-2">logout</button>
                    </div>
                  )}
                </div>
                  
                </div>
              ) : (
                <div>
                  <button className="btn btn-dark dropdown-toggle">👤</button>
                  {showUserMenu && (
                    <div className="dropdown-menu show custom-user-menu">
                      <a className="dropdown-item" href="/login">Login</a>
                      <a className="dropdown-item" href="/register">Register</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
