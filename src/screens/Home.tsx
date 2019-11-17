import React from 'react';
import { RouteComponentProps } from '@reach/router';

import TodoList from 'components/TodoList';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};

export default Home;
