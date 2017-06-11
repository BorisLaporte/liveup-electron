import {
  ADD_NOTIF,
  DEACTIVATE_NOTIF,
  DElETE_NOTIF
} from 'STORE/type_actions'

export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'
export const NEUTRAL = 'NEUTRAL'

export function addNotif(notif) {
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

export const NOTIF_IDS = {
  
}