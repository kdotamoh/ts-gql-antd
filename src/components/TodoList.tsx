import React from 'react';
import { Link } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import Todo from 'components/Todo';
import { GET_TODOS } from 'queries';

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      {data.todos.length ? (
        data.todos.map((todo: { id: string; type: string }) => (
          <React.Fragment key={todo.id}>
            <Todo id={todo.id} type={todo.type} />
            <Link to={`/todo/${todo.id}`}>View todo</Link>
          </React.Fragment>
        ))
      ) : (
        <div>No todos</div>
      )}
    </div>
  );
};

export default TodoList;
