import React from 'react';
import { Router } from '@reach/router';
import Home from 'screens/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
      </Router>
    </div>
  );
};

export default App;
