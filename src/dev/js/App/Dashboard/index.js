import React, { Component } from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {STATUS} from 'STORE/reducers/stream'

class Dashboard extends Component {
  componentWillMount() {
    this.redirect()
    this.redirectOnStreaming()
  }

  componentDidUpdate(prevProps, prevState) {
    const {status} = this.props
    this.redirect()
    if (prevProps.status != status){
      this.redirectOnStreaming()
    }
  }

  redirect(){
    const {isAuthenticated, router, status, route, channel} = this.props
    if (!isAuthenticated || (isAuthenticated && !channel)) {
      router.push('/')
    }
  }

  redirectOnStreaming(){
    const {status, route, router} = this.props
    let nextRoute = ""
    switch(status){
      case STATUS.STREAMING:
        nextRoute = '/dashboard/streaming'
        break
      case STATUS.FINISHED:
        nextRoute = '/dashboard/end-stream'
        break
      case null:
        nextRoute = '/dashboard'
        break
    }
    if (router.location.pathname != nextRoute){
      router.push(nextRoute)
    }
  }


  render() {
    const {dispatch, children, user_id} = this.props
    return (
      <div className="fullscreen">
        {
          user_id ?
          <div className="fullscreen">
            {children}
          </div>
          :
          <div>LOADING</div>
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

  const {authReducer, userReducer, streamReducer} = state

  const {
    isAuthenticated
  } = authReducer

  const {status} = streamReducer

  const {
    id: user_id,
    channel
  } = userReducer
  
  return {
    isAuthenticated,
    status,
    user_id,
    channel
  }
}

export default connect(mapStateToProps)(withRouter(Dashboard))
