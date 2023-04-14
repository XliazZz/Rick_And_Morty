import axios from 'axios';

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const GET_CHARACTERS = "GET_CHARACTERS"
export const GET_CHARACTER_DETAIL = "GET_CHARACTER_DETAIL"
export const CLEAN_DETAIL = "CLEAN_DETAIL"
export const ONSEARCH = "ONSEARCH"

// const URL_BASE = "https://be-a-rym.up.railway.app/api/character/";
// const API_KEY = "6404c390b0dc.11ee869a4a7f5e41d047";


export const addFav = (character) =>{
    return { type: ADD_FAV, payload: character }
};

export const removeFav = (id) => {
    return { type: REMOVE_FAV, payload: id }
};

export const filterCards = (gender) => {
    return { type: FILTER, payload: gender }
};

export const orderCards = (orden) => {
    return { type: ORDER, payload: orden }
};

// export const getCharacters = () => {
//     return function(dispatch){
//         axios(`${URL_BASE}?key=${API_KEY}`)
//         .then(respose => respose.data)
//         .then(data => dispatch({ type: GET_CHARACTERS, payload: data.info.results }))
//     }
// }; 

// export const getCharacters = () => {
//     return async function(dispatch){
//         const respose = await axios(`${URL_BASE}?key=${API_KEY}`)
//         return dispatch({ type: GET_CHARACTERS, payload: respose.data.info.results })
//     }
// }

// export const getCharacterDetail = (id) => {
//     return function(dispatch){
//         axios(`${URL_BASE}${id}?key=${API_KEY}`
//         )
//         .then(response => response.data)
//         .then(data => dispatch({ type: GET_CHARACTER_DETAIL, payload: data}))
//     }
// };

// export const getCharacterDetail = (id) => {
//     return async function(dispatch){
//         const respose = await axios(`${URL_BASE}${id}?key=${API_KEY}`)
//         console.log(respose)
//         return dispatch({ type: GET_CHARACTER_DETAIL, payload: respose.data })
//     }
// }

// export const cleanDetail = () => {
//     return { type: CLEAN_DETAIL }
// }

// export const onSearch = (id) => {
//     return function(dispatch){
//         axios(`${URL_BASE}${id}?key=${API_KEY}`)
//             .then(({ data }) => {
//             if (data.name) {
//             dispatch({type: ONSEARCH, payload: data});
//             }
//             else{
//                 window.alert('There are no characters with this ID!')
//             }
//         });
//     }
//     }