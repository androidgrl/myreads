import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Books from './Books'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Books} />
      </div>
    )
  }
}

export default BooksApp
