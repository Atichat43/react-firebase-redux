import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom'
import {
  Jumbotron,
} from 'react-bootstrap';

import './home.scss'

export default class Home extends Component {
  // RENDER METHOD
  generateMenuBar = () => {
    const { authenticated } = this.props.user

    return (
      <div className="menu-bar">
        <li className="menu-bar-item">
          <NavLink
            className="nav-link"
            exact
            to="/"
          >
            Home
        </NavLink>
        </li>
        {authenticated
          ? (
            <li className="menu-bar-item">
              <NavLink
                className="nav-link"
                exact
                onClick={this.handleSignOut}
                to="/"
              >
                Sign out
              </NavLink>
            </li>
          )
          : (
            <li className="menu-bar-item">
              <NavLink
                className="nav-link"
                exact
                to="/signin"
              >
                Sign in
            </NavLink>
            </li>
          )}
      </div>
    )
  }

  // HANDLE METHOD
  handleSignOut = event => {
    const { setLogout, history } = this.props

    event.preventDefault()
    firebase.auth().signOut();
    setLogout()
    history.push('/signin')
  }

  render() {
    const { user } = this.props

    return (
      <div>
        {this.generateMenuBar()}
        {user.authenticated
          ? (
            <Jumbotron>
              <h1>Hello, world!</h1>
              <p>{user.firstName} {user.lastName} You are now signed-in!</p>
            </Jumbotron>
          )
          : <p> Please log in </p>
        }
      </div>
    )
  }
}
