import {
  SUB_CATEGORIES_REQUEST,
  SUB_CATEGORIES_SUCCESS,
  SUB_CATEGORIES_FAILURE
} from 'STORE/type_actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function subCategoriesReducer(state = {
    isFetching: false,
    sub_categories: []
  }, action) {
  switch (action.type) {
    case SUB_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case SUB_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        sub_categories: state.sub_categories.concat(action.sub_categories)
      })
    case SUB_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}
