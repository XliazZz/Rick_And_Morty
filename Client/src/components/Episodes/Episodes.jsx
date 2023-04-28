import React, { useEffect, useState } from "react";
import style from "./Episode.module.css";
import { NavLink } from "react-router-dom";
import EpisodeDetail from "../EpisodeDetail/EpisodeDetail";
import ScrollTop from '../ScrollTop/ScrollTop';


const EpisodeList = () => {
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
        const seasonsMap = new Map();

        let nextPageUrl = "https://rickandmortyapi.com/api/episode";
        while (nextPageUrl) {
            try {
            const response = await fetch(nextPageUrl);
            const data = await response.json();

            data.results.forEach((episode) => {
                const seasonNumber = episode.episode.substring(1, 3);

                if (seasonsMap.has(seasonNumber)) {
                seasonsMap.get(seasonNumber).push(episode);
                } else {
                seasonsMap.set(seasonNumber, [episode]);
                }
            });

            nextPageUrl = data.info.next;
            } catch (error) {
            console.error("Error fetching episodes:", error);
            break;
            }
        }

        setEpisodes(Array.from(seasonsMap));
        };

        fetchEpisodes();
    }, []);

    const handleEpisodeClick = (episode) => {
        setSelectedEpisode(episode);
    };

    return (
        <div className={style.contenedorEpisodes}>
        <h2 className={style.allEpi} >All Episodes</h2>
        {episodes.map(([season, episodes]) => (
            <div key={season}>
            <h3 className={style.season} >Season {season}</h3>
            <div>
                {episodes.map((episode) => (
                <div
                    key={episode.id}
                    onClick={() => handleEpisodeClick(episode)}
                    className={`${style.episode} ${
                    selectedEpisode?.id === episode.id ? style.selectedEpisode : ""
                    }`}
                >
                    <NavLink  className={style.activeLink} to={`/episode/detail/${episode.id}`}>
                    {episode.episode} - {episode.name}
                    </NavLink>
                </div>
                ))}
            </div>
            </div>
        ))}
        {selectedEpisode && <EpisodeDetail episode={selectedEpisode} />}

            <div  className={style.botonTop}>
                <ScrollTop ></ScrollTop>
            </div>

        </div>
    );
};

export default EpisodeList;
