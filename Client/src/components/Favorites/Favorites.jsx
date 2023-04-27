import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterGender, orderCards } from "../../redux/Actions/actions";
import Card from "../Card/Card";
import style from "./Favorite.module.css"

const Favorites = () => {
    const [aux, setAux] = useState(false);

    const favorites = useSelector((state) => state.myFavorites);
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value));
        setAux(true)
    };

    const handleFilter = (event) => {
        dispatch(filterGender(event.target.value));
    };

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
                {
                    favorites?.map(({id, name, status, species, gender, origin, image}) => {
                        return(
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
                            )})
                }
            </div>
        </div>
    );
};

export default Favorites;