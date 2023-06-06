import { NavLink } from "react-router-dom";
import style from "./Footer.module.css";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const Footer = () => {
    const isLoading = useSelector((state) => state.isLoading);

    if (isLoading) {
        return null; // Si isLoading es true, no se muestra el Footer
    }

    return(
        <div className={style.contenedorLoading} >
        <footer className={style.footer}>
            <NavLink to="./about" className={style.activeLink}>
                <p className={style.link}>About me</p>
            </NavLink>

                <NavLink to="./contact" className={style.activeLink}>
                    <p className={style.link}>Contact Us</p>
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