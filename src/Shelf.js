import React from 'react'
import PropTypes from 'prop-types'

class Shelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelectBook: PropTypes.func.isRequired
  }

  handleSelect = (event, book) => {
    const value = event.target.value
    this.props.onSelectBook(value, book)
  }

  render() {
    return (
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div> :
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundColor: 'grey'}}></div>}
                  <div className="book-shelf-changer">
                    <select onChange={(event) => this.handleSelect(event, book)} value={book.shelf ? book.shelf : 'none'}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors ? <div className="book-authors">{book.authors}</div> : <div className="book-authors">Unknown</div>}
              </div>
            </li>
          ))}
        </ol>
    )
  }
}

export default Shelf;
