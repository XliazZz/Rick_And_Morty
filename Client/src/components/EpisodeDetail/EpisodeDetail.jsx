import style from "./EpisodeDetail.module.css";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import ScrollTop from '../ScrollTop/ScrollTop';


const EpisodeDetail = () => {
    const { id } = useParams();

    const [episode, setEpisode] = useState({});
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.name) {
            setEpisode(data);
            setCharacters(data.characters);
            }
        })
        .catch((err) => {
            alert("Episode not found");
        });

        return () => {
        setEpisode({});
        setCharacters([]);
        };
    }, [id]);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
        const characterDetails = await Promise.all(
            characters.map((characterUrl) =>
            fetch(characterUrl).then((response) => response.json())
            )
        );
        setCharacters(characterDetails);
        };

        if (characters.length > 0) {
        fetchCharacterDetails();
        }
    }, [characters]);

    console.log(characters);

    return (
        <div className={style.contenedorDetail}>

            <NavLink to="/episodes">
                <button className={style.backForm}><BiArrowBack></BiArrowBack></button>
            </NavLink>

        <h2 className={style.nombre}>{episode.name}</h2>

        <div className={style.texto}>
            <h2>
            <b>Air Date:</b> {episode.air_date}
            </h2>
            <h2>
            <b>Episode:</b> {episode.episode}
            </h2>

            {/* Nueva sección para mostrar los personajes */}
            <h2>
            <b>Characters:</b>
            </h2>
            <div className={style.contenedorCharacters}>
            {characters.map((character, index) => (
                <div key={index} className={style.card}>
                {character.name && (
                    <Card
                    id={character.id}
                    name={character.name}
                    status={character.status}
                    species={character.species}
                    gender={character.gender}
                    image={character.image}
                    origin={character.origin.name}
                    />
                )}
                </div>
            ))}
            </div>
        </div>

            <div  className={style.botonTop}>
                <ScrollTop ></ScrollTop>
            </div>

        </div>
    );
};

export default EpisodeDetail;