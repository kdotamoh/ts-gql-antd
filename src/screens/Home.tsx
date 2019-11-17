import React from 'react';
import { RouteComponentProps } from '@reach/router';

import TodoList from 'components/TodoList';
import AddTodo from 'components/AddTodo';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <TodoList />
      <AddTodo />
    </div>
  );
};

export default Home;
