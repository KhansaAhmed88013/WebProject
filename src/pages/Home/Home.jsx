import MyNavBar from '../../components/MyNavBar/MyNavBar'
import MyHero from './components/MyHero/MyHero'
import MyCategories from './components/MyCategories/MyCategories';
import MyJoinUs from './components/MyJoinUs/MyJoinUs';
import MyFooter from '../../components/MyFooter/MyFooter';

function Home() {
    return (  
        <>
            <MyNavBar/>
            <main>
                <MyHero/>
                <MyCategories/>
                <MyJoinUs/>
                <MyFooter/>
            </main>
        </>
    );
}

export default Home;