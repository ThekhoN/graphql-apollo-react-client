import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries";

class BookList extends Component {
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
    return (
      <div className="book-list">
        <h2>Books:</h2>
        {this.renderBooks()}
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
