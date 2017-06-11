import {
  SELECT_FILE,
  REMOVE_FILE,
  START_WATCHING,
  END_WATCHING,
  DROPBOX_REQUEST,
  DROPBOX_SUCCESS,
  DROPBOX_FAILURE,
  INIT_REQUEST,
  INIT_SUCCESS,
  INIT_FAILURE,
  SEND_VERSION_REQUEST,
  SEND_VERSION_SUCCESS,
  SEND_VERSION_FAILURE
} from '../type_actions'

import {URL_API, URL_DROPBOX} from './var'

import {DROPBOX_API_KEY} from './keys.protected'

import {logoutUser} from './connection'

const electron = window.require('electron')
const fs = electron.remote.require('fs')

function selectFile(file) {
  return {
    type: SELECT_FILE,
    file: file
  }
}

function removeFile() {
  return {
    type: REMOVE_FILE,
    file: {}
  }
}

function startWatching() {
  return {
    type: START_WATCHING,
    isWatching: true
  }
}

export function endWatching() {
  return {
    type: END_WATCHING,
    isInitiated: false
  }
}

function dropboxRequest() {
  return {
    type: DROPBOX_REQUEST,
    isFetchingDropbox: true
  }
}

function dropboxSuccess(content) {
  return {
    type: DROPBOX_SUCCESS,
    isFetchingDropbox: false
  }
}

function dropboxFailure() {
  return {
    type: DROPBOX_FAILURE,
    isFetchingDropbox: false
  }
}

function initRequest() {
  return {
    type: INIT_REQUEST,
    isFetching: true
  }
}

function initSuccess(info) {
  return {
    type: INIT_SUCCESS,
    isFetching: false,
    stream_file_id: info.id,
    version: info.version,
    new_commit: info
  }
}

function initFailure() {
  return {
    type: INIT_FAILURE,
    isFetching: false
  }
}

function sendVersionRequest() {
  return {
    type: SEND_VERSION_REQUEST,
    isFetching: true
  }
}

function sendVersionSuccess(file) {
  return {
    type: SEND_VERSION_SUCCESS,
    isFetching: false,
    version: file.version,
    new_commit: file
  }
}

function sendVersionFailure() {
  return {
    type: SEND_VERSION_FAILURE,
    isFetching: false
  }
}

function getFileInfo(file, stream_id){
  const format = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.lenght)
  const name = file.name.substring(0, file.name.lastIndexOf('.'))

  return {
    stream_id: stream_id,
    path: file.path,
    format: format,
    name: name
  }
}

function uploadDropbox(file, version, successCallback){
  const {stream_id, format, name, path} = file
  console.log("DORPBOX !!!!!!!")
  return dispatch => {
    return fs.readFile(path, (err, data) => {
      if (!err) {
        const config_dropbox = {
          method: "POST",
          headers: {
            'Authorization': "Bearer "+DROPBOX_API_KEY,
            'Dropbox-API-Arg': "{\"path\": \"/"+stream_id+"/"+name+'-'+version+'.'+format+"\",\"mode\": \"add\",\"autorename\": true,\"mute\": true}",
            'Content-Type': 'application/octet-stream'
          },
          body: data
        }
          dispatch(dropboxRequest())
          return fetch(URL_DROPBOX, config_dropbox)
            .then(response => 
              response.json().then(content => ({ content, response }))
                  ).then(({ content, response }) =>  {
              if (!response.ok) {
                dispatch(dropboxFailure())
                // errorCallback()
                return Promise.reject(content)
              } else {
                dispatch(dropboxSuccess(content))
                dispatch(successCallback())
              }
            }).catch(err => console.log("Error: ", err))

      } else {
        console.log(err)
      }
    })
  }
}

function initApiCall(file, config){
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(selectFile(file))
    dispatch(initRequest())
    return fetch(URL_API + '/api/v1/files/create', config)
      .then(response => 
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {
        if (!response.ok) {
          dispatch(initFailure())
          return Promise.reject(content)
        } else {
          dispatch(initSuccess(content))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export function initFile(stream_id, file) {

  console.log("INIT FILE !!!!!!!!!!!!!!!")

  const token = localStorage.getItem('liveup_authentication_token')
  const email = localStorage.getItem('liveup_email')

  const fileInfo = getFileInfo(file, stream_id)
  const {format, name} = fileInfo

  const config_api = {
    method: 'POST',
    headers: { 
      'Content-Type':'application/json; charset=utf-8',
      'X-User-Email': email,
      'X-User-Token': token
    },
    body: JSON.stringify({
      file: {
        name: name,
        stream_id: stream_id, 
        format: format
      }
    })
  }

  const initApiCallRef = initApiCall.bind(null, fileInfo, config_api)
  return uploadDropbox(fileInfo, 0, initApiCallRef)

}

function commitCall(config) {
  return dispatch => {
    // if (!token || !email){
    //   dispatch(logoutUser())
    //   return false
    // }
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(sendVersionRequest())
    return fetch(URL_API + '/api/v1/files/commit', config)
      .then(response =>
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {
        if (!response.ok) {
          dispatch(sendVersionFailure())
          return Promise.reject(content)
        } else {
          dispatch(sendVersionSuccess(content))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


export function commitFile(file, version, stream_file_id, commit_message) {

  const token = localStorage.getItem('liveup_authentication_token')
  const email = localStorage.getItem('liveup_email')

  const next_version = version + 1

  const config = {
    method: 'POST',
    headers: { 
      'Content-Type':'application/json; charset=utf-8',
      'X-User-Email': email,
      'X-User-Token': token
    },
    body: JSON.stringify({
      file: {
        stream_file_id: stream_file_id,
        commit_message: commit_message
      }
    })
  }
  const commitCallRef = commitCall.bind(null, config)
  return uploadDropbox(file, next_version, commitCallRef)
}


