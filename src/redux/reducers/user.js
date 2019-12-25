import { SET_USER, SET_LOGOUT } from '../actionTypes'

export const initialState = {
  authenticated: false,
  email: null,
  firstName: null,
  lastName: null,
  photoURL: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload

      return {
        ...state,
        ...user,
        authenticated: true,
      };
    }
    case SET_LOGOUT: {
      return {
        ...initialState,
        authenticated: false,
      };
    }
    default:
      return state;
  }
}
