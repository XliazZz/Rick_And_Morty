// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { getAllCharacters, setPage } from '../../redux/Actions/actions';
// import Card from '../Card/Card';
// import { useDispatch, useSelector } from 'react-redux';
// import style from "./Characters.module.css"
// import { NavLink } from 'react-router-dom';

// const Characters = ({ characters, isLoading, error, getAllCharacters }) => {

//     const dispatch = useDispatch();
//     const currentPage = useSelector(state => state.currentPage);
//     const itemsPerPage = useSelector(state => state.itemsPerPage);

//     useEffect(() => {
//         getAllCharacters(currentPage)
//     }, [getAllCharacters, currentPage]);

//     if (isLoading) {
//         return <div className={style.loading} >Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     // Cálculo de los índices de inicio y fin para los elementos de la página actual
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, characters.length);
//     const currentItems = characters.slice(startIndex, endIndex);

//     const handlePreviousPage = () => {
//         dispatch(setPage(currentPage - 1));
//     };

//     const handleNextPage = () => {
//         dispatch(setPage(currentPage + 1));
//     };

//     return (
//         <div className={style.contenedorCharacters}>
//         {Array.isArray(characters) && (
//             characters?.map((character) => <Card
//             key={character.id}
//             id={character.id}
//             name={character.name}
//             status={character.status}
//             species={character.species}
//             gender={character.gender}
//             image={character.image}
//             origin={character.origin.name}
//             onClose={character.onClose}
//         />)
//         )
//         }
//         <div>
//         {/* <ul>
//             {currentItems.map((item, index) => {
//                 return <li key={index}>{item.name}</li>
//             })}
//         </ul> */}
//         </div>

//         <div className={style.contenedorboton}>
//         <NavLink
//             to={`/Characters/page/${currentPage - 1}`}
//             onClick={handlePreviousPage}
//             className={style.botonPage}
//             disabled={currentPage === 1} // Deshabilitar el botón si currentPage es 1
//             >
//             Back
//             </NavLink>

//             <NavLink
//             to={`/Characters/page/${currentPage + 1}`}
//             onClick={handleNextPage}
//             className={style.botonPage}
//             disabled={endIndex >= characters.length}
//             >
//             Next
//             </NavLink>
//         </div>
        

//         </div>
//     )
// };

// const mapStateToProps = (state) => ({
//     isLoading: state.isLoading,
//     error: state.error,
//     characters: state.characters,
// })

// export default connect(mapStateToProps, { getAllCharacters })(Characters)


import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCharacters, setPage } from '../../redux/Actions/actions';
import Card from '../Card/Card';
import style from "./Characters.module.css"
import { NavLink } from 'react-router-dom';
import portal from "../Asserts/PortalInicio.png"
import ScrollTop from '../ScrollTop/ScrollTop';
import { useState } from 'react';

const Characters = ({ characters }) => {

    const dispatch = useDispatch();
    const { currentPage, itemsPerPage, isLoading, error } = useSelector(state => state);
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('')

    useEffect(() => {
        dispatch(getAllCharacters(currentPage, speciesFilter, statusFilter, genderFilter));
    }, [dispatch, currentPage, speciesFilter, statusFilter, genderFilter]);

    if (isLoading) {
        return (
        <div>
            <img className={style.portalLoading} src={portal} alt="portal" />
            <p className={style.loading} >Loading...</p>
        </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, characters.length);
    const currentItems = characters.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        dispatch(setPage(currentPage - 1));
    };

    const handleNextPage = () => {
        dispatch(setPage(currentPage + 1));
    };

    const handleSpeciesChange = (event) => {
        setSpeciesFilter(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGenderFilter(event.target.value);
    };

    return (
        <div className={style.elCapo}>

            <div className={style.speciesFilter}>
                <label htmlFor="species">Filter by Species:</label>
                <select id="species" value={speciesFilter} onChange={handleSpeciesChange}>
                <option value="">All</option>
                <option value="Human">Human</option>
                <option value="Alien">Alien</option>
                <option value="Humanoid">Humanoid</option>
                <option value="Mythological Creature">Mythological Creature</option>
                <option value="Animal">Animal</option>
                <option value="Robot">Robot</option>
                <option value="Cronenberg">Cronenberg</option>
                <option value="Disease">Disease</option>
                <option value="Unknown">Unknown</option>
                </select>
            </div>

            <div className={style.statusFilter}>
                <label htmlFor="status">Filter by Status:</label>
                <select id="status" value={statusFilter} onChange={handleStatusChange}>
                <option value="">All</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">unknown</option>
                </select>
            </div>

            <div className={style.genderFilter}>
                <label htmlFor="gender">Filter by Gender:</label>
                <select id="gender" value={genderFilter} onChange={handleGenderChange}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="unknown">unknown</option>
                </select>
            </div>

            <div className={style.contenedorCharacters}>
            {characters?.map((character) =>
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
                )}
                </div>
                
            <div className={style.contenedorboton}>
                <NavLink
                    to={`/Characters/page/${currentPage - 1}`}
                    onClick={handlePreviousPage}
                    className={style.botonPage}
                    disabled={currentPage === 1}
                    >
                    Back
                </NavLink>

                <NavLink
                    to={`/Characters/page/${currentPage + 1}`}
                    onClick={handleNextPage}
                    className={style.botonPage}
                    disabled={endIndex >= characters.length}
                    >
                    Next
                </NavLink>

            </div>
            <div  className={style.botonTop}>
            <ScrollTop ></ScrollTop>
            </div>
        </div>
    )
};

const mapStateToProps = ({ isLoading, error, characters }) => ({ isLoading, error, characters });

export default connect(mapStateToProps, { getAllCharacters })(Characters)
