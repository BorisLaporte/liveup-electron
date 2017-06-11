import {
  ADD_NOTIF,
  DEACTIVATE_NOTIF,
  DELETE_NOTIF
} from 'STORE/type_actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const initialState = {
  notif: []
}

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIF:
      return Object.assign({}, state, {
        notif: state.notif.push({
          id_name: action.notif.id_name,
          kind: action.notif.kind,
          message: action.notif.message,
          active: true
        })
      })
    case DEACTIVATE_NOTIF:
      return Object.assign({}, state, {
        
      })
    case DELETE_NOTIF:
      return Object.assign({}, state, {
        notif: state.notif.filter()
      })
    default:
      return state
  }
}
