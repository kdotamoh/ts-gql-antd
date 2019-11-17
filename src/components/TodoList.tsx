import React, { ReactNode } from 'react';
import { Link } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { List } from 'antd';

import Todo from 'components/Todo';
import { GET_TODOS } from 'queries';

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <List
        locale={{ emptyText: "You haven't added any todos." }}
        dataSource={data.todos}
        itemLayout="horizontal"
        renderItem={(todo: { id: string; type: string }): ReactNode => (
          <List.Item style={{ justifyContent: 'space-between' }} key={todo.id}>
            <Todo id={todo.id} type={todo.type} />
            <Link style={{ float: 'right' }} to={`/todo/${todo.id}`}>
              View
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
