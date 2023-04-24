import style from "./Home.module.css";
import PortalInicio from "../Asserts/PortalInicio.png";
import rickcabeza from "../Asserts/rickcabeza.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {



    return(
        <div className={style.contenedorHome} >
            <h1 className={style.tituloHome} >¡Welcome to the Multiverse of  <b className={style.rickHome} > Rick </b> and <b className={style.mortyHome}>Morty</b>!</h1>

            <img className={style.rickymorty} src={require ("../Asserts/rickymortyHome.png")} alt="" />

            <div className={style.contenedorDescription} >
                <h3>A wildly hilarious animated series that follows the outlandish adventures of a brilliant but troubled scientist and his easily influenced grandson across different dimensions and planets.
                </h3>
            </div>
        </div>
    );
};

export default Home;
