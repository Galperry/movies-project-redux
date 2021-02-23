import React, { Component } from 'react'
import {connect} from 'react-redux';

import {searchMovie, fetchMovies, setLoading, fetchAllMovies, emptyAllMovies} from '../../actions/searchActions'

class SearchForm extends Component {

    onChange = e =>{
        this.props.searchMovie(e.target.value)
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.props.fetchMovies(this.props.text, this.props.page)
        this.props.setLoading()

        await this.props.emptyAllMovies();

        for (let i = 1 ; i <= (Math.ceil(this.props.movies.totalResults/10)); i++){
          this.props.fetchAllMovies(this.props.text, i)
      }
    }

    render() {
        return (
        <div className="jumbotron jumbotron-fluid mt-5 text-center">
        <div className="container">
          <h1 className="display-4 mb-3">
            <i className="fa fa-search" /> Search for a movie ,TV series ..
          </h1>
          <form id="searchForm" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="form-control"
              name="searchText"
              placeholder="Search Movies, TV Series ..."
              onChange={this.onChange}
            />
            <button type="submit" className="btn btn-primary btn-bg mt-3">
              Search
            </button>
          </form>
        </div>
      </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.movies.text,
    page: state.movies.page,
    allMovies: state.movies.allMovies,
    movies: state.movies.movies
})

export default connect(mapStateToProps, {searchMovie, fetchMovies, setLoading, fetchAllMovies, emptyAllMovies})(SearchForm)
