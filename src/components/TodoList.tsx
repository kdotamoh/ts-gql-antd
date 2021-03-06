import React, { ReactNode } from 'react';
import { Link } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { List, Spin } from 'antd';

import Todo from 'components/Todo';
import { GET_TODOS } from 'queries';

interface Todo {
  id: string;
  type: string;
}
interface Todos {
  todos: Todo[];
}

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery<Todos>(GET_TODOS);

  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      {!data || loading ? (
        <div className="loading-container">
          <Spin />
        </div>
      ) : (
        <List
          locale={{ emptyText: "You haven't added any todos." }}
          dataSource={data.todos}
          itemLayout="horizontal"
          renderItem={(todo: { id: string; type: string }): ReactNode => (
            <List.Item
              style={{
                justifyContent: 'space-between',
                opacity: todo.id === 'optimistic' ? '45%' : '100%'
              }}
              key={todo.id}
            >
              <div>
                <Todo id={todo.id} type={todo.type} />
              </div>
              <Link
                style={{ float: 'right' }}
                to={todo.id === 'optimistic' ? '/' : `/todo/${todo.id}`}
              >
                View
              </Link>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TodoList;
