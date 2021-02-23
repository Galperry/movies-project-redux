import {SEARCH_MOVIE, FETCH_MOVIE, FETCH_MOVIES, LOADING, CHANGE_PAGE, FETCH_ALL_MOVIES, EMPTY_ALL_MOVIES, SORT_ALL_MOVIES} from '../actions/types';

const initialState = {
    text: '',
    allMovies: [],
    movies: [],
    page:1,
    loading: false,
    movie: []
}

export default function(state = initialState , action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                text: action.payload,
                loading: false
            }

        case FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
            }

        case FETCH_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            }

        case LOADING:
            return {
                ...state,
                loading:true
            }

        case CHANGE_PAGE:
            switch (action.payload){
                case "next":
                    return {...state, page:(state.page === Math.ceil(state.allMovies.length/10) ? state.page : state.page+1)}
                case "previous":
                    return {...state, page:(state.page > 1 ? state.page-1 : state.page)}
                default:
                    return {...state, page:action.payload}
            }

        case FETCH_ALL_MOVIES:
            let newArr = [...state.allMovies]
            for (let obj of action.payload.Search){
                newArr.push(obj)
            }
            return {
                ...state,
                allMovies: newArr,
                loading: false
            }

        case EMPTY_ALL_MOVIES:
            return {
                ...state,
                allMovies:[]
            }
        
        case SORT_ALL_MOVIES:
            let newAllMovies = [...state.allMovies]
            newAllMovies.sort((a,b) => {return (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0)})
            return {
                ...state,
                allMovies: newAllMovies
            }
            
        default:
            return state
    }
}
