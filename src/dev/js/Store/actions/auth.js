import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOST_SESSION
} from 'STORE/type_actions'

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    authentication_token: user.authentication_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

export function receiveSignup() {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

export function signupError() {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false
  }
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function lostSession() {
  return {
    type: LOST_SESSION,
    isFetching: false,
    isAuthenticated: false
  }
}