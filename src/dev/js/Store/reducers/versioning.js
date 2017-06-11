import {
  SELECT_FILE,
  REMOVE_FILE,
  START_WATCHING,
  END_WATCHING,
  DROPBOX_REQUEST,
  DROPBOX_SUCCESS,
  DROPBOX_FAILURE,
  INIT_REQUEST,
  INIT_SUCCESS,
  INIT_FAILURE,
  SEND_VERSION_REQUEST,
  SEND_VERSION_SUCCESS,
  SEND_VERSION_FAILURE
} from '../type_actions'

export default function versioningReducer(state = {
    file: {},
    stream_file_id: null,
    isFetching: false,
    isFetchingDropbox: false,
    isInitiated: false,
    isWatching: false,
    version: 0,
    filesCommited: []
  }, action) {
  switch (action.type) {
    case SELECT_FILE:
      return Object.assign({}, state, {
        file: action.file,
      })
    case REMOVE_FILE:
      return Object.assign({}, state, {
        file: {},
      })
    case START_WATCHING:
      return Object.assign({}, state, {
        isWatching: true
      })
    case END_WATCHING:
      return Object.assign({}, state, {
        isWatching: false
      })
    case DROPBOX_REQUEST:
      return Object.assign({}, state, {
        isFetchingDropbox: true
      })
    case DROPBOX_SUCCESS:
      return Object.assign({}, state, {
        isFetchingDropbox: false,
      })
    case DROPBOX_FAILURE:
      return Object.assign({}, state, {
        isFetchingDropbox: false,
      })
    case INIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInitiated: true,
        version: action.version,
        stream_file_id: action.stream_file_id,
        filesCommited: state.filesCommited.concat([action.new_commit])
      })
    case INIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInitiated: false
      })
    case SEND_VERSION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case SEND_VERSION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        version: action.version,
        filesCommited: state.filesCommited.concat([action.new_commit])
      })
    case SEND_VERSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}