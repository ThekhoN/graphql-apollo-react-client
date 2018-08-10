import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import BookList from "./components/book-list";
import AddBook from "./components/add-book";
import { ApolloProvider } from "react-apollo";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql?"
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>GraphQL React App</h1>
        <ApolloProvider client={client}>
          <BookList />
          <AddBook />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
