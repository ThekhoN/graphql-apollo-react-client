import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries";
import BookDetails from "../book-details";

class BookList extends Component {
  state = {
    selectedId: null
  }
  updateSelected = (id) => {
    console.log("id: ", id)
    this.setState({
      selectedId: id
    });
  }
  renderBooks = () => {
    const { data } = this.props;
    if (!data.loading) {
      return (
        <ul>
          {data.books.map(book => (
            <li key={book.id} onClick={() => this.updateSelected(book.id)}>
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
        <BookDetails id={this.state.selectedId}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
