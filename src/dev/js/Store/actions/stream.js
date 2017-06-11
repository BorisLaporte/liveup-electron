import {
  CREATE_STREAM_REQUEST,
  CREATE_STREAM_SUCCESS,
  CREATE_STREAM_FAILURE,
  END_STREAM_REQUEST,
  END_STREAM_SUCCESS
} from '../type_actions'

import {URL_API} from './var'
import {initFile} from './versioning'
import {logoutUser} from './connection'

function createStreamRequest() {
  return {
    type: CREATE_STREAM_REQUEST,
    isFetching: true,
    isStreaming: false
  }
}

function receiveStream(stream) {
  return {
    type: CREATE_STREAM_SUCCESS,
    isFetching: false,
    isStreaming: true,
    stream: stream
  }
}

function streamError() {
  return {
    type: CREATE_STREAM_FAILURE,
    isFetching: false,
    isStreaming: false
  }
}

function endStreamRequest() {
  return {
    type: END_STREAM_REQUEST,
    isFetching: true
  }
}

function endStreamSuccess() {
  return {
    type: END_STREAM_SUCCESS,
    isFetching: false,
    isStreaming: false,
    stream: {}
  }
}


export function createStream(stream, file) {



  return dispatch => {

    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      dispatch(logoutUser())
      return false
    }

    const config = {
      method: 'POST',
      headers: { 
        'Content-Type':'application/json; charset=utf-8',
        'X-User-Email': email,
        'X-User-Token': token
      },
      body: JSON.stringify(stream)
    }
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(createStreamRequest())

    return fetch(URL_API + '/api/v1/streams', config)
      .then(response =>
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {
        if (!response.ok || content.id == null ) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(streamError())
          return Promise.reject(content)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_stream', content.id)
          // Dispatch the success action
          dispatch(receiveStream(content))
          if ( file !== null ) {
            console.log("DETECT THERE IS FILE")
            dispatch(initFile(content.id, file))
          }
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function getStreamInfo(channel) {

  const config = {
    method: 'GET'
  }

  return dispatch => {

    return fetch(URL_API + '/api/v1/streams/' + channel, config)
      .then(response =>
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {

        if (!response.ok || content.id == null) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(streamError())
          return Promise.reject(content)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_stream', content.id)
          // Dispatch the success action
          dispatch(receiveStream(content))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function endStream() {
  return dispatch => {
    localStorage.removeItem('liveup_stream')
    dispatch(endStreamSuccess())
  }
}


