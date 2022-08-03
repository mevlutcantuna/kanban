import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'antd/dist/antd.min.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = process.env.NODE_ENV !== 'development' ? 'http://localhost:8080/graphql' : 'https://kanban-graphql-server.herokuapp.com/graphql'

console.log(process.env.NODE_ENV)

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)