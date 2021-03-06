import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory, IndexRoute, Redirect} from 'react-router'

import configureStore from 'STORE'

import 'SASS/main.scss'
import App from 'APP'
import Auth from 'APP/Auth'
import Dashboard from 'APP/Dashboard'
import CreateStream from 'APP/Dashboard/CreateStream'
import Streaming from 'APP/Dashboard/Streaming'
import EndStream from 'APP/Dashboard/EndStream'
import ModifyStream from 'APP/Dashboard/ModifyStream'
import Login from 'APP/Auth/Login'
import Signup from 'APP/Auth/Signup'
import BecomeStreamer from 'APP/Auth/BecomeStreamer'


const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" name="auth" component={Auth} >
          <IndexRoute name="login" component={Login} />
          <Route name="becomeStreamer" path="/become-streamer" component={BecomeStreamer} />
          <Route name="signup" path="/signup" component={Signup} />
        </Route>
        <Route path="/dashboard" name="dashboard" component={Dashboard}>
          <IndexRoute name="createStream" component={CreateStream} />
          <Route name="streaming" path="/dashboard/streaming" component={Streaming} />
          <Route name="endStream" path="/dashboard/end-stream" component={EndStream} />
          <Route name="modifyStream" path="/dashboard/modify-stream" component={ModifyStream} />
        </Route>
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
)
// register()