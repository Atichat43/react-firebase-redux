import { SET_USER, SET_LOGOUT} from '../actionTypes'

export const setUser = user => ({
  type: SET_USER,
  user,
})

export const setLogout = () => ({ 
  type: SET_LOGOUT,
})
