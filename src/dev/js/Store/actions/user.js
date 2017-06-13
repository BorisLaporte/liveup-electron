import {
  FILL_USER,
  EMPTY_USER,
  FILL_CHANNEL
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

export function fillChannel(channel) {
  return {
    type: FILL_CHANNEL,
    channel: channel
  }
}