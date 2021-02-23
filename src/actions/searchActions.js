import {FETCH_MOVIE ,SEARCH_MOVIE, FETCH_MOVIES, LOADING, CHANGE_PAGE, FETCH_ALL_MOVIES, EMPTY_ALL_MOVIES, SORT_ALL_MOVIES} from './types'
import axios from 'axios';
const APIKey = process.env.REACT_APP_APIKEY;

export const searchMovie = text => dispatch =>{
    dispatch({
        type: SEARCH_MOVIE,
        payload: text
    })
}

export const fetchMovies = (text,page) => dispatch => {
    return axios
    .get('https://www.omdbapi.com/?apikey=' + APIKey + "&s=" + text + "&page=" + page)
    .then( response =>
        dispatch({
            type: FETCH_MOVIES,
            payload: response.data
        })
    )
    .catch(err => console.log(err))
}

export const fetchMovie = imdbID => dispatch => {
    axios
        .get('https://www.omdbapi.com/?apikey=' + APIKey + "&i=" + imdbID)
        .then(response =>
            dispatch({
                type: FETCH_MOVIE,
                payload: response.data
            })
        )
        .catch(err => console.log(err))
}

export const setLoading = () =>{
    return {
        type:LOADING
    }
}

export const changePage = page => dispatch =>{
    dispatch({
        type:CHANGE_PAGE,
        payload: page
    })
}

export const fetchAllMovies = (text,page) => dispatch => {
    return axios
    .get('https://www.omdbapi.com/?apikey=' + APIKey + "&s=" + text + "&page=" + page)
    .then( response =>
        dispatch({
            type: FETCH_ALL_MOVIES,
            payload: response.data
        })
    )
    .catch(err => console.log(err))
}

export const emptyAllMovies = () => {
    return {
        type:EMPTY_ALL_MOVIES
    }
}

export const sortAllMovies = () => {
    return {
        type:SORT_ALL_MOVIES
    }
}