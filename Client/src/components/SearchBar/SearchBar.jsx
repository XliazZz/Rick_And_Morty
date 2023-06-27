import style from "./SearchBar.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCharacter } from "../../redux/Actions/actions";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"


export default function SearchBar() {
   const [name, setName] = useState('');
   
   const dispatch = useDispatch();

   const handleChange = (event) => {
      setName(event.target.value)
   }

   const navigate = useNavigate();

   const handleClick = () => {
      if (name) {
         dispatch(searchCharacter(name, navigate));
         setName('');
      }
   }

   return (
      <>
         <input placeholder="Search character..." className={style.input} onChange={handleChange} value={name} type='search' />
         
         <NavLink to="/cards" >
         <button className={style.boton}  onClick={handleClick} > <FaSearch></FaSearch> </button>
         </NavLink>
      </>
   );
}
