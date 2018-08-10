import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import "./style.css";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../../queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };
  renderAuthorsSelect = () => {
    const { getAuthorsQuery } = this.props;
    if (!getAuthorsQuery.loading) {
      return (
        <React.Fragment>
          {getAuthorsQuery.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </React.Fragment>
      );
    } else {
      return <option disabled>Loading...</option>;
    }
  };
  updateName = e => {
    this.setState({
      name: e.target.value
    });
  };
  updateGenre = e => {
    this.setState({
      genre: e.target.value
    });
  };
  updateAuthorId = e => {
    console.log("authorId: ", e.target.value);
    this.setState({
      author: e.target.value
    });
  };
  addBooksQueryHandler = () => {
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };
  handleAddBookSubmit = e => {
    e.preventDefault();
    const { authorId } = this.state;
    if (!authorId) {
      this.setState(
        {
          authorId: this.props.getAuthorsQuery.authors[0].id
        },
        () => {
          this.addBooksQueryHandler();
        }
      );
    } else {
      this.addBooksQueryHandler();
    }
  };
  render() {
    return (
      <div>
        <h3>Add Book:</h3>
        <form onSubmit={this.handleAddBookSubmit}>
          <div className="form__row">
            <label>
              <span>Name: </span>
              <input type="text" onChange={this.updateName} />
            </label>
          </div>
          <div className="form__row">
            <label>
              <span>Author: </span>
              <select onChange={this.updateAuthorId}>
                {this.renderAuthorsSelect()}
              </select>
            </label>
          </div>
          <div className="form__row">
            <label>
              <span>Genre: </span>
              <input type="text" onChange={this.updateGenre} />
            </label>
          </div>
          <div className="form__row">
            <button type="submit">Add Book</button>
          </div>
        </form>
      </div>
    );
  }
}

// single query binding
// export default graphql(getAuthorsQuery)(AddBook);

// composing multiple queries
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
