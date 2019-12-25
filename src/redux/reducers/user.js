import { SET_USER, SET_LOGOUT } from '../actionTypes'

export const initialState = {
  authenticated: false,
  email: 'your@example.com',
  firstName: 'Firstname',
  lastName: 'Lastname',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        authenticated: true,
      };
    case SET_LOGOUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
}
