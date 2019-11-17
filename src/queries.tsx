import gql from 'graphql-tag';

const GET_TODOS = gql`
  query Todos {
    todos {
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

export { GET_TODOS, ADD_TODO };
