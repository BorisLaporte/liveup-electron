import {
  LOGING,
  LOG_SUCCESS,
  LOG_FAILURE,
  SIGNING_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  PASSWORD_REQUESTING,
  PASSWORD_FINISHED,
  LOGOUT
} from './actions'

export default function currentUserReducer(state = {
  user: {},
  token: {},
  errors: {},
  is_requesting: false
}, action) {
  switch (action.type) {
    case LOGING:
      return Object.assign({}, state, {
        is_requesting: true
      })
    case LOG_SUCCESS:
      return Object.assign({}, state, {
        is_requesting: false
      })
    case LOG_FAILURE:
      return Object.assign({}, state, {
        is_requesting: false
      })
    case SIGNING_UP:
      return Object.assign({}, state, {
        is_requesting: true
      })
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        is_requesting: false
      })
    case SIGN_UP_FAILURE:
      return Object.assign({}, state, {
        is_requesting: false
      })
    case PASSWORD_REQUESTING:
      return Object.assign({}, state, {
        is_requesting: true
      })
    case PASSWORD_FINISHED:
      return Object.assign({}, state, {
        is_requesting: false
      })
    case LOGOUT:
      return Object.assign({}, state, {
      })
    default:
      return state
  }
}