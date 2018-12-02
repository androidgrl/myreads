import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
  state = {
    books: [],
    query: '',
    validQueries: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
  }

  searchBooks = (q) => {
    const query = q.trim()
    if (this.state.validQueries.indexOf(query) > -1) {
      let booksWithSelfAttributes = []
      BooksAPI.search(query).then((books) => {
        books.forEach((book) => {
          BooksAPI.get(book.id).then((book) => {
            booksWithSelfAttributes.push(book)
            this.setState( {books: booksWithSelfAttributes} )
          })
        })
        this.setState({ query })
      })
    }
  }

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
