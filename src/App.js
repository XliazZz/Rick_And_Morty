import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import  style from "./App.module.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import Detail from './components/Detail.jsx/Detail';
import About from "./components/About/About"
import Errors from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';

const URL_BASE = "https://be-a-rym.up.railway.app/api/character"
const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047"

function App() {
                     //ESTADOS
   const [characters, setCharacters] = useState([])
   const [access, setAccess] = useState(false)

                     //FUNCIONES
   function onSearch(id) {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            navigate("*");
         }
      });
   }
   const onClose = (id) => {
      setCharacters(
         characters.filter((character) => character.id !== (id))
      )
   }
   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true)
         navigate("/home")
      }
      else{
         return alert('Credenciales invalidas')
      }
   }
   const logOut = () => {
      setAccess(false)
   }

                     //CONSTANTES
   const { pathname } = useLocation()
   const email = 'ejemplo10@gmail.com'
   const password = 'Contra1@'
   const navigate = useNavigate()

                     //useEffect
   useEffect(() => {
      !access && navigate('/')
   }, [access])

      return (
      <div className='App' >

         { pathname !== "/" && <Nav onSearch={onSearch} logOut={logOut}/>  }

         <Routes>
            <Route path='/' element={<Form login={login} />} ></Route>

            <Route path='/home' element={<div className={style.contenedorCards}>
               <Cards characters={characters} onClose={onClose} />
               </div>}>

               </Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/detail/:id' element={<Detail />} ></Route>
            <Route path='/favorites' element={<Favorites />} />
            <Route path='*' element={<Errors />} > </Route>
         </Routes>

      </div>
   );
}

export default App;
