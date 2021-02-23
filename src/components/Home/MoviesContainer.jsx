import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieCard from './MovieCard'
import {changePage, fetchMovies, setLoading, fetchAllMovies, sortAllMovies} from '../../actions/searchActions'

class MoviesContainer extends Component {
    onClickNumber = async (e) =>{
        await this.props.changePage(e.target.value)
        this.props.fetchMovies(this.props.text, this.props.page)
        this.props.setLoading()
    }

    onClickNext = async() =>{
        await this.props.changePage("next")
        this.props.fetchMovies(this.props.text, this.props.page)
        this.props.setLoading()
    }

    onClickPrevious = async() =>{
        await this.props.changePage("previous")
        this.props.fetchMovies(this.props.text, this.props.page)
        this.props.setLoading()
    }

    onClickSort = () =>{
        this.props.sortAllMovies()
    }

    render() {
        const movies = this.props.movies

        let content = ''
        let page = ''
        let sorting =''

        content = (this.props.allMovies[0]) ? this.props.allMovies.slice((this.props.page-1) * 10, (this.props.page * 10)).map((movie, index) => (
                <MovieCard key={index} movie={movie}/>
        )) : null

        page = (content? 
            <div className="w-100 text-center">
                <button onClick={this.onClickPrevious} className="btn btn-danger m-1">Previous</button>
                {(Array(Math.ceil(this.props.allMovies.length / 10)).fill(0)).map((element,index) =>{
                return <button key={index+1} value={index+1} onClick={this.onClickNumber} className="btn btn-primary m-1">{index+1}</button>
                })}
                <button onClick={this.onClickNext} className="btn btn-danger m-1">Next</button>
            </div> : null)

        sorting = (content? <div><button onClick={this.onClickSort} className="my-2 btn btn-success">Sort Alphabetically</button></div>:null)

        return (
            <div>
                {sorting}
                <div className="row">
                    {content}
                    {page}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.movies.text,
    movies: state.movies.movies,
    page: state.movies.page,
    allMovies: state.movies.allMovies
})

export default connect(mapStateToProps, {changePage, fetchMovies, setLoading, fetchAllMovies, sortAllMovies})(MoviesContainer)
