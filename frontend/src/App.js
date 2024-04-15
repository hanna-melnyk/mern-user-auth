import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
