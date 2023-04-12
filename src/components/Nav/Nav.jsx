import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css"
import { NavLink } from "react-router-dom";

export default function nav ({onSearch}, {logOut}){
    return(
        <div className={style.navegador}>
            <NavLink to="/" >
                <button className={style.logOut} onClick={logOut} >Log Out</button>
            </NavLink>

            <NavLink to="/home" >
                <button className={style.boton} >Home</button>
            </NavLink>

            <NavLink to="/favorites" >
                <button>Favorites</button>
            </NavLink>

            <NavLink  to="/about">
                <button className={style.boton} >About</button>
            </NavLink>
            
            <SearchBar  onSearch={onSearch}></SearchBar>
        </div>
    )
}