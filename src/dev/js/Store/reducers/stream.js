import {
  CREATE_STREAM_REQUEST,
  CREATE_STREAM_SUCCESS,
  CREATE_STREAM_FAILURE,
  END_STREAM_REQUEST,
  END_STREAM_SUCCESS,
  UPLOAD_STREAM_REQUEST,
  UPLOAD_STREAM_SUCCESS,
  UPLOAD_STREAM_FAILURE
} from '../type_actions'

export const STATUS = {
  STREAMING: 'STREAMING',
  FINISHED: 'FINISHED'
}

export default function streamReducer(state = {
    isFetching: false,
    status: localStorage.getItem('liveup_stream_status') || null,
    stream: {}
  }, action) {
  switch (action.type) {
    case CREATE_STREAM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CREATE_STREAM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        status: STATUS.STREAMING,
        stream: action.stream
      })
    case CREATE_STREAM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: null
      })
    case END_STREAM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case END_STREAM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        status: STATUS.FINISHED,
        stream: {}
      })
    case UPLOAD_STREAM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPLOAD_STREAM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        status: null
      })
    case UPLOAD_STREAM_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: null
      })
    default:
      return state
  }
}
