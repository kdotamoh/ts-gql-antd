import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { Card } from 'antd';

import { GET_TODO } from 'queries';
import Todo from 'components/Todo';
import AddTodo from 'components/AddTodo';

export type Props = RouteComponentProps<{ id: string }>;

const ViewTodo: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_TODO, { variables: { id } });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Card title="View todo">
      <Todo id={data.todo.id} type={data.todo.type} />
      <div className="mb-3rem" />
      <AddTodo isEditing={true} id={data.todo.id} />
    </Card>
  );
};

export default ViewTodo;
