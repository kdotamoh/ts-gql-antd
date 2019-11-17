import gql from 'graphql-tag';

const GET_TODOS = gql`
  query Todos {
    todos {
      id
      type
    }
  }
`;

export { GET_TODOS };
