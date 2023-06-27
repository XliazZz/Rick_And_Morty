import {  REMOVE_FAV, FILTER, ORDER, SUCCESS, ERRORREQUEST, REQUEST, SEARCH_CHARACTER, SEARCH_CHARACTER_SUCCESS, SEARCH_CHARACTER_ERROR, REMOVE_CARD, ADD_MESSAGE, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILURE, POST_FAVORITE_REQUEST, POST_FAVORITE_SUCCESS, POST_FAVORITE_ERROR, RESET_REGISTER, SET_ERROR, CLEAR_ERROR, GET_EPISODES_REQUEST, GET_EPISODES_SUCCESS, GET_EPISODES_ERROR } from "../Action-types/actions-types"

const initialState = {
    loading: false,
    error: null,
    success: false,
    characters: [], //aca estan los personajes del comp Characters
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 1,
    searchResults: [], 
    messages: [],
    episodes: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_FAVORITE_REQUEST:
            return{ 
                ...state,
                loading: { ...state.loading, postFavorite: true }
            };
        case POST_FAVORITE_SUCCESS:
            return{ 
                ...state,
                success: { ...state.success, postFavorite: true }
            };
        case POST_FAVORITE_ERROR:
            return{ 
                ...state,
                error: { ...state.error, postFavorite: action.payload }
            };

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload 
            };

        case FILTER:
            const allCharactersFiltered = state.allCharactersFav.filter(character => character.gender === action.payload)
            return {
                ...state,
                myFavorites: 
                    action.payload === 'allCharacters'
                    ? [...state.allCharactersFav]
                    : allCharactersFiltered
                }

        case ORDER:
            const copyAllCharacters = [...state.allCharactersFav];
            return{
                ...state,
                myFavorites: action.payload === "A" ? copyAllCharacters.sort((a, b) => a.id - b.id)
                : copyAllCharacters.sort((a,b) => b.id - a.id)
            };

        case REQUEST:
            return{
                ...state,
                loading: { ...state.loading, getCharacters: true }
            };

        case SUCCESS:
            return{
                ...state,
                success: { ...state.success, getCharacters: true },
                characters: action.payload,
            };

        case ERRORREQUEST:
            return{
                ...state,
                error: { ...state.error, getCharacters: action.payload }
            };

        case REMOVE_CARD:
            return{
                ...state,
                searchResults: state.searchResults.filter((char) => char.id !== action.payload )
            };

        case SEARCH_CHARACTER:
            return{
                ...state,
                loading: true 
            };

        case SEARCH_CHARACTER_SUCCESS:
            return{
                ...state,
                success:  true ,
                searchResults: [...state.searchResults, action.payload],
            };

        case SEARCH_CHARACTER_ERROR:
            return{
                ...state,
                error: action.payload 
            };



        case ADD_MESSAGE:
            return{
                ...state,
                messages: [...state.messages, action.payload, alert("se pudo"), console.log(state.messages)  ]
            };
            

        case REGISTER_REQUEST:
            return{
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
            return{
                ...state,
                success: true,
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                error: action.payload
            }

        case RESET_REGISTER:
            return{
                ...state,
                loading:false,
                success: false,
                error: false
            };


        case GET_EPISODES_REQUEST:
            return{
                ...state,
                loading: true
            };
        case GET_EPISODES_SUCCESS:
            return{
                ...state,
                success: true,
                episodes: action.payload
            };
        case GET_EPISODES_ERROR:
            return{
                ...state,
                error: action.payload
            }

        default:
            return{...state};
    };
};

export default rootReducer;