import {
  SUB_CATEGORIES_REQUEST,
  SUB_CATEGORIES_SUCCESS,
  SUB_CATEGORIES_FAILURE
} from 'STORE/type_actions'

import {addError, TN} from './notification'

import {URL_API} from './var'

function requestSubCategories() {
  return {
    type: SUB_CATEGORIES_REQUEST,
    isFetching: true
  }
}

function receiveSubCategories(sub_categories) {
  return {
    type: SUB_CATEGORIES_SUCCESS,
    isFetching: false,
    sub_categories: sub_categories
  }
}

function subCategoriesError() {
  return {
    type: SUB_CATEGORIES_FAILURE,
    isFetching: false,
  }
}

export function getSubCategories() {

  const config = {
    method: 'GET'
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSubCategories())

    return fetch(URL_API + '/api/v1/sub_categories', config)
      .then(response =>
        response.json().then(subCategories => ({ subCategories, response }))
            ).then(({ subCategories, response }) =>  {
        if (!response.ok){
          //ERRROR
          dispatch(subCategoriesError())
          dispatch(addError(TN.SUB_CAT_FAILURE, "Une érreur s'est produite"))
          return Promise.reject(subCategories)
        }
        dispatch(receiveSubCategories(subCategories))
      }).catch(err => dispatch(addError(TN.SUB_CAT_FAILURE, "Une érreur s'est produite")))
  }
}