import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card } from 'antd';

import TodoList from 'components/TodoList';
import AddTodo from 'components/AddTodo';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <AddTodo isEditing={false} id="" />
      <Card title="Your todos">
        <TodoList />
      </Card>
    </div>
  );
};

export default Home;
