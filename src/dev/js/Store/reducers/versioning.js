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
  SEND_VERSION_FAILURE,
  COMMIT_INFO_REQUEST,
  COMMIT_INFO_SUCCESS,
  COMMIT_INFO_FAILURE,
  GET_FILE_ID
} from '../type_actions'

const initialState  = {
    file: {},
    stream_file_id: null,
    isFetching: false,
    isFetchingDropbox: false,
    isInitiated: false,
    isWatching: false,
    version: 0,
    didFailed: false,
    filesCommited: []
  }

export default function versioningReducer(state = initialState, action) {
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
        initialState
      })
    case DROPBOX_REQUEST:
      return Object.assign({}, state, {
        isFetchingDropbox: true,
        isFetching: true
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
        filesCommited: [action.new_commit].concat(state.filesCommited)
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
        filesCommited: [action.new_commit].concat(state.filesCommited)
      })
    case SEND_VERSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case COMMIT_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case COMMIT_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        version: action.version,
        filesCommited: action.commits,
        isInitiated: action.isInitiated
      })
    case COMMIT_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didFailed: true
      })
    case GET_FILE_ID:
      return Object.assign({}, state, {
        stream_file_id: action.stream_file_id
      })
    default:
      return state
  }
}
