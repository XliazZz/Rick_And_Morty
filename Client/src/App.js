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
import EpisodeList from './components/Episodes/Episodes';
import EpisodeDetail from './components/EpisodeDetail/EpisodeDetail';

function App() {
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClose = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  const login = async (userData) => {
    const { email, password, userName } = userData;
    const URL = 'http://localhost:3001/api/signin';
  
    try {
      let endpoint = URL;
      if (email) {
        endpoint += `?email=${email}&password=${password}`;
      } else if (userName) {
        endpoint += `?userName=${userName}&password=${password}`;
      } else {
        console.error('Email or userName is required.');
        return;
      }
  
      const { data } = await axios.get(endpoint);
      const { token } = data; 
      localStorage.setItem('token', token); 
      navigate('/characters')
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const access = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (!access && (pathname !== '/' && pathname !== '/register' && pathname !== '/login')) {
      navigate('/login');
    }
  }, [navigate, pathname])

  return (
    <div className="App">
      {pathname !== '/' && pathname !== "/login" && pathname !== "/register" && pathname !== "/*" && <Nav handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Form login={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cards" element={<Cards onClose={onClose} />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/page/:pageNumber" element={<Characters />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/episodes' element={<EpisodeList />} />
        <Route path='/episode/detail/:id' element={<EpisodeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<Errors />} />
      </Routes>
      {pathname !== '/favorites' && pathname !== "/login" && pathname !== "/register" && <Footer />}
    </div>
  );
}

export default App;
