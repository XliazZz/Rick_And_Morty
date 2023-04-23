import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";

export default function Nav({ logOut }) {
    const location = useLocation();

    const isLoading = useSelector((state) => state.isLoading);

    if (isLoading) {
        return null; // Si isLoading es true, no se muestra el Footer
    }

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

        <SearchBar />

        </div>
    );
}
