import React, { Component } from 'react';
import './searchBook.css';
import ResultList from '../resultList/resultList';

class SearchBook extends Component {
  constructor(props) {
      super(props);
      this.state = {
        books: [],
        title: "",
        printType: "all",
        filter: "full"
      };
    }

    titleChanged(title) {
      this.setState({
        title
      });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {books,title,printType,filter} = this.state;
        const url =`https://www.googleapis.com/books/v1/volumes?q=${title}&printType=${printType}&filter=${filter}`;
        fetch(url)
          .then(res => {
            if(!res.ok) {
              throw new Error('Something went wrong, please try again later');
            }
            return res.json();
          })
          .then(data => {
            this.setState({
              books: data.totalItems>0 ? data.items : [],
              error: null
            });
            //console.log(this.state.books);
            //console.log(this.state.books.items[0].volumeInfo.title);
            //console.log(this.state.books.items[0].volumeInfo.authors);
            //console.log(this.state.books.items[0].volumeInfo.description);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
      }


  render() {

    return (
      <div className="searchBook">
      <h1> Google Book Search </h1>
      <form className="searchbook__form" onSubmit={e => this.handleSubmit(e)}>
     <div class="search">
      <label htmlFor="Search">Search:</label>
      <input
          type="text"
          name="search"
          id="search"
          placeholder="Book Title"
          value={this.state.title}
          onChange={e => this.titleChanged(e.target.value)} required />
      <button type="submit">Search</button>
 </div>
 <div class="filter">
      <label htmlFor="Print Type">Print Type</label>
      <select onChange={e=>this.setState({printType:e.target.value})} defaultValue={this.state.printType}>
        <option value="all">All</option>
        <option value="books">Book</option>
        <option value="magazines">Magazines</option>
      </select>

      <label htmlFor="Book Type" placeholder="No Filter">Book Type</label>
      <select onChange={e=>this.setState({filter:e.target.value})} defaultValue={this.state.filter}>
        <option value="full">Full</option>
        <option value="ebooks">eBooks</option>
        <option value="free-ebooks">Free eBooks</option>
        <option value="paid-ebooks">Paid eBooks</option>
        <option value="partial">Partial</option>
      </select>
</div>
      </form>
      <ResultList books={this.state.books} />
      </div>
    );
  }
}

SearchBook.defaultProps = {
  books: []
};

export default SearchBook;
