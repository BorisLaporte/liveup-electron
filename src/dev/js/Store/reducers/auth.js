import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_CONNECTED_REQUEST,
  CHECK_CONNECTED_SUCCESS,
  CHECK_CONNECTED_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  BECOME_STREAMER_REQUEST,
  BECOME_STREAMER_SUCCESS,
  BECOME_STREAMER_FAILURE,
  LOST_SESSION
} from 'STORE/type_actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function authReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('liveup_authentication_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case CHECK_CONNECTED_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CHECK_CONNECTED_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    case CHECK_CONNECTED_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case BECOME_STREAMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case BECOME_STREAMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    case BECOME_STREAMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    case LOST_SESSION:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
    default:
      return state
  }
}
