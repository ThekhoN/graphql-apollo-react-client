import { gql } from "apollo-boost";

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;

export const addBookMutation = gql`
  mutation {
    addBook(name: "", genre: "", authorId: "") {
      name
      id
    }
  }
`;
