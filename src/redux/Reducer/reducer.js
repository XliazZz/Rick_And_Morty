import { ADD_FAV, REMOVE_FAV, FILTER, ORDER, GET_CHARACTERS, GET_CHARACTER_DETAIL, CLEAN_DETAIL, ONSEARCH } from "../Actions/actions";

const initialState = {
    myFavorites: [],
    allCharacters: [],
    // characters: [],
    // characterDetail: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return{
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
                allCharacters: [...state.allCharacters, action.payload],
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

        // case GET_CHARACTERS:
        //     return{
        //         ...state,
        //         character: action.payload
        //     }

        // case GET_CHARACTER_DETAIL:
        //     return{
        //         ...state,
        //         characterDetail: action.payload
        //     }

        // case CLEAN_DETAIL:
        //     return{
        //         ...state,
        //         characterDetail: {}
        //     }

        // case ONSEARCH:
        //     return{
        //         ...state,
        //         characters: [...state.characters, action.payload]
        //     }

        default:
            return{...state};
    };
};

export default rootReducer;