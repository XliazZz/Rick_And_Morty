import style from "./Card.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { addFav, removeFav, removeCard } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function Card({ id, name, status, species, gender, origin, image, location }) {
   const { pathname } = useLocation();
   const dispatch = useDispatch();
   const myFavorites = useSelector((state) => state.myFavorites);
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         dispatch(removeFav(id));
      } else {
         setIsFav(true);
         dispatch(addFav({ id, name, status, species, gender, origin, image, location }));
      }
   };

   const onClose = () => {
      dispatch(removeCard(id));
   };

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
         setIsFav(true);
         }
      });
   }, [myFavorites]);

   const [isHovering, setIsHovering] = useState(false);

   function handleMouseEnter() {
      setIsHovering(true);
      }
   
      function handleMouseLeave() {
      setIsHovering(false);
   }

   function calculateFontSize(name) {
      if (name.length <= 5) {
         return "25px";
      } else if (name.length <= 10) {
         return "22px";
      } else if (name.length <= 15) {
         return "22px";
      } else if (name.length <= 20) {
         return "18px";
      } else if (name.length <= 25) {
         return "17px";
      } else if (name.length <= 30) {
         return "17px";
      }
   }

   const calculateStatus = (status) => {
      if (status === "Alive") {
         return  'green';
      } else if (status === "Dead") {
         return  "red";
      } else if (status === "unknown") {
         return  "gray";
      }
   }

   return (
      <div className={style.card} >

      <button
         onClick={handleFavorite}
         className={style["heart-btn"]}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <span
         className={`${style["heart-icon"]} ${isHovering ? style["beat"] : ""} corazon`}
         >{isFav ? "💚" : "🤍"}</span>
      </button>
   

      {pathname !== "/favorites" && pathname !== "/home" && (
         <button className={style.button} onClick={onClose}>
            X
         </button>
      )}

      <NavLink to={`/detail/${id}`}>
         <img className={style.imagen} src={image} alt="" />
      </NavLink>

      <div className={style.divNombre}>
      <h2 className={style.name} style={{ fontSize: calculateFontSize(name) }}>{name}</h2>
      </div>

      <div className={style["status-container"]} >
         <div
            className={style["status-circle"]}
            style={{ backgroundColor: calculateStatus(status) }}
            data-status={status}
         ></div>
      </div>


      {/* <hr /> */}
      {/* <div className={style.texto}>
      </div> */}
         {/* { pathname === "/home" && <h2 className={style.gender} >{gender}</h2>}
         { pathname === "/home" && <h2 className={style.species} >{species}</h2>}
         { pathname === "/home" && <h2 className={style.origin} >{origin}</h2>} */}
         {/* { pathname === "/home" && <h2 className={style.location} >{location.name}</h2>} */}

      </div>
   );
}

export default Card;