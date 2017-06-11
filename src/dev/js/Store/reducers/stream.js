import {
  CREATE_STREAM_REQUEST,
  CREATE_STREAM_SUCCESS,
  CREATE_STREAM_FAILURE,
  END_STREAM_REQUEST,
  END_STREAM_SUCCESS
} from '../type_actions'

export default function streamReducer(state = {
    isFetching: false,
    isStreaming: localStorage.getItem('liveup_stream') ? true : false,
    stream: {}
  }, action) {
  switch (action.type) {
    case CREATE_STREAM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isStreaming: false
      })
    case CREATE_STREAM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isStreaming: true,
        stream: action.stream
      })
    case CREATE_STREAM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isStreaming: false
      })
    case END_STREAM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case END_STREAM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isStreaming: false,
        stream: {}
      })
    default:
      return state
  }
}
