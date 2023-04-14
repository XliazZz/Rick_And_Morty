import Card from "../Card/Card";
import style from "./Cards.module.css"

function Cards({ characters, onClose }) {
   return (
      <div className={style.contenedorCards}>
         {
         characters?.map(({id, name, status, species, gender, origin, image, location}) => {
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
                  onClose={onClose}
                  location={location.name}
               />
               )
            })
         }
      </div>
   )
}

export default Cards;
