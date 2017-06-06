import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import responsiveReducer from './responsive/reducers'

const theStore = combineReducers({
  responsiveReducer
})

const loggerMiddleware = createLogger()

export default function configureStore() {
  return createStore(
    theStore,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}