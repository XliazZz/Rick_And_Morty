import style from "./SearchBar.module.css"
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchBar({onSearch}) {
   const [id, setId] = useState('')

   const handleChange = (event) => {
      setId(event.target.value)
   }

   return (
      <>
         <input placeholder="Search character..." className={style.input} onChange={handleChange} value={id} type='search' />
         
         
         <button className={style.boton}  onClick={() =>{onSearch(id); setId('')}} >Search</button>
         
      </>
   );
}
