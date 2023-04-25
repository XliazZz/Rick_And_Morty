import style from "./SearchBar.module.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCharacter } from "../../redux/Actions/actions";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa"


export default function SearchBar() {
   const [id, setId] = useState('');
   
   const dispatch = useDispatch();
   const searchResults = useSelector((state) => state.searchResults)
   const isLoading = useSelector((state) => state.isLoading)
   const error = useSelector((state) => state.error)
   
   const handleChange = (event) => {
      setId(event.target.value)
   }

   const handleClick = () => {
      if (id) {
         dispatch(searchCharacter(id));
         setId('');
      }
   }

   return (
      <>
         <input placeholder="Search character..." className={style.input} onChange={handleChange} value={id} type='search' />
         
         <NavLink to="/cards" >
         <button className={style.boton}  onClick={handleClick} > <FaSearch></FaSearch> </button>
         </NavLink>

         {isLoading && <p>Loading...</p>}

         {error && <p>{error}</p>}

         
         {/* {searchResults && (
         <div>
            <h2>{searchResults.name}</h2>
            <img src={searchResults.image} alt={searchResults.name} />
         </div>
      )} */}

      </>
   );
}
