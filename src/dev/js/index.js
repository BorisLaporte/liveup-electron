import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'

import configureStore from 'STORE'

import 'SASS/common.scss'
import App from 'APP'
import Home from 'APP/Home'
import Auth from 'APP/Auth'
import Login from 'APP/Auth/Login'

import {register} from './registerServiceWorker'


const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute name="home" component={Home} />
        <Route path="/auth" component={Auth} >
          <IndexRoute name="login" component={Login} />
        </Route>
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
)
register()