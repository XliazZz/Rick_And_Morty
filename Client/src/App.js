// import './App.css';
// import Cards from './components/Cards/Cards.jsx';
// import Nav from './components/Nav/Nav';
// import { useState, useEffect } from 'react';
// import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
// import Detail from './components/Detail.jsx/Detail';
// import About from "./components/About/About"
// import Errors from './components/Error/Error';
// import Form from './components/Form/Form';
// import Favorites from './components/Favorites/Favorites';
// import Characters from './components/Characters/Characters';
// import Footer from './components/Footer/Footer';
// import ContactForm from './components/ContactForm/ContactForm';
// import Home from './components/Home/Home';
// import SignIn from './components/SignIn/SignIn';


// const URL_BASE = "https://be-a-rym.up.railway.app/api/character"
// const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047"

// function App() {
//                      //ESTADOS
//    const [characters, setCharacters] = useState([])
//    const [access, setAccess] = useState(false)

//                      //FUNCIONES

//    const onClose = (id) => {
//       setCharacters(
//          characters.filter((character) => character.id !== (id))
//       )
//    }
//    const login = (userData) => {
//       if(userData.email === email && userData.password === password){
//          setAccess(true)
//          navigate("/characters")
//       }
//       else{
//          return alert('Credenciales invalidas')
//       }
//    }
//    const logOut = () => {
//       setAccess(false)
//    }

//                      //CONSTANTES
//    const { pathname } = useLocation()
//    const email = 'ejemplo10@gmail.com'
//    const password = 'Contra1@'
//    const navigate = useNavigate()

//                      //useEffect
//    useEffect(() => {
//       !access && navigate('/')
//    }, [access])

//       return (
//       <div className='App' >
//          { pathname !== "/"  && <Nav  logOut={logOut}/>  }
//          <Routes>
//             <Route path='/' element={<Form login={login} />} />
//             <Route path='/home' element={<Home />} />
//             <Route path='/cards' element={<div>
//                <Cards onClose={onClose} />
//                </div>}/>
//             <Route path="/characters" element={<Characters />} />
//             <Route path='characters/page/:pageNumber' element={<Characters />} />
//             <Route path='/about' element={<About />}/>
//             <Route path='/detail/:id' element={<Detail />} />
//             <Route path='/favorites' element={<Favorites />} />
//             <Route path="/contact" element={<ContactForm />} />
//             <Route path='/sign' element={<SignIn />} />
//             <Route path='*' element={<Errors />} /> 
//          </Routes>
//          { pathname !== "/favorites" &&  <Footer />}
//       </div>
//    );
// }

// export default App;




import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Cards from './components/Cards/Cards.jsx';
import Characters from './components/Characters/Characters';
import ContactForm from './components/ContactForm/ContactForm';
import Detail from './components/Detail.jsx/Detail';
import Errors from './components/Error/Error';
import Favorites from './components/Favorites/Favorites';
import Form from './components/Form/Form';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';
import About from "./components/About/About";
import Footer from './components/Footer/Footer';
import axios from 'axios';
import Home from './components/Home/Home';

// const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
// const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";
const EMAIL = 'ejemplo10@gmail.com';
const PASSWORD = 'Contra1@';

function App() {
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const onClose = (id) => {
      setCharacters(characters.filter((character) => character.id !== id));
   };

   const login = async (userData) => {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      try {
         const { data } = await axios(URL + `?email=${email}&password=${password}`);
         const { access } = data;
         setAccess(data);
         access && navigate('/characters');
      } catch (error) {
         console.error(error);
      }
   };

   const logOut = () => {
      setAccess(false);
   };

   useEffect(() => {
      if (!access && pathname !== '/login' && pathname !== '/' && pathname !== "/register") {
         navigate('/login');
      }
      }, [access, navigate, pathname]);

   return (
      <div className="App">
         {pathname !== '/' && pathname !=="/login" && pathname !== "/register" && <Nav logOut={logOut} />}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Form login={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cards" element={<Cards onClose={onClose} />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/page/:pageNumber" element={<Characters />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="*" element={<Errors />} />
         </Routes>
         {pathname !== '/favorites' && pathname !== "/" && pathname !== "/login" && pathname !== "/register" && <Footer />}
      </div>
   );
}


export default App;
