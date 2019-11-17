import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Todo from 'components/Todo';
import { GET_TODOS } from 'queries';

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      {data.todos.length ? (
        data.todos.map((todo: { id: string; type: string }) => (
          <React.Fragment key={todo.id}>
            <Todo id={todo.id} type={todo.type} />
          </React.Fragment>
        ))
      ) : (
        <div>No todos</div>
      )}
    </div>
  );
};

export default TodoList;
