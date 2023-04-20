import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, SUCCESS, ERRORREQUEST, REQUEST, SET_PAGE, SEARCH_CHARACTER, SEARCH_CHARACTER_SUCCESS, SEARCH_CHARACTER_ERROR, REMOVE_CARD, ADD_MESSAGE, } from "../Action-types/actions-types"

const initialState = {
    myFavorites: [], //los personajes fav
    allCharacters: [], //todos los personajes fav
    isLoading: false,
    error: null,
    characters: [], //aca estan los personajes del comp Characters
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 1,
    searchResults: [], //resultados de la busqueda
    messages: [],
    // characterDetail: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return{
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
            };

        case REMOVE_FAV:
            return{
                ...state,
                myFavorites: state.myFavorites.filter(character => character.id !== action.payload),
            };

            case FILTER:
                const allCharactersFiltered = state.allCharacters.filter(character => character.gender === action.payload)
                return {
                    ...state,
                    myFavorites: action.payload === 'allCharacters' ? [...state.allCharacters]
                        : allCharactersFiltered
                }

        case ORDER:
            const copyAllCharacters = [...state.allCharacters];
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

        case SET_PAGE:
            return{
                ...state,
                currentPage: action.payload
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
                messages: [...state, action.payload]
            };

        default:
            return{...state};
    };
};

export default rootReducer;