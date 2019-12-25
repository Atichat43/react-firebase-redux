import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SignIn from './sign-in'

import {
  setUser,
  setLogout,
} from '../../redux/actions'

const mapState = state => ({
  user: state.user,
})

const mapDispatch = {
  setUser,
  setLogout,
}

export default connect(
  mapState,
  mapDispatch,
)(withRouter(SignIn))
