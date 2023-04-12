import { useSelector } from "react-redux";
import Card from "../Card/Card";

const Favorites = () => {
    const favorites = useSelector((state) => state.myFavorites)
    return(
        <div>
            {favorites?.map(({id, name, status, species, gender, origin, image}) => {
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
                    )
                })}
        </div>
    )
}

export default Favorites;