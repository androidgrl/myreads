import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    selectBook: PropTypes.func.isRequired
  }

  state = {
    searchingBooks: [],
  }

  // If the query is valid, then call the search function, since the search function does not return shelf attributes,
  // For each book that has a shelf state, update the state in the books displayed
  searchBooks = (q) => {
    const query = q.trim()
    if (!query) {
      this.setState( {searchingBooks: []} )
    } else {
      BooksAPI.search(query).then((booksWithoutShelf) => {
        const booksWithShelf = this.props.books
        booksWithoutShelf.forEach((bookWithout) => {
          booksWithShelf.forEach((bookWith) => {
            if (bookWith.id === bookWithout.id) {
              bookWithout.shelf = bookWith.shelf
            }
          })
        })
        this.setState( {searchingBooks: booksWithoutShelf} )
      }).catch(() => this.setState( {searchingBooks: []} ) )
    }
  }

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search"></Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <Shelf books={this.state.searchingBooks} onSelectBook={(shelf, book) => this.props.selectBook(shelf, book)}/>
          </div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default Search;
