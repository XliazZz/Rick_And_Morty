import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterGender, orderCards } from "../../redux/Actions/actions";
import Card from "../Card/Card";
import axios from "axios";
import style from "./Favorite.module.css"

const Favorites = () => {
    const [aux, setAux] = useState(false);
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


    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value));
        setAux(true)
    };

    const handleFilter = (event) => {
        dispatch(filterGender(event.target.value));
    };

    console.log(favs);

    return(
        <div className={style.conteedorFavorites} >

            <select onChange={handleOrder}>
                <option value="A">Ascendente</option>

                <option value="D">Descendente</option>
            </select>

            <select onChange={handleFilter}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
                <option value="allCharacters">All Characters</option>
            </select>

            <div className={style.contenedorFavs}>
  {Array.isArray(favs) && favs.map(({ id, name, status, species, gender, origin, image }) => {
    return (
      <Card 
        id={id}
        key={id}
        name={name}
        status={status}
        species={species}
        gender={gender}
        origin={origin}
        image={image}
      />
    );
  })}
</div>

        </div>
    );
};

export default Favorites;