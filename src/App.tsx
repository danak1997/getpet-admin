import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import LoginPage from './pages/Login';
import '@fontsource/alef';
import ReportsPage from './pages/Reports';
import { useAuth } from './utils/auth';
import UserContext from './context/user';
import PetsPage from './pages/Pets';
import PetsContext, { Pet } from './context/pets';

function App() {
  const { user, setUser } = useAuth();
  const [pets, setPets] = useState<Pet[] | null>(null);

  const routes = user.loggedIn ? (
    <Switch>
      <Route path="/reports">
        <ReportsPage />
      </Route>
      <Route path="/" exact>
        <PetsPage />
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
      <PetsContext.Provider value={[pets, setPets]}>
        <Router>
          {routes}
        </Router>
      </PetsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
