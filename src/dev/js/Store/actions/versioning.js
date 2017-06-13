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
  SEND_VERSION_FAILURE,
  COMMIT_INFO_REQUEST,
  COMMIT_INFO_SUCCESS,
  COMMIT_INFO_FAILURE,
  GET_FILE_ID
} from '../type_actions'

import {URL_API, URL_DROPBOX} from './var'
import {DROPBOX_API_KEY} from './keys.protected'
import {didLostSession} from './connection'
import {addError, TN} from './notification'

const electron = window.require('electron')
const fs = electron.remote.require('fs')
const AdmZip = electron.remote.require('adm-zip')

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

function requestCommitInfo(){
  return {
    type: COMMIT_INFO_REQUEST
  }
}

function receiveCommitInfo(commits, version, isInitiated){
  return {
    type: COMMIT_INFO_SUCCESS,
    version: version,
    commits: commits,
    isInitiated: isInitiated
  }
}

function commitInfoFailure(){
  return {
    type: COMMIT_INFO_FAILURE
  }
}

function getFileId(id){
  return {
    type: GET_FILE_ID,
    stream_file_id: id
  }
}

function getFileInfo(file, stream_id){
  const format = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.lenght)
  const name = file.name.substring(0, file.name.lastIndexOf('.'))

  const fileInfo = {
    stream_id: stream_id,
    path: file.path,
    format: format,
    name: name
  }

  localStorage.setItem('liveup_file', JSON.stringify(fileInfo))

  return fileInfo
}

function getFileInfoFromLocalStorage(){
  return dispatch => {
    const fileInfo = JSON.parse(localStorage.getItem('liveup_file'))
    const stream_file_id = localStorage.getItem('liveup_file_id')
    dispatch(getFileId(stream_file_id))
    dispatch(selectFile(fileInfo))
  }
}

function uploadDropbox(file, version, successCallback){
  const {stream_id, format, name, path} = file
  // const zip = new AdmZip()
  // zip.addLocalFile(path)
  // const SUPER_DATA = zip.toBuffer()
  // console.log(SUPER_DATA)
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
                dispatch(addError(TN.DROPBOX_FAILURE, "Une érreur s'est produite avec l'upload"))
                // errorCallback()
                return Promise.reject(content)
              } else {
                dispatch(dropboxSuccess(content))
                dispatch(successCallback())
              }
            }).catch(err => dispatch(addError(TN.DROPBOX_FAILURE, "Une érreur s'est produite avec l'upload")))

      } else {
        dispatch(addError(TN.READFILE_FAILURE, "Une érreur s'est produite avec le fichier"))
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
          dispatch(addError(TN.INIT_FILE_FAILURE, "Une érreur s'est produite"))
          return Promise.reject(content)
        } else {
          localStorage.setItem('liveup_file_id', content.id)
          dispatch(initSuccess(content))
        }
      }).catch(err => dispatch(addError(TN.INIT_FILE_FAILURE, "Une érreur s'est produite")))
  }
}

export function initFile(stream_id, file) {
  return dispatch => {
    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    const fileInfo = getFileInfo(file, stream_id)
    const {format, name} = fileInfo

    if (!token || !email){
      dispatch(didLostSession())
      return false
    }

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
    dispatch(uploadDropbox(fileInfo, 0, initApiCallRef))
  }
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
      }).catch(err => dispatch(sendVersionFailure()))
  }
}


export function commitFile(file, version, stream_file_id, commit_message) {

  return dispatch => {

    const token = localStorage.getItem('liveup_authentication_token')
    const email = localStorage.getItem('liveup_email')

    if (!token || !email){
      dispatch(didLostSession())
      return false
    }
    
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
    dispatch(uploadDropbox(file, next_version, commitCallRef))
  }
}

export function getInfoCommit(stream_id){
  return dispatch => {
    const config = {
      method: 'GET'
    }

    dispatch(requestCommitInfo())
    return fetch(URL_API + '/api/v1/files/commit/index/' + stream_id, config)
      .then(response =>
        response.json().then(content => ({ content, response }))
            ).then(({ content, response }) =>  {
        if (!response.ok) {
          dispatch(commitInfoFailure())
          return Promise.reject(content)
        } else {
          let isInitiated = false
          let version = 0
          if (content.commits.length > 0){
            isInitiated = true
            version = content.commits.length - 1
          }
          dispatch(getFileInfoFromLocalStorage())
          dispatch(receiveCommitInfo(content.commits, version, isInitiated))
        }
      }).catch(err => dispatch(receiveCommitInfo([], false)))
  }
}

export function cleanVersioning(){
  return dispatch => {
    localStorage.removeItem('liveup_file')
    localStorage.removeItem('liveup_file_id')
    dispatch(endWatching())
  }
}
