// import React from "react";
// import PortfolioContainer from "./components/PortfolioContainer";

// const App = () => <PortfolioContainer />;

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import UserHistory from './pages/UserHistory'

function App() {
  return (
    <Router>
            <main className="App">
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/history"
          element={<UserHistory />}
        />
      </Routes>


      </main>
    </Router>
  );
};

export default App;