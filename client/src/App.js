import React from 'react';
import Header from './components/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserHistory from './pages/UserHistory';
import Templates from './pages/Templates';

function App() {
  return (
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
  );
}

export default App;
