import { RESIZING, LANDSCAPE } from './actions'

export default function responsiveReducer(state = {
  width: 0,
  height: 0,
  orientation: LANDSCAPE
}, action) {
  switch (action.type) {
    case RESIZING:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
        orientation: action.orientation
      })
    default:
      return state
  }
}