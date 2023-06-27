import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";
import axios from "axios";

const Detail = () => {

    const { id } = useParams();

    const [character, setCharacter] = useState({});

    useEffect(() => {
        const inEffect = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/character/${id}`)
                if (data.name) {
                    setCharacter(data)
                } else {
                    throw new Error('Character not found')
                }
            } catch (error) {
                console.log('Character update in useEffect in component detail', error);
            }
        }
        inEffect();
        return setCharacter({})
    }, [])

    const generateCharacterDescription = () => {
        if (Object.keys(character).length === 0) {
          return "Loading character...";
        }
      
        let statusText = "unknown";
        if (character.status === "Alive") {
          statusText = "is alive";
        } else if (character.status === "Dead") {
          statusText = "is dead";
        }
      
        let genderText = "unknown";
        if (character.gender === "Male") {
          genderText = "is a male";
        } else if (character.gender === "Female") {
          genderText = "is a female";
        } else if (character.gender === "Genderless") {
          genderText = "is genderless";
        }
      
        let speciesText = "unknown";
        switch (character.species) {
          case "Alien":
            speciesText = "an alien";
            break;
          case "Disease":
            speciesText = "a disease";
            break;
          case "Poopybutthole":
            speciesText = "a Poopybutthole";
            break;
          case "Robot":
            speciesText = "a robot";
            break;
          case "Cronenberg":
            speciesText = "a Cronenberg";
            break;
          case "Humanoid":
            speciesText = "a humanoid";
            break;
          case "Human":
            speciesText = "a human";
            break;
          case "Mythological Creature":
            speciesText = "a mythological creature";
            break;
          case "Animal":
            speciesText = "an animal";
            break;
        }
      
        let description = `${character.name} ${statusText} ${genderText} ${speciesText} from ${character.origin}. `;
        description += `Currently, ${character.name} is located in ${character.location}.`;
      
        return description;
    };
    

    return (
        <div className={style.contenedorDetail}>
            <div className={style.foto}>
                <img src={character.image} alt={character.name} />
            </div>
            <h2 className={style.nombre}>{character.name}</h2>

            <div className={style.texto}>
                <h2>{generateCharacterDescription()}</h2>
            </div>
        </div>
    );
};

export default Detail;
