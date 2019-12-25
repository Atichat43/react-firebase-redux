import React, { Component } from 'react';
import { connect } from "react-redux";
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { FirebaseAuth } from 'react-firebaseui';
import { isEmpty, isNull } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  Form,
} from 'react-bootstrap';

import { setLogout, setUser } from "./redux/actions";
import { config } from './firebase.config';

import 'react-toastify/dist/ReactToastify.css';
import './sign-in-page.scss';

firebase.initializeApp(config);

class SignInPage extends Component {
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
    callbacks: {
      signInSuccessWithAuthResult: () => console.log('when')
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  };

  // LIFE CYCLE
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      response => {
        console.log('onAuthStateChanged')

        this.setUser(response)
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  // RENDER METHOD
  generateSignInForm = () => {
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

  handleSignOut = event => {
    const { setLogout } = this.props

    event.preventDefault()
    firebase.auth().signOut();
    setLogout()
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
    const { user } = this.props

    return (
      <div>
        {user.authenticated
          ? (
            <div>
              <p>Welcome {user.firstName} {user.lastName}! You are now signed-in!</p>
              <Button
                variant="outline-secondary"
                onClick={this.handleSignOut}
                size="sm"
              >
                Sign-out
          </Button>
            </div>
          )
          : (
            <div>
              {this.generateSignInForm()}
            </div>
          )
        }
        <ToastContainer />
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
