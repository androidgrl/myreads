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

  selectBook(shelf, bookId) {
    const index = this.state.books.findIndex((book) => book.id === bookId)
    const books = this.state.books
    books[index].shelf = shelf
    this.setState({ books })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )}/>
        <Route exact path="/" render={() => (
          <Books books={this.state.books} onSelectBook={(shelf, bookId) => this.selectBook(shelf, bookId)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
