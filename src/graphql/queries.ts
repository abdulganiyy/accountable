import { gql } from "@apollo/client";

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      email
      name
    }
  }
`;
