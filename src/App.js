import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ScrollToTop from './components/ScrollToTop';
import Membership from './pages/Membership/Membership';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import SubmitYourBusiness from './pages/SubmitYourBusiness/SubmitYourBusiness';
import ListCategories from './pages/ListCategories/ListCategories';
import ListBusiness from './pages/ListBusiness/ListBusiness';
import BusinessDataPage from './pages/BusinessDataPage/BusinessDataPage';
import ListSearchBusiness from './pages/ListSearchBusiness/ListSearchBusiness';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import ViewYourListing from './pages/ViewYourListing/ViewYourListing';
import EditBusiness from './pages/EditBusiness/EditBusiness';
import Favorite from './pages/Favorite/Favorite';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Practice from './pages/Practice';
import AllListing from './pages/AllListing/AllListing';
function StackApp() {
  let state=useSelector(a=>a)
  return ( 
        <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about-us" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/membership" element={<Membership />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/submit-your-business" element={<SubmitYourBusiness />}/>
        <Route path="/list-categories" element={<ListCategories />}/>
        <Route path={state.route} element={<ListBusiness />}/>
        <Route path={state.element2} element={<BusinessDataPage />}/> 
        <Route path='/ViewYourListing' element={<ViewYourListing/>}/>
        <Route path='/ViewLists/EditBusiness' element={<EditBusiness/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/list-business' element={<ListSearchBusiness/>}/>
        <Route path='/all-Listing' element={<AllListing/>}/>
      </Routes>
    </BrowserRouter>
   );
}


function App() {
  return (
      <Provider store={store}>
   <StackApp/>
    </Provider>
  );
}

export default App;
