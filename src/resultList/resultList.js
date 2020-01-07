import React, { Component } from 'react';
import './resultList.css';


class ResultList extends Component {

  render() {

  const displayBooks = this.props.books.length ? this.props.books.map(book => {
      return (
        <div>
      <h2>{book.volumeInfo.title}</h2>
<div className="book-details">
      <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Book-Cover" />
      <div className="details">
         {book.volumeInfo.hasOwnProperty('authors') ?  <p>Author:{book.volumeInfo.authors}</p> : ''}
          {book.saleInfo.hasOwnProperty('listPrice') ? <p>Price:${book.saleInfo.listPrice.amount}</p> : ''}
            <p className="description">{book.volumeInfo.description}</p>
            </div>
      </div>
      <hr />
        </div>
    )
  }) : 'No Books Found';


    return (
      <div className="resultList">
        <p>{displayBooks}</p>
      </div>
    );
  }
}

export default ResultList;
