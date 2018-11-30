import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Books from './Books'
// import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )}/>
        <Route exact path="/" render={() => (
          <Books />
        )}/>
      </div>
    )
  }
}

export default BooksApp
