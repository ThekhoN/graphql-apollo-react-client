import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../../queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    const {book} = this.props.data;
    if(book) {
      return (
        <div>
          <h2>Name: {book.name}</h2>
          <h3>Genre: {book.genre}</h3>
          <h4>Author: {book.author.name}</h4>
        </div>
      )
    } else {
      return (<div>Please select a book!</div>)
    }
  }
  renderBooks = () => {
    const { data } = this.props;
    if (!data.loading) {
      return (
        <ul>
          {data.books.map(book => (
            <li key={book.id}>
              <p className="book-list__name">{book.name}</p>
              <p className="book-list__genre">{book.genre}</p>
            </li>
          ))}
        </ul>
      );
    } else {
      return <div>Loading...</div>;
    }
  };
  render() {
    console.log("this.props: ", this.props);
    return (
      <div className="book-details">
        <h2>Book Details:</h2>
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id
      }
    }
  }
})(BookDetails);
