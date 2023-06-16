import style from "./Card.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { postFavorite, removeFav, removeCard } from "../../redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function Card({ id, name, status, species, gender, origin, image, location }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(removeCard(id));
  };
  
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
        setIsFav(false);
        dispatch(removeFav(id));
    } else {
        setIsFav(true);
        dispatch(postFavorite({ id, name, status, species, gender, origin, image, location }));
    };
  };

  const [favs, setFavs] = useState([]);

  const URL = 'http://localhost:3001';
  useEffect(() => {
      const allCountriesFav = async () => {
        const endpoint = `${URL}/favorites`;
          try {
              const respose = await axios.get(endpoint);
              const data = respose.data;
              setFavs(data)
          } catch (error) {
              throw new Error(`${error.message}`);
          }
      }
      allCountriesFav();
  }, [])

  useEffect(() => {
    if (Array.isArray(favs)) {
      favs.forEach((fav) => {
        if (fav && fav.id === id) {
          setIsFav(true);
        }
      });
    }
  }, [favs]);
  

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
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

  const calculateFontSize = (name) => {
    if (name.length < 10) {
      return "25px";
    } else if (name.length < 15) {
      return "20px";
    } else if (name.length < 20) {
      return "21px";
    } else if (name.length < 25) {
      return "17px";
    } else if (name.length < 30) {
      return "15px";
    } else if (name.length < 35) {
      return "11px";
    } 
  };
      
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

      {pathname === "/cards" && ( 
        <button className={style.button} onClick={onClose}>
            X
        </button>
      )}

      <NavLink to={`/detail/${id}`}>
        <img className={style.imagen} src={image} alt="" />
      </NavLink>

      <div className={style.divNombre}>
        <h2 style={{ fontSize: calculateFontSize(name) }} className={style.name}>{name}</h2>
      </div>

      <div className={style["status-container"]} >
        <div
          className={style["status-circle"]}
          style={{ backgroundColor: calculateStatus(status) }}
          data-status={status}
        >
        </div>
      </div>

    </div>
  );
}

export default Card;