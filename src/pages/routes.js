import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from './home'
import SignIn from './sign-in'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    )
  }
}
