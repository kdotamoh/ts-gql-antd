import React from 'react';
import { Router } from '@reach/router';
import Home from 'screens/Home';
import ViewTodo from 'screens/ViewTodo';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Home path="/" />
          <ViewTodo path="/todo/:id" />
        </Router>
      </div>
    </div>
  );
};

export default App;
