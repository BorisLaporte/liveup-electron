import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Notification from './Notification'

import {checkIfConnected} from 'STORE/actions/connection'

class App extends Component {

  componentWillMount() {
    const {dispatch, isAuthenticated} = this.props
    // dispatch(getWindowSize())
    if ( isAuthenticated ){
      dispatch(checkIfConnected())
    }
  }

  componentDidMount() {
    // this.setListenerResponsive()
    this.preventDropToOpenNewWindow()
  }

  preventDropToOpenNewWindow(){

    document.addEventListener('dragover', function (event) {
      event.preventDefault()
      return false
    }, false)

    document.addEventListener('drop', function (event) {
      event.preventDefault()
      return false
    }, false)
  }

  setListenerResponsive(){
    const {dispatch} = this.props
    // window.onresize = () => {
      // dispatch(getWindowSize())
    // }
  }

  render() {
    const {
      children
    } = this.props
    return (
      <div className="wrapper">
        <Notification />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  
  const {authReducer} = state

  const {isAuthenticated} = authReducer

  return {isAuthenticated}
}

export default connect(mapStateToProps)(App)
