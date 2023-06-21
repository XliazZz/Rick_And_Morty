import {  REMOVE_FAV, FILTER, ORDER, SUCCESS, ERRORREQUEST, REQUEST, SEARCH_CHARACTER, SEARCH_CHARACTER_SUCCESS, SEARCH_CHARACTER_ERROR, REMOVE_CARD, ADD_MESSAGE, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILURE, POST_FAVORITE_REQUEST, POST_FAVORITE_SUCCESS, POST_FAVORITE_ERROR, GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS, GET_FAVORITE_ERROR, } from "../Action-types/actions-types"

const initialState = {
    isLoading: false,
    error: null,
    success: false,
    characters: [], //aca estan los personajes del comp Characters
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 1,
    searchResults: [], //resultados de la busqueda
    messages: [],
    // favorites: [],
    // favorites: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_FAVORITE_REQUEST:
            return{ 
                ...state,
                loading: true,
                error: false,
                success: false,
            };
        case POST_FAVORITE_SUCCESS:
            return{ 
                ...state,
                success: true,
                loading: false,
                error: false,
                // favorites: [...state.favorites, action.payload]
            };
        case POST_FAVORITE_ERROR:
            return{ 
                ...state,
                isLoading: false,
                error: action.payload
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
                isLoading:true,
                error: null,
            };

        case SUCCESS:
            return{
                ...state,
                isLoading: false,
                error: null,
                characters: action.payload,
            };

        case ERRORREQUEST:
            return{
                ...state,
                isLoading:false,
                error: action.payload,
            };


        case SEARCH_CHARACTER:
            return{
                ...state,
                isLoading: true,
                error: null,
            };

        case SEARCH_CHARACTER_SUCCESS:
            return{
                ...state,
                searchResults: [...state.searchResults, action.payload],
                isLoading: false,
                error: null,
                success: true,
            };

        case SEARCH_CHARACTER_ERROR:
            return{
                ...state,
                isLoading: false,
                error: action.payload
            };

        case REMOVE_CARD:
            return{
                ...state,
                searchResults: state.searchResults.filter((char) => char.id !== action.payload )
            };

        case ADD_MESSAGE:
            return{
                ...state,
                messages: [...state.messages, action.payload, alert("se pudo"), console.log(state.messages)  ]
            };
            

        case REGISTER_REQUEST:
            return{
                ...state,
                isLoading: true,
            };

        case REGISTER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                error: null,
                success: true,
            }

        case REGISTER_FAILURE:
            return{
                ...state,
                isLoading: false,
                error: action.payload
            }


        // case GET_FAVORITE_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true
        //     };

        // case GET_FAVORITE_SUCCESS:
        //     return{
        //         ...state,
        //         isLoading: false,
        //         error: null,
        //         success: true,
        //         favorites: action.payload,
        //     };

        // case GET_FAVORITE_ERROR:
        //     return{
        //         ...state,
        //         isLoading: false,
        //         error: action.payload,
        //     };

        default:
            return{...state};
    };
};

export default rootReducer;