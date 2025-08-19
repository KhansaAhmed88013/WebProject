import { useDispatch, useSelector } from 'react-redux';
import MyCategoriesForm from '../../../../components/MyCategoriesForm/MyCategoriesForm';
import './MyHero.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyHero() {
    const nav=useNavigate()

  return (
    <div
      className="Hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/hero.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="HeroOverlay"></div>
      <Container className="HeroContent">
        <h2>Discover your favourite business & places !</h2>
        <p>Let's uncover the best places to eat, drink, and shop nearest to you.</p>

        <button onClick={()=>{nav('/membership')
        }} className="add-btn">🤝 Add your Business</button>

        <MyCategoriesForm/>
      </Container>
    </div>
  );
}

export default MyHero;
