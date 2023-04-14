import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import axios from 'axios';

const URL_BASE = "https://be-a-rym.up.railway.app/api/character/";
const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";

const Detail = () => {
    const { id } = useParams();

    const [character, setCharacter] = useState({})

    useEffect(() => {
        axios(`${URL_BASE}/${id}?key=${API_KEY}`)
        .then(({ data }) => {
        if (data.name) {
        setCharacter(data);
        } else {
            window.alert('No hay personajes con ese ID');
        }
        });
        return setCharacter({});
    }, [id]);

    return (
        <div className={style.contenedorDetail} >

            <div>
                <button>
                    <Link to='/home' >Home</Link>
                </button>
            </div>

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