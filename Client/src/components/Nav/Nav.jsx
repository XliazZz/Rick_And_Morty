import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css";
import { RiLogoutBoxLine } from "react-icons/ri"

export default function Nav({ handleLogout }) {
    const location = useLocation();

    const isLoading = useSelector((state) => state.isLoading);

    if (isLoading && location.pathname !== "/characters") {
        return null; 
    }

    return (
        <div className={style.navegador}>
        {location.pathname !== "/home" && (
            <NavLink to="/">
            <button className={style.logOut} onClick={handleLogout}>
                <RiLogoutBoxLine />
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

        <NavLink to="/episodes">
            <button className={style.episodesButton}>Episodes</button>
        </NavLink>

        <SearchBar />

        </div>
    );
}
