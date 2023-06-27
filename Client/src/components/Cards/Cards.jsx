import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchCharacter } from "../../redux/Actions/actions";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import CardLoading from "../CardLoading/CardLoading";
import AlertError from "../AlertError/AlertError";

const Cards = ({ match }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const success = useSelector((state) => state.success);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(searchCharacter(match));
    setLoading(false)
  }, [dispatch, match]);

  return (
    <div className={style.contenedorCards}>
      {loading ? (
        searchResults[searchResults.length - 1]?.map((_, index) => (
          <CardLoading key={index} />
        ))
      ) : success ? (
        searchResults[searchResults.length - 1]?.map((character) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            image={character.image}
            origin={character.origin?.name}
            onClose={character.onClose}
          />
        ))
      ) : null}
    </div>
  );
};

export default Cards;
