import {
  FILL_USER,
  EMPTY_USER,
  FILL_CHANNEL
} from 'STORE/type_actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const initialState = {
  id: null,
  first_name: null,
  last_name: null,
  email: null,
  pseudo: null,
  avatar: null, // CREATE A DEFAULT ONE TODO
  live: false,
  channel: null,
  streams: []
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_USER:
      return Object.assign({}, state, {
        id: action.user.id,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        email: action.user.email,
        pseudo: action.user.pseudo,
        avatar: action.user.avatar, // CREATE A DEFAULT ONE TODO
        live: action.user.live,
        channel: action.user.channel,
        streams: action.user.streams
      })
    case FILL_CHANNEL:
      return Object.assign({}, state, {
        channel: action.channel
      })
    case EMPTY_USER:
      return Object.assign({}, state, {
        initialState
      })
    default:
      return state
  }
}
