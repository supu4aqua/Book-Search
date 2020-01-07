import React, { Component } from 'react';
import './App.css';

import ResultList from './resultList/resultList';
import SearchBook from './searchBook/searchBook';

class App extends Component {


render() {

  return (
    <div className='App'>
      <SearchBook />
    </div>
  );
  }
}

export default App;
