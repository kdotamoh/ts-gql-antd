import gql from 'graphql-tag';

const GET_TODOS = gql`
  query Todos {
    todos {
      id
      type
    }
  }
`;

const GET_TODO = gql`
  query Todo($id: String!) {
    todo(id: $id) {
      id
      type
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

export { GET_TODOS, GET_TODO, ADD_TODO, UPDATE_TODO };
