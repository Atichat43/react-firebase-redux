import React, { Component } from 'react';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { FirebaseAuth } from 'react-firebaseui';
import { toast } from 'react-toastify';
import { isEmpty, isNull } from 'lodash';
import {
  Button,
  Form,
} from 'react-bootstrap';

import { config } from '../../firebase.config';

import './sign-in.scss';

firebase.initializeApp(config);

export default class SignIn extends Component {
  state = {
    email: 'atichat.lap@test.com',
    password: 'password1234',
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    // callbacks: {},
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  };

  // LIFE CYCLE
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      response => {
        this.setUser(response)
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  // HANDLE EVENT
  handleSignIn = event => {
    const { email, password } = this.state

    event.preventDefault()
    firebase.auth().fetchSignInMethodsForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          this.notify('WARNING', 'Try alternative login.')
        } else if (providers.indexOf("password") === -1) {
          this.notify('WARNING', 'Try alternative login.')
        } else {
          return firebase.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then(response => {
        const { user } = response
        this.notify('SUCCESS', 'Sign in success');
        this.setUser(user)
      })
      .catch(error => {
        this.notify('ERROR', error.message);
      })
  }

  handleCreatAccount = event => {
    const { email, password } = this.state

    event.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        const { user } = response
        this.notify('SUCCESS', 'Creat an account success');
        this.setUser(user)
      })
      .catch(error => {
        this.notify('ERROR', error.message);
      })
  }

  // SIGN IN FORM
  handleOnChangeEmail = e => {
    const { value } = e.target

    this.setState(() => ({ email: value }))
  }

  handleOnChangePassword = e => {
    const { value } = e.target

    this.setState(() => ({ password: value }))
  }

  // UPDATE METHOD
  setUser = user => {
    if (isEmpty(user)) return

    const { displayName, email, photoURL } = user
    const [firstName, lastName] = isNull(displayName)
      ? ['', '']
      : displayName.split(' ')

    this.props.setUser({
      email,
      firstName,
      lastName,
      photoURL,
    })
    this.props.history.push('/')
  }

  // TOAST
  notify = (type, msg) => {
    const props = {
      autoClose: 3500,
      className: 'toast-sign-in-form',
      draggable: false,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      position: toast.POSITION.TOP_RIGHT,
    };

    switch (type) {
      case 'SUCCESS':
        toast.success(msg, { ...props });
        break;
      case 'ERROR':
        toast.error(msg, { ...props });
        break;
      case 'WARNING':
        toast.warn(msg, { ...props });
        break;
      default:
    }
  }

  dismissAll = () => toast.dismiss();

  render() {
    const { email, password } = this.state

    return (
      <Form className="sign-in-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleOnChangeEmail}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handleOnChangePassword}
            value={password}
          />
        </Form.Group>
        <Button
          onClick={this.handleSignIn}
          size="sm"
        >
          Sign-in
          </Button>
        <Button
          variant="link"
          onClick={this.handleCreatAccount}
          size="sm"
        >
          Creant account
          </Button>
        <Form.Text className="text-muted">DEBUG: {email} / {password}</Form.Text>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </Form>
    )
  }
}

