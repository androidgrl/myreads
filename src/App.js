import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Books from './Books'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  selectBook(shelf, book) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )}/>
        <Route exact path="/" render={() => (
          <Books books={this.state.books} onSelectBook={(shelf, book) => this.selectBook(shelf, book)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
