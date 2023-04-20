import { useLocation, NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";

export default function Nav({ logOut }) {
    const location = useLocation();

    return (
        <div className={style.navegador}>
        {location.pathname !== "/home" && (
            <NavLink to="/">
            <button className={style.logOut} onClick={logOut}>
                Log Out
            </button>
            </NavLink>
        )}

        <NavLink to="/characters">
            <button className={style.homeButton}>Characters</button>
        </NavLink>


        <NavLink to="/favorites">
            <button className={style.favoritesButton}>Favorites</button>
        </NavLink>

        <NavLink to="/about">
            <button className={style.aboutButton}>About</button>
        </NavLink>

        <NavLink to="/home">
            <button className={style.init}>home</button>
        </NavLink>

        <SearchBar />

        </div>
    );
}
