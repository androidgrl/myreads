import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Books extends React.Component {
  state = {
    books: [],
  }

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
    const currentlyReadingBooks = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToReadBooks = this.state.books.filter((book) => book.shelf === 'wantToRead')
    const readBooks = this.state.books.filter((book) => book.shelf === 'read')

    const headerToBooks = [
      {header: 'Currently Reading', books: currentlyReadingBooks},
      {header: 'Want to Read', books: wantToReadBooks},
      {header: 'Read', books: readBooks}
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf-books">
              {headerToBooks.map((object, index) => (
                <div key={index} className="bookshelf">
                  <h2 className="bookshelf-title">{object.header}</h2>
                  <Shelf books={object.books} onSelectBook={(shelf, book) => this.selectBook(shelf, book)}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link to="/search" className="open-search">
          <button>Add a book</button>
        </Link>
      </div>
    )
  }
}

export default Books;
