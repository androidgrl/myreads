import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Books from './Books'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" render={() => (
          <Books books={this.state.books}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
