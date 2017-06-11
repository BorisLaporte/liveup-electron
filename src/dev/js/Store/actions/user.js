import {
  FILL_USER,
  EMPTY_USER
} from 'STORE/type_actions'

export function fillUser(creds) {
  return {
    type: FILL_USER,
    user: creds
  }
}

export function emptyUser() {
  return {
    type: EMPTY_USER
  }
}