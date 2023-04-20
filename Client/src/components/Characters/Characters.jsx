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


import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCharacters, setPage } from '../../redux/Actions/actions';
import Card from '../Card/Card';
import style from "./Characters.module.css"
import { NavLink } from 'react-router-dom';

const Characters = ({ characters }) => {

    const dispatch = useDispatch();
    const { currentPage, itemsPerPage, isLoading, error } = useSelector(state => state);

    useEffect(() => {
        dispatch(getAllCharacters(currentPage))
    }, [dispatch, currentPage]);

    if (isLoading) {
        return <div className={style.loading}>Loading...</div>;
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

    return (
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
        </div>
    )
};

const mapStateToProps = ({ isLoading, error, characters }) => ({ isLoading, error, characters });

export default connect(mapStateToProps, { getAllCharacters })(Characters)
