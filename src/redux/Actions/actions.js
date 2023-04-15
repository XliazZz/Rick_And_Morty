import * as types from "../Action-types/actions-types";
import axios from 'axios';

const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";


export const addFav = (character) =>{
    return { type: types.ADD_FAV, payload: character }
};

export const removeFav = (id) => {
    return { type: types.REMOVE_FAV, payload: id }
};

export const filterCards = (gender) => {
    return { type: types.FILTER, payload: gender }
};

export const orderCards = (orden) => {
    return { type: types.ORDER, payload: orden }
};


// Actions para mostrar los personajes en home

//esta action envia la solicitud a la API.
export const request = () => ({
    type: types.REQUEST,
});

//Se envia cuando se reciben los datos correctamente,
export const success = (characters) => ({
    type: types.SUCCESS,
    payload: characters,
});

//Se envia cuando hay un error en la peticion.
export const errorRequest = (error) => ({
    type: types.ERRORREQUEST,
    payload: error,
});


//Hace la peticion a la api. Si es exitosa, se envia la accion "fetchCharacterSuccess", con los datos recibidos como argumento. si falla si envia "fetchCharacterFailure"
export const getAllCharacters = (page) => async (dispatch) => {
    dispatch(request());

    try {
        const response = await axios.get(`${URL_BASE}?key=${API_KEY}&page=${page}`);
        const characters = response.data;
        dispatch(success(characters.info.results));
    } catch (error) {
        const errorMessage = error.message;
        dispatch(errorRequest(errorMessage));
    }
};



//Paginate
export function setPage(pageNumber){
    return{
        type: types.SET_PAGE,
        payload: pageNumber
    }
}


//SearchBar
export const searchCharacter = (id) => {
    return (dispatch) => {
        dispatch({ type: types.SEARCH_CHARACTER });
        axios.get(`${URL_BASE}/${id}?key=${API_KEY}`)
        .then((respose) => {
            const character = respose.data;
            dispatch({ type: types.SEARCH_CHARACTER_SUCCESS, payload: character });
        })
        .catch((error) => {
            dispatch({ type: types.SEARCH_CHARACTER_ERROR, payload: error.message });
        });
    };
};