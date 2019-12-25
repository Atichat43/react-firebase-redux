import React from "react";
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import store from './redux/store';
import SignInPage from './sign-in-page';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/users">User</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about"><About /></Route>
            <Route path="/user"><User /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
};

function Home() {
  return <SignInPage />
}

function About() {
  return <h2>About</h2>;
}

function User() {
  return <h2>User</h2>;
}