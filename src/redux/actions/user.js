import { SET_USER, SET_LOGOUT} from '../actionTypes'

export const setUser = user => ({
  type: SET_USER,
  payload: { user },
})

export const setLogout = () => ({ 
  type: SET_LOGOUT,
})
