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

  // After component renders get all the books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Update the book with the new shelf attribute, then request all the books from the database again and display them
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
        <Route path="/search" component={Search} />
        <Route exact path="/" render={() => (
          <Books books={this.state.books} selectBook={(shelf, book) => this.selectBook(shelf, book)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
