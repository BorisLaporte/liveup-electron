import {
  CREATE_STREAM_REQUEST,
  CREATE_STREAM_SUCCESS,
  CREATE_STREAM_FAILURE,
  GET_INFO_STREAM_REQUEST,
  GET_INFO_STREAM_SUCCESS,
  GET_INFO_STREAM_FAILURE,
  END_STREAM_REQUEST,
  END_STREAM_SUCCESS,
  END_STREAM_FAILURE,
  UPLOAD_STREAM_REQUEST,
  UPLOAD_STREAM_SUCCESS,
  UPLOAD_STREAM_FAILURE
} from '../type_actions'

import {URL_API} from './var'
import {initFile, getInfoCommit, endWatching} from './versioning'
import {clearEverything, didLostSession} from './connection'
import {addError, addSuccess, TN} from './notification'

import {STATUS} from '../reducers/stream'

function createStreamRequest() {
  return {
    type: CREATE_STREAM_REQUEST
  }
}

function receiveStream(stream) {
  return {
    type: CREATE_STREAM_SUCCESS,
    stream: stream
  }
}

function streamError() {
  return {
    type: CREATE_STREAM_FAILURE
  }
}

function getInfoStreamRequest() {
  return {
    type: GET_INFO_STREAM_REQUEST
  }
}

function receiveInfoStream(stream) {
  return {
    type: GET_INFO_STREAM_SUCCESS,
    stream: stream
  }
}

function streamInfoError() {
  return {
    type: GET_INFO_STREAM_FAILURE
  }
}

function endStreamRequest() {
  return {
    type: END_STREAM_REQUEST
  }
}

function endStreamSuccess() {
  return {
    type: END_STREAM_SUCCESS,
    stream: {}
  }
}

function endStreamError() {
  return {
    type: END_STREAM_FAILURE,
    stream: {}
  }
}

function uploadStreamRequest() {
  return {
    type: UPLOAD_STREAM_REQUEST
  }
}

function streamUploaded() {
  return {
    type: UPLOAD_STREAM_SUCCESS
  }
}

function streamUploadError() {
  return {
    type: UPLOAD_STREAM_FAILURE
  }
}


export function createStream(stream, file) {



  return dispatch => {

    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      dispatch(didLostSession())
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
          if (content.errors){
            dispatch(addError(TN.CREATE_STREAM_FAILURE, "Une érreur s'est produite : " + content.erros[0]))
          } else {
            dispatch(addError(TN.CREATE_STREAM_FAILURE, "Une érreur s'est produite"))
          }
          return Promise.reject(content)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('liveup_stream_id', content.id)
          localStorage.setItem('liveup_stream_status', STATUS.STREAMING)
          // Dispatch the success action
          dispatch(receiveStream(content))
          if ( file !== null ) {
            dispatch(initFile(content.id, file))
          }
        }
      }).catch(err => dispatch(addError(TN.CREATE_STREAM_FAILURE, "Une érreur s'est produite")))
  }
}

export function getStreamInfo(channel, getCommit = false) {

  const config = {
    method: 'GET'
  }

  return dispatch => {

    dispatch(getInfoStreamRequest())
    return fetch(URL_API + '/api/v1/streams/' + channel, config)
      .then(response =>
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {

        if (!response.ok || content.id == null) {
          localStorage.removeItem('liveup_stream_id')
          localStorage.removeItem('liveup_stream_status')
          dispatch( receiveInfoStream() ) 
          dispatch(addError(TN.CREATE_STREAM_FAILURE, "Une érreur s'est produite"))
          return Promise.reject(content)
        } else {
          if (getCommit){
            dispatch(getInfoCommit(content.id))
          }
          // Dispatch the success action
          dispatch(receiveInfoStream(content))
        }
      }).catch(err => dispatch(addError(TN.CREATE_STREAM_FAILURE, "Une érreur s'est produite")))
  }
}

export function endStream(stream_id) {
  return dispatch => {

    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      dispatch(didLostSession())
      return false
    }

    const config = {
      method: 'DELETE',
      headers: {
        'X-User-Email': email,
        'X-User-Token': token
      }
    }
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(endStreamRequest())

    return fetch(URL_API + '/api/v1/streams/' + stream_id, config)
      .then(response => {
        
        localStorage.setItem('liveup_stream_status', STATUS.FINISHED)
        dispatch(endStreamSuccess())

      }).catch(err => console.log("Error: ", err))
  }
}

export function uploadStream() {
  return dispatch => {

    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      dispatch(didLostSession())
      return false
    }

    dispatch(uploadStreamRequest())
    dispatch(endWatching())

    localStorage.removeItem('liveup_stream_id')
    localStorage.removeItem('liveup_stream_status')
    localStorage.removeItem('liveup_file')
    localStorage.removeItem('liveup_file_id')
    dispatch(streamUploaded())
  }
}
