import style from "./SearchBar.module.css"
import { useState } from "react";

export default function SearchBar({onSearch}) {
   const [id, setId] = useState('')

   const handleChange = (event) => {
      setId(event.target.value)
   }

   console.log(id)
   return (
      <>
         <input placeholder="Search character..." className={style.input} onChange={handleChange} value={id} type='search' />
         
         <button className={style.button}  onClick={() =>{onSearch(id); setId('')}} >Search</button>
      </>
   );
}
