import Card from "../Card/Card";
import style from "./Cards.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { searchCharacter } from "../../redux/Actions/actions";
import { useEffect } from "react";


const Cards= ({ match  }) => {
   const searchResults = useSelector(state => state.searchResults);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(searchCharacter(match))
   }, [dispatch, match])

   return (
      <div className={style.contenedorCards} >
      {
               searchResults?.map(char => {
                  return (
                        <Card
                           key={char.id}
                           id={char.id}
                           name={char.name}
                           species={char.species}
                           gender={char.gender}
                           image={char.image}
                           onClose={char.onClose}
                        />
                  )
               })
            }
   </div>
   )
}

export default Cards;
