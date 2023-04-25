import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";

const Detail = () => {
    const { id } = useParams();

    const [character, setCharacter] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/rickandmorty/character/${id}`)
        .then((response) => response.json())
        .then((char) => {
            if(char.name) {
                setCharacter(char);
            }  else {
                alert("Character not found");
            }
        })
        .catch((err) => {
            alert("Character not found");
        })
        return setCharacter({});
    },[id])

    return (
        <div className={style.contenedorDetail} >

            <div className={style.foto}>
            <img src={character.image} alt={character.name}/>
            </div>
            <h2 className={style.nombre} >{character.name}</h2>

            <div className={style.texto}>
            <h2> <b>Status : </b> {character.status}</h2>
            <h2> <b>Specie : </b> {character.species}</h2>
            <h2> <b>Gender : </b> {character.gender}</h2>
            <h2> <b>Origin : </b> {character.origin?.name}</h2>
            <h2> <b>Location : </b> {character.location?.name}</h2>
            </div>

        </div>
    )
}

export default Detail