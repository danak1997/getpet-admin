import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Index';
import '@fontsource/alef';
import ReportsPage from './pages/Reports';
import { useAuth } from './utils/auth';
import UserContext from './context/user';
import PetsPage from './pages/Pets';

function App() {
  const { user, setUser } = useAuth();

  const routes = user.loggedIn ? (
    <Switch>
      <Route path="/reports">
        <ReportsPage />
      </Route>
      <Route path="/pets">
        <PetsPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
  
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        {routes}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
