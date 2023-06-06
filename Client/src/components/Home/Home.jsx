import style from "./Home.module.css";
import PortalInicio from "../Asserts/PortalInicio.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RandomCard from "../RandomCard/RandomCard";
import rickPepinillo from "../Asserts/rickPepinillo.png"

const Home = () => {

    const [characters, setCharacters] = useState([]);
    
    const getRandomCharacters = async () => {
        const URL = 'http://localhost:3001/random/';
        try {
            const { data } = await axios.get(URL);
            const characters = data.map((character) => {
                const { id, status, name, species, origin, image, gender, location } = character;
                return {
                id,
                name,
                species,
                origin: origin.name,
                image,
                gender,
                status,
                location: location.name
                };
            });
            console.log(characters);
            setCharacters(characters);
            } catch (error) {
            console.error(error);
            }
        };
        
    
    // Llama a la función para obtener los personajes cuando se carga el componente
    useEffect(() => {
        getRandomCharacters();
    }, []);


    return(
      <div className={style.contenedorHome} >
          <h1 className={style.tituloHome} >¡Welcome to the Multiverse of  <b className={style.rickHome} > Rick </b> and <b className={style.mortyHome}>Morty</b>!</h1>

          <img className={style.rickymorty} src={require ("../Asserts/rickymortyHome.png")} alt="" />

          <div className={style.contenedorDescription} >
            <h3>A wildly hilarious animated series that follows the outlandish adventures of a brilliant but troubled scientist and his easily influenced grandson across different dimensions and planets.
            </h3>
          </div>

          <h2 className={style.randomCharacters} >Random Characters</h2>
            <img className={style.rickPepinillo} src={rickPepinillo} alt="" />

          <div className={style.contenedoRandom}>
              {characters && characters.map((character) =>
                  <RandomCard
                      key={character.id}
                      id={character.id}
                      name={character.name}
                      status={character.status}
                      image={character.image}
                      origin={character.origin}
                      location={character.location}
                  />
              )}
          </div>

          <div className={style.registerorsign}>Register or log in to our Rick and Morty character page to see more! Join our community now!</div>

            <div className={style.cartas}>

              <div className={style.contenedorOpcion}>
                <h3 className={style.opcion}>Log In</h3>
                <NavLink to="/login">
                  <img className={style.portal} src={PortalInicio} alt={PortalInicio} />
                </NavLink>
              </div>

              <div className={style.contenedorOpcion}>
                <h3 className={style.opcion}>Register</h3>
                  <NavLink to="/register">
                    <img className={style.portal} src={PortalInicio} alt={PortalInicio} />
                  </NavLink>
              </div>
            </div>
            
        </div>
    );
};

export default Home;