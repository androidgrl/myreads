import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class Books extends React.Component {
  static propTypes ={
    books: PropTypes.array.isRequired,
    selectBook: PropTypes.func.isRequired
  }

  render() {
    const currentlyReadingBooks = this.props.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToReadBooks = this.props.books.filter((book) => book.shelf === 'wantToRead')
    const readBooks = this.props.books.filter((book) => book.shelf === 'read')

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
                  <Shelf books={object.books} onSelectBook={(shelf, book) => this.props.selectBook(shelf, book)}/>
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
