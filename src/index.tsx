import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import 'antd/dist/antd.css';
import './index.css';

// TODO: use babel-plugin-import to remove unused antd packages

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_BASE_URI}`
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
