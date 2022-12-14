import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserHistory from './pages/UserHistory';
import Templates from './pages/Templates';
import { TemplateProvider } from './utils/TemplateContext';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <TemplateProvider>
      <Router>
        <Header />
        <main className='App'>
          <Routes>
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/history'
              element={<UserHistory />}
            />
            <Route
              path='/'
              element={<Templates />}
            />
          </Routes>
        </main>
      </Router>
      </TemplateProvider>
    </ApolloProvider>
  );
}

export default App;