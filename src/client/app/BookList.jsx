import React from 'react';

var BookList = React.createClass({

  getInitialState(){
    return (
    { books: [
      { name: 'Zero to One', author: 'Peter Thiel' },
      { name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
      { name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
    ],
      selectedBooks: [],
      errors: false
    }
    );
  },

  _renderBook(book){
    return(
        <div className="checkbox">
          <label>
            <input type="checkbox" value={book.name} onChange={this._handleBookSelection} /> {book.name} -- {book.author}
          </label>
        </div>
    );
  },

  _handleBookSelection(event){
    var selectedBooks = this.state.selectedBooks;
    var bookIndex = selectedBooks.indexOf(event.target.value);
    if (event.target.checked) {
      if (bookIndex == -1)
        selectedBooks.push(event.target.value);
    } else {
      selectedBooks.splice(bookIndex, 1);
    }
    return this.setState({selectedBooks: selectedBooks});
  },

  _handleSubmit(event){
    event.preventDefault();
    if (this.state.selectedBooks.length == 0) {
      this.setState({error: 'Please select at least one book'});
    } else {
      this.setState({error: false});
      this.props.submitHandler();
    }
  },

  _renderError(){
    if(this.state.error){
      return(
          <div className="alert alert-danger">
            {this.state.error}
          </div>
      );
    }
  },

  render(){
    var errorMessage = this._renderError();
    return(
        <div>
          <h3>
            Choose from wide variety of books available in our store.
          </h3>
          <form  onSubmit={this._handleSubmit}>
            {errorMessage}
            {this.state.books.map((book) => { return this._renderBook(book); })}
            <br/><br/>
            <h4>You have selected following books</h4>
            {this.state.selectedBooks.map((bookName) => {
              return (
                  <label>
                    {bookName}
                  </label>
              );
            })}
            <input type="submit" className="btn btn-success" />
          </form>
        </div>
    );
  }

});

export default BookList;
