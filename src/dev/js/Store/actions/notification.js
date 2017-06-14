import {
  ADD_NOTIF,
  DEACTIVATE_NOTIF,
  DELETE_NOTIF
} from 'STORE/type_actions'

export const ERROR = 'error'
export const SUCCESS = 'success'
export const NEUTRAL = 'neutral'

function addNotif(notif) {
  return {
    type: ADD_NOTIF,
    notif: notif
  }
}

export function deactivateNotif(id) {
  return {
    type: DEACTIVATE_NOTIF,
    id: id
  }
}

export function deleteNotif(id) {
  return {
    type: DELETE_NOTIF,
    id: id
  }
}

export function addError(name, message){
  return dispatch => {
    dispatch(addNotif({
      name: name,
      kind: ERROR,
      message: message,
    }))
  }
}

export function addSuccess(name, message){
  return dispatch => {
    dispatch(addNotif({
      name: name,
      kind: SUCCESS,
      message: message,
    }))
  }
}

export const TN = {
  MISSING_FIELDS: 'MISSING_FIELDS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILED: 'SIGNUP_FAILED',
  BECOME_STREAMER_SUCCESS: 'BECOME_STREAMER_SUCCESS',
  BECOME_STREAMER_FAILED: 'BECOME_STREAMER_FAILED',
  LOGOUT: 'LOGOUT',
  LOST_SESSION: 'LOST_SESSION',
  SUB_CAT_FAILURE: 'SUB_CAT_FAILURE',
  CREATE_STREAM_SUCCESS: 'CREATE_STREAM_SUCCESS',
  CREATE_STREAM_FAILURE: 'CREATE_STREAM_FAILURE',
  INIT_FILE_SUCCESS: 'INIT_FILE_SUCCESS',
  INIT_FILE_FAILURE: 'INIT_FILE_FAILURE',
  READFILE_FAILURE: 'READFILE_FAILURE',
  DROPBOX_FAILURE: 'DROPBOX_FAILURE',
  COMMIT_SUCCESS: 'COMMIT_SUCCESS',
  COMMIT_FAILURE: 'COMMIT_FAILURE',
  UPLOAD_STREAM_SUCCESS: 'UPLOAD_STREAM_SUCCESS',
  UPLOAD_STREAM_FAILURE: 'UPLOAD_STREAM_FAILURE',
}

