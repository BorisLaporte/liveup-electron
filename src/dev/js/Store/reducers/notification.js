import {
  ADD_NOTIF,
  DEACTIVATE_NOTIF,
  DELETE_NOTIF
} from 'STORE/type_actions'

const initialState = {
  notif: [],
  id: 0
}

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIF:
      return Object.assign({}, state, {
        notif: state.notif.concat([{
            id: state.id,
            name: action.notif.name,
            kind: action.notif.kind,
            message: action.notif.message,
            active: true
          }]),
        id: state.id + 1
      })
    case DEACTIVATE_NOTIF:
      return Object.assign({}, state, {
        notif: state.notif.map((value) => {
          if (value.id == action.id){
            return {
              id: value.id,
              name: value.name,
              kind: value.kind,
              message: value.message,
              active: false
            }
          } else {
            return value
          }
        })
      })
    case DELETE_NOTIF:
      return Object.assign({}, state, {
        notif: state.notif.filter((value) => {return value.id != action.id})
      })
    default:
      return state
  }
}
