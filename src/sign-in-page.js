import React, { Component } from 'react';
import { connect } from "react-redux";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { isEmpty } from 'lodash';

import { setLogout, setUser } from "./redux/actions";
import { config } from './firebase.config'

firebase.initializeApp(config);

class SignInPage extends Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  // LIFE CYCLE
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      response => {
        if (!isEmpty(response)) {
          const { setUser } = this.props
          const { displayName, email, photoURL } = response
          const [firstName, lastName] = displayName.split(' ')

          setUser({
            email,
            firstName,
            lastName,
            photoURL,
          })
        }
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleSignOut = () => {
    const { setLogout } = this.props

    firebase.auth().signOut();
    setLogout()
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <h1>My App</h1>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        {user.authenticated
          && <p>Welcome {user.firstName} {user.lastName}! You are now signed-in!</p>
        }
        <a onClick={this.handleSignOut}>Sign-out</a>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = {
  setLogout,
  setUser,
}

export default connect(mapState, mapDispatch)(SignInPage)
