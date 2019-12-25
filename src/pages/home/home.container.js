import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Home from './home'

import {
  setLogout,
} from '../../redux/actions'

const mapState = state => ({
  user: state.user,
})

const mapDispatch = {
  setLogout,
}

export default connect(
  mapState,
  mapDispatch,
)(withRouter(Home))
