import {
  requestLogin,
  receiveLogin,
  loginError,
  requestSignup,
  receiveSignup,
  signupError,
  requestLogout,
  receiveLogout,
  lostSession
} from './auth'

import {
  fillUser,
  emptyUser
} from './user'

import {URL_API} from './var'

import {endStream} from './stream'
import {endWatching} from './versioning'
// const url = 'https://the-dojo-api.herokuapp.com'

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(URL_API + '/api/v1/sessions', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_authentication_token', user.authentication_token)
          localStorage.setItem('liveup_email', user.email)
          // Dispatch the success action
          dispatch(fillUser(user))
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function signupUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({user: creds})
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup())

    return fetch(URL_API + '/api/v1/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(signupError())
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_authentication_token', user.authentication_token)
          localStorage.setItem('liveup_email', user.email)
          // Dispatch the success action
          dispatch(fillUser(user))
          dispatch(receiveSignup())
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {

  const token = localStorage.getItem('liveup_authentication_token')
  const email = localStorage.getItem('liveup_email')

  const config = {
    method: 'DELETE',
    headers: { 
      'X-User-Email': email,
      'X-User-Token': token
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogout())
    dispatch(endStream())
    dispatch(endWatching())
    dispatch(emptyUser())
    dispatch(receiveLogout())
    localStorage.removeItem('liveup_authentication_token')
    localStorage.removeItem('liveup_email')

    return fetch(URL_API + '/api/v1/sessions', config)
      .then(response => {
        console.log(response)
      }).catch(err => console.log("Error: ", err))
  }
}

export function getCredsFromLocalStorage(){
  return dispatch => {
    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      localStorage.removeItem('liveup_authentication_token')
      localStorage.removeItem('liveup_email')
      dispatch(lostSession())
      return false
    } else {
      return {
        token: token,
        email: email
      }
    }
  }
}

export function checkIfConnected() {
  const token = localStorage.getItem('liveup_authentication_token')
  const email = localStorage.getItem('liveup_email')

  if (!token || !email){
    console.log("not connected")
    return false
  }

  const config = {
    method: 'GET',
    headers: { 
      'X-User-Email': email,
      'X-User-Token': token
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    // dispatch(checkingUser())

    return fetch(URL_API + '/api/v1/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok){
          //ERRROR
        }
        dispatch(fillUser(user))
      }).catch(err => console.log("Error: ", err))
  }
}

