import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
  state = {
    books: [],
    query: '',
  }

  // If the query is valid, then call the search function, since the search function does not return shelf attributes,
  // for each book call the get function which does have shelf attributes, put the books in an array and display them
  searchBooks = (q) => {
    const query = q.trim()
    let booksWithShelfAttributes = []
    if (!query) {
      this.setState( {books: []} )
    } else {
      BooksAPI.search(query).then((books) => {
        books.forEach((book) => {
          BooksAPI.get(book.id).then((book) => {
            booksWithShelfAttributes.push(book)
            this.setState( {books: booksWithShelfAttributes} )
          })
        })
        this.setState({ query })
      }).catch(() => this.setState( {books: []} ) )
    }
  }

  // Update the shelf attribute for the selected book
  selectBook(shelf, book) {
    BooksAPI.update(book, shelf)
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
            <Shelf books={this.state.books} onSelectBook={(shelf, book) => this.selectBook(shelf, book)}/>
          </div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

export default Search;
