import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import './auth.scss'

class Auth extends Component {

  componentWillMount() {
    this.redirectOnLogin()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("UPDATE")
    this.redirectOnLogin()
  }

  redirectOnLogin(){
    const {isAuthenticated, router} = this.props
    console.log("REDIRECT LOGIN")
    console.log(isAuthenticated)
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }

  render() {
    const {dispatch, children} = this.props

    const childrenWithProps = React.Children.map(children,
     (child) => React.cloneElement(child, {
       dispatch
     })
    )

    return (
      <div id="Auth" className="fullscreen">
        <div className="background-img fullscreen"></div>
        {childrenWithProps}
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
  
  const {authReducer} = state

  const {
    isAuthenticated
  } = authReducer
  
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(withRouter(Auth))