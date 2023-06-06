import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCharacters } from '../../redux/Actions/actions';
import Card from '../Card/Card';
import style from "./Characters.module.css"
import { useParams } from 'react-router-dom';
import portal from "../Asserts/PortalInicio.png"
import ScrollTop from '../ScrollTop/ScrollTop';
import CardLoading from '../CardLoading/CardLoading';

const Characters = () => {

    const dispatch = useDispatch();

    const characters = useSelector((state) => state.characters)
    const isLoading = useSelector((state) => state.isLoading)
    const error = useSelector((state) => state.error)

    const { pageNumber } = useParams(); // obtiene el número de página actual de la ruta

    const [currentPage, setCurrentPage] = useState(pageNumber ? pageNumber - 1 : 0);

    const [selectedSpecie, setSelectedSpecie] = useState(''); // estado para guardar el continente seleccionado
    let filteredCharacters = characters;
    if (selectedSpecie) {
        filteredCharacters = characters.filter(character => character.species.includes(selectedSpecie));
    }

    useEffect(() => {
        dispatch(getAllCharacters());
    }, [dispatch]);

    const itemsPerPage = 20;
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredCharacters.slice(offset, offset + itemsPerPage);

    // calcula el número de páginas en función de la cantidad de elementos
    const pageCount = Math.ceil(filteredCharacters.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    }

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await fetch('http://localhost:3001/species');
                const data = await response.json();
                setSpecies(data);
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        };

        fetchSpecies();
    }, []);

    const handleSpeciesChange = (event) => {
        setSelectedSpecie(event.target.value);
        setCurrentPage(0); // resetea la página actual cuando se cambia el continente seleccionado
    }
    
    return (
        <div className={style.elCapo}>

            <div className={style.speciesFilter}>
            <h2 className={style.h2Filter}>Species</h2>
                    <select value={selectedSpecie} onChange={handleSpeciesChange}>
                        <option value="">All</option>
                        {species.map(Specie => (
                        <option key={Specie} value={Specie}>{Specie}</option>
                        ))}
                    </select>
            </div>


            <div className={style.contenedorCharacters}>
            {currentItems?.map((character) => {
              if (isLoading) {
                return <CardLoading key={character.id} />;
              } else {
                return (
                  <Card
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    status={character.status}
                    species={character.species}
                    gender={character.gender}
                    image={character.image}
                    origin={character.origin.name}
                    onClose={character.onClose}
                  />
                );
              }
            })}

                </div>
                

            <div className={style.contenedorboton}>
            {currentPage !== 0 &&             
              <button
                    className={style.botonPage}
                    onClick={() => handlePageChange({ selected: currentPage - 1 })}
                    disabled={currentPage === 0}
                >
                    Back
                </button>
            }

            <h2 className={style.spanPage}> {currentPage + 1}/{pageCount} </h2>
                
            { currentPage !== pageCount-1 &&               
                <button
                    className={style.botonPage}
                    onClick={() => handlePageChange({ selected: currentPage + 1 })}
                    disabled={currentPage === pageCount - 1}
                >
                    Next
                </button>
            }
            </div>
            <div  className={style.botonTop}>
            <ScrollTop ></ScrollTop>
            </div>
        </div>
    )
};


export default Characters;
