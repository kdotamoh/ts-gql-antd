import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { Card, Spin, Breadcrumb } from 'antd';

import { GET_TODO } from 'queries';
import Todo from 'components/Todo';
import AddTodo from 'components/AddTodo';

export type Props = RouteComponentProps<{ id: string }>;

interface Todo {
  id: string;
  type: string;
}

const ViewTodo: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_TODO, { variables: { id } });

  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <React.Fragment>
      <Breadcrumb separator="•" className="mb-3rem">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Todo</Breadcrumb.Item>
      </Breadcrumb>
      <Card title="View todo">
        {loading ? (
          <div className="loading-container">
            <Spin />
          </div>
        ) : (
          <React.Fragment>
            <div style={{ fontSize: '150%', textAlign: 'center' }}>
              <Todo
                data-testid="view-todo"
                id={data.todo.id}
                type={data.todo.type}
              />
            </div>
            <div className="mb-3rem" />
            <div className="add-todos__container">
              <AddTodo isEditing id={data.todo.id} />
            </div>
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ViewTodo;
