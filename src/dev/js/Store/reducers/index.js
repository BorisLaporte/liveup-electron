import {combineReducers} from 'redux'

import authReducer from './auth'
import userReducer from './user'
import streamReducer from './stream'
import versioningReducer from './versioning'
import subCategoriesReducer from './sub_categories'
import notificationsReducer from './notification'


export default function theStore() {
  return combineReducers({
    authReducer,
    userReducer,
    streamReducer,
    versioningReducer,
    subCategoriesReducer,
    notificationsReducer
  })
}