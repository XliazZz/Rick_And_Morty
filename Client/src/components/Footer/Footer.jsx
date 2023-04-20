import { NavLink } from "react-router-dom";
import style from "./Footer.module.css";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();

    const isLoading = useSelector((state) => state.isLoading);
    const myFavorites = useSelector((state) => state.myFavorites);

    if (isLoading) {
        return null; // Si isLoading es true, no se muestra el Footer
    }

    return location.pathname === "/" ? null : (
        <div>
        <footer className={style.footer}>
            <NavLink to="./about" className={style.activeLink}>
                <p>About me</p>
            </NavLink>

                <NavLink to="./contact" className={style.activeLink}>
                    <p>Contact Us</p>
                </NavLink>

            <p className={style.rickandmorty} > <b className={style.rick} >Rick</b> and <b className={style.morty} >Morty</b> </p>

            <p>Henry project</p>

            <div className={style.redesSociales}>
                    <a href="https://www.github.com/XliazZz" target="_blank" rel="noreferrer">
                        <FaGithub className={style.icono} />
                    </a>

                    <a href="https://www.instagram.com/eliasx._" target="_blank" rel="noreferrer">
                        <FaInstagram className={style.icono} />
                    </a>
                    <a href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" rel="noreferrer">
                        <FaLinkedin className={style.icono} />
                    </a>
                </div>

        </footer>
        </div>
    );
};

export default Footer;