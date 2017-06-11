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
  BAD_CREDENTIALS: 'BAD_CREDENTIALS',
  MISSING_FIELDS: 'MISSING_FIELDS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOST_SESSION: 'LOST_SESSION',
  CREATE_STREAM_SUCCESS: 'CREATE_STREAM_SUCCESS',
  CREATE_STREAM_FAILURE: 'CREATE_STREAM_FAILURE',
  INIT_FILE_SUCCESS: 'INIT_FILE_SUCCESS',
  INIT_FILE_FAILURE: 'INIT_FILE_FAILURE',
  COMMIT_SUCCESS: 'COMMIT_SUCCESS',
  COMMIT_FAILURE: 'COMMIT_FAILURE',
}

