import style from "./Card.module.css"
import { NavLink } from "react-router-dom";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function Card({id, onClose, name, status, species, gender, origin, image, addFav, removeFav, myFavorites}) {

   const [isFav, setIsFav] = useState(false)

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false)
         removeFav(id)
      }
      else{
         setIsFav(true)
         addFav({id, name, status, species, gender, origin, image})
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
   return (
      <div className={style.card}>
         <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
         <button className={style.button} onClick={() => {onClose(id)}}>
            X
         </button>
         <NavLink to={`/detail/${id}`}>
         <img className={style.imagen} src={image} alt='' />
         </NavLink>
         <div className={style.divNombre}>
         <h2 className={style.name} >{name}</h2>
         </div>
         {/* <hr /> */}
         {/* <div className={style.texto}>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin.name}</h2>
         </div> */}
      </div>
   );
};

const mapDispatchToProps = (dispatch) => {
   return{
      addFav: (character) => { dispatch(addFav(character)) },
      removeFav: (id) => { dispatch(removeFav(id)) }
   };
};

const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card)

//cuando necesitamos algo del estado global usamos mapStateToProps, sino ponemos null, lo mismo con el mapDispatchToProps.