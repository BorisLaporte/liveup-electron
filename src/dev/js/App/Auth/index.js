import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import './auth.scss'

import LoaderPage from 'APP/LoaderPage'

class Auth extends Component {

  componentWillMount() {
    this.redirectOnLogin()
  }

  componentDidUpdate(prevProps, prevState) {
    const {isAuthenticated, channel, isFetching} = this.props
    if (prevProps.isAuthenticated != isAuthenticated || prevProps.channel != channel) {
      this.redirectOnLogin()
    }
  }

  redirectOnLogin(){
    const {isAuthenticated, router, channel} = this.props
    if (isAuthenticated && channel) {
      if (router.location.path != '/dashboard'){
        router.push('/dashboard')
      }
    } else if (isAuthenticated && !channel){
      if (router.location.path != '/become-streamer'){
        router.push('/become-streamer') 
      }
    } else if (!isAuthenticated){
      if (router.location.path != '/'){
        router.push('/') 
      }
    }
  }

  render() {
    const {dispatch, isAuthenticated, children, isFetching} = this.props

    const childrenWithProps = React.Children.map(children,
     (child) => React.cloneElement(child, {
       dispatch,
       isAuthenticated
     })
    )

    return (
      <div id="Auth" className="fullscreen">
        <div className="background-img fullscreen"></div>
        {childrenWithProps}
        {
          isFetching
          &&
          <LoaderPage text="CONNEXION" />
        }
      </div>
    )
  }
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {authReducer, userReducer} = state

  const {
    isAuthenticated,
    isFetching
  } = authReducer

  const {channel} = userReducer
  
  return {
    isAuthenticated,
    isFetching,
    channel
  }
}

export default connect(mapStateToProps)(withRouter(Auth))