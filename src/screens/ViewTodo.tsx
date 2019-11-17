import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';

import { GET_TODO, UPDATE_TODO } from '../queries';
import Todo from '../components/Todo';

export type Props = RouteComponentProps<{ id: string }>;

const ViewTodo: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_TODO, { variables: { id } });
  const [type, setType] = useState('');
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODO, variables: { id } }]
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <React.Fragment>
      <Todo id={data.todo.id} type={data.todo.type} />
      <input
        onChange={(event): void => {
          setType(event.target.value);
        }}
      />
      <button
        onClick={(): Promise<ExecutionResult> =>
          updateTodo({ variables: { id, type } })
        }
      >
        Update todo
      </button>
    </React.Fragment>
  );
};

export default ViewTodo;
