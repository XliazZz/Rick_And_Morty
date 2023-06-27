import React, { useEffect, useState } from "react";
import style from "./Episode.module.css";
import { NavLink } from "react-router-dom";
import EpisodeDetail from "../EpisodeDetail/EpisodeDetail";
import ScrollTop from '../ScrollTop/ScrollTop';
import axios from "axios";

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/episodes');
        const episodeData = response.data;
      
        const seasonsMap = new Map();
        episodeData.forEach((episode) => {
          const seasonNumber = episode.episode.substring(0, 3);
        
          if (seasonsMap.has(seasonNumber)) {
            seasonsMap.get(seasonNumber).push(episode);
          } else {
              seasonsMap.set(seasonNumber, [episode]);
            }
        });
      
        setEpisodes(Array.from(seasonsMap));
        setSelectedEpisode(null);
      } catch (error) {
            console.error(error);
        }
    };
      fetchData();
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
                  {episode.name}
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
