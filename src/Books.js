import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Books extends React.Component {
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
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <Shelf books={this.state.books} onSelectBook={(shelf, book) => this.selectBook(shelf, book)}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                </ol>
              </div>
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
