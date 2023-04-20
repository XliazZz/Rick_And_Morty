import style from "./Home.module.css"
import { getAllCharacters } from "../../redux/Actions/actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import rickPepinillo  from "../Asserts/rickPepinillo.png"
import PortalInicio from "../Asserts/PortalInicio.png"
import rickcabeza from "../Asserts/rickcabeza.jpg"
import { NavLink } from "react-router-dom"; 

const Home = () => {

    const characters = useSelector((state) => state.characters)

    useEffect(() => {
        getAllCharacters();
    }, [getAllCharacters])

    // Obtener 6 personajes aleatorios
    const randomIndexes = [];
    while (randomIndexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }
    const randomCharacters = randomIndexes.map(index => characters[index]);

    return(
        <div className={style.contenedorHome} >
            <h1 className={style.tituloHome} >¡Welcome to the Multiverse of  <b className={style.rickHome} > Rick </b> and <b className={style.mortyHome} > Morty</b> !</h1>

            <img className={style.rickymorty} src={require ("../Asserts/rickymortyHome.png")} alt="" />

            <div className={style.contenedorDescription} >
                <h3>A wildly hilarious animated series that follows the outlandish adventures of a brilliant but troubled scientist and his easily influenced grandson across different dimensions and planets.
                </h3>
            </div>
<br />
            <h4 className={style.aleatorios} >Random  characters</h4>
            <div className={style.contenedorCharacters} >
            {/* Renderizar los 6 personajes aleatorios */}
                {Array.isArray(randomCharacters) && (
                    randomCharacters.map((character) => <Card
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    status={character.status}
                    // species={character.species}
                        gender={character.gender}
                        image={character.image}
                        // origin={character.origin.name}
                        onClose={character.onClose}
                        />)
                        )}
                        <img className={style.rickpepinillo} src={rickPepinillo} alt="rickpepinillo" />
            </div>

            <div className={style.fondorick} >
                <img src={rickcabeza} className={style.cabezarick} alt="cabezarick" />

                <h2 className={style.Homeh2} >Create an account or log in to explore all the amazing content on our Rick and Morty page!</h2>

                    <div className={style.contenedorPortal}>
                        <h2 className={style.login} >Login</h2>
                <NavLink to="/" >
                        <img className={style.portal} src={PortalInicio} alt="" />
                </NavLink>
                    </div>

                    <div className={style.contenedorPortal2}>
                        <h2 className={style.sign} >Sign In</h2>
                <NavLink to="sign" >
                        <img className={style.portal2} src={PortalInicio} alt="" />
                </NavLink>
                    </div>
            </div>
        </div>
    );
};

export default Home;
