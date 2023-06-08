import * as types from "../Action-types/actions-types";
import axios from 'axios';
import { useNavigate } from "react-router";

const token = localStorage.getItem('token');

console.log(token);

const URL = 'http://localhost:3001';

export const postFavoriteCountryRequest = () => ({
    type: types.POST_FAVORITE_REQUEST,
});

export const postFavoriteCountrySuccess = (character) => ({
    type: types.POST_FAVORITE_SUCCESS,
    payload: character,
});

export const postFavoriteCountryError = (error) => ({
    type: types.POST_FAVORITE_ERROR,
    payload: error,
});

export const postFavorite = (character) => {
    return async (dispatch) => {
      dispatch(postFavoriteCountryRequest());
      const endpoint = `${URL}/fav`;
      try {
        const { data } = await axios.post(endpoint, character, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(postFavoriteCountrySuccess(data));
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch(postFavoriteCountryError(errorMessage));
      }
    };
  };
  


export const removeFav = (id) => {
    return async (dispatch) => {
        const endpoint = `${URL}/fav/${id}`;
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
export const request = () => ({
    type: types.REQUEST,
});

export const success = (characters) => ({
    type: types.SUCCESS,
    payload: characters,
});

export const errorRequest = (error) => ({
    type: types.ERRORREQUEST,
    payload: error,
});

export const getAllCharacters = () => {
    return async (dispatch) => {
    dispatch(request());
    
    try {
        const response = await axios.get(`${URL}/characters`);
        const characters = response.data;
        dispatch(success(characters));
    } catch (error) {
        const errorMessage = error.message;
        dispatch(errorRequest(errorMessage));
    };
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
export const searchCharacter = (id, navigate) => (dispatch, getState) => {
    const { searchResults } = getState();
    const existingCharacter = searchResults.find((character) => character.id === id);
    
        if (existingCharacter) {
        alert(`Character with id ${id} already exists in search results.`);
        return;
        }
    
        dispatch({ type: types.SEARCH_CHARACTER });
    
        axios
        .get(`${URL}/characters`)
        .then((response) => {
            const character = response.data;
            dispatch({ type: types.SEARCH_CHARACTER_SUCCESS, payload: character });
        })
        .catch((error) => {
            dispatch({ type: types.SEARCH_CHARACTER_ERROR, payload: error.message });
            navigate('*'); // Redirige al usuario a la página de errores
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

//Register
export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());
            const endpoint = `${URL}/api/signup`;
            const response = await axios.post(endpoint, userData);
            dispatch(registerSuccess(response.data));
        } catch (error) {
            dispatch(registerFailure(error.message));
        }
        };
};

export const registerRequest = () => {
    return {
        type: types.REGISTER_REQUEST,
    };
};

export const registerSuccess = (data) => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: data,
    };
};

export const registerFailure = (error) => {
    return {
        type: types.REGISTER_FAILURE,
        payload: error,
    };
};