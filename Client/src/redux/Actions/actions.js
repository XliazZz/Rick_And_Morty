import * as types from "../Action-types/actions-types";
import axios from 'axios';

const URL_BASE = "https://be-a-rym.up.railway.app/api/character";
const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";


export const addFav = (character) => {
    return async (dispatch) => {
        const endpoint = 'http://localhost:3001/rickandmorty/fav';
        try{
            const { data } = await axios.post(endpoint, character);
            dispatch({
                type: types.ADD_FAV,
                payload: data,
            });
        }   
        catch (error) {
            console.error(error);
        }
    };
};

export const removeFav = (id) => {
    return async (dispatch) => {
        const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
        try{
            const { data } = await axios.delete(endpoint);
            dispatch({
                type: types.REMOVE_FAV,
                payload: data,
            });
        }
        catch (error) {
            console.error(error);
        }
    };
};


export const orderCards = (orden) => {
    return { type: types.ORDER, payload: orden }
};


// Characters

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
    };
};


//Paginate
export function setPage(pageNumber){
    return{
        type: types.SET_PAGE,
        payload: pageNumber
    };
};

//SearchBar
export const searchCharacter = (id) => (dispatch, getState) => {
    const { searchResults } = getState();
    const existingCharacter = searchResults.find((character) => character.id === id);
    
    if (existingCharacter) {
        alert(`Character with id ${id} already exists in search results.`);
        return;
    }
    
    dispatch({ type: types.SEARCH_CHARACTER });
    
    axios
    .get(`${URL_BASE}/${id}?key=${API_KEY}`)
    .then((response) => {
        const character = response.data;
        dispatch({ type: types.SEARCH_CHARACTER_SUCCESS, payload: character });
    })
    .catch((error) => {
        dispatch({ type: types.SEARCH_CHARACTER_ERROR, payload: error.message });
    });
};

//OnClose
export const removeCard = (id) => {
    return { type: types.REMOVE_CARD, payload: id };
};

//Filter
export const filterGender = (gender) => {
    return { type: types.FILTER, payload: gender };
};

//ContactFomr
export const addMessage = (name, email, message) => {
    return { type: types.ADD_MESSAGE, payload: { name, email, message } };
};