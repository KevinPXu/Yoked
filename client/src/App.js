import React from 'react';
import Header from './components/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Login from './pages/Login';
import UserHistory from './pages/UserHistory';
import Templates from './pages/Templates';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <main className='App'>
          <Routes>
            <Route
              path='/'
              element={<Login />}
            />
            <Route
              path='/history'
              element={<UserHistory />}
            />
            <Route
              path='/templates'
              element={<Templates />}
            />
          </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
