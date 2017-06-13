import {
  requestLogin,
  receiveLogin,
  loginError,
  requestSignup,
  receiveSignup,
  signupError,
  requestBecomeStreamer,
  receiveBecomeStreamer,
  becomeStreamerError,
  requestLogout,
  receiveLogout,
  lostSession
} from './auth'

import {
  fillUser,
  emptyUser,
  fillChannel
} from './user'

import {CLEAN_STORE} from '../type_actions'

import {addError, addSuccess, TN} from './notification'

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
          dispatch(addError(TN.LOGIN_FAILED, "Votre identifiant ou mot de passe est incorrect"))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_authentication_token', user.authentication_token)
          localStorage.setItem('liveup_email', user.email)
          // Dispatch the success action
          dispatch(fillUser(user))
          dispatch(receiveLogin(user))
        }
      }).catch(err => dispatch(addError(TN.LOGIN_FAILED, "Votre identifiant ou mot de passe est incorrect")))
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
          dispatch(addError(TN.SIGNUP_FAILED, "Une érreur s'est produite"))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_authentication_token', user.authentication_token)
          localStorage.setItem('liveup_email', user.email)
          // Dispatch the success action
          dispatch(fillUser(user))
          dispatch(receiveSignup())
          dispatch(addSuccess(TN.SIGNUP_SUCCESS, "Votre compte vient d'être créer"))
        }
      }).catch(err => dispatch(addError(TN.SIGNUP_FAILED, "Une érreur s'est produite")))
  }
}

export function clearEverything(){
  return dispatch => {
    localStorage.clear()
    dispatch({type: CLEAN_STORE})

  }
}

// Logs the user out
export function logoutUser() {

  


  return dispatch => {

    // const token = localStorage.getItem('liveup_authentication_token')
    // const email = localStorage.getItem('liveup_email')

    // const config = {
    //   method: 'DELETE',
    //   headers: { 
    //     'X-User-Email': email,
    //     'X-User-Token': token
    //   }
    // }

    // if (!email || !token){
    //   return false
    // }
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogout())
    dispatch(receiveLogout())

    // return fetch(URL_API + '/api/v1/sessions', config)
    //   .then(response => {
    //     console.log(response)
    //     dispatch(receiveLogout())
    //   }).catch(err => console.log("Error: ", err))

    dispatch(clearEverything())
  }
}

export function didLostSession(){
  return dispatch => {
    dispatch(clearEverything())
    dispatch(addError(TN.LOST_SESSION, "Votre session a expirée"))
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

  return dispatch => {
    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      return false
    }

    const config = {
      method: 'GET',
      headers: { 
        'X-User-Email': email,
        'X-User-Token': token
      }
    }

    return fetch(URL_API + '/api/v1/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok){
          //ERRROR
        }
        dispatch(fillUser(user))
      }).catch(err => {
        dispatch(clearEverything())
        dispatch(addError(TN.SIGNUP_FAILED, "Votre session a expirée"))
      })
  }
}

export function becomeStreamer(channel){
  return dispatch => {
    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      return false
    }

    const config = {
      method: 'PUT',
      headers: { 
        'X-User-Email': email,
        'X-User-Token': token,
        'Content-Type': "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        user: {
          channel: channel
        }
      })
    }

    console.log(config)
    dispatch(requestBecomeStreamer())
    return fetch(URL_API + '/api/v1/users', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok){
          dispatch(addError(TN.SIGNUP_FAILED, "Ce channel n'est pas valide"))
        }
        dispatch(fillChannel(user.channel))
        console.log("SUPER USER")
        console.log(user)
        dispatch(receiveBecomeStreamer(user.channel))
        dispatch(addSuccess(TN.BECOME_STREAMER_SUCCESS, "Félicitation ! Vous êtes désormais un streamer"))
      }).catch(err => {
        dispatch(becomeStreamerError())
        dispatch(addError(TN.SIGNUP_FAILED, "Ce channel est déjà pris"))
      })
  }
}

