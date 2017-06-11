import React, { Component } from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Navbar from './Navbar'

class Dashboard extends Component {
  componentWillMount() {
    this.redirectOnLogout()
  }

  componentDidUpdate(prevProps, prevState) {
    this.redirectOnLogout()
  }

  redirectOnLogout(){
    const {isAuthenticated, router} = this.props
    if (!isAuthenticated) {
      router.push('/')
    }
  }


  render() {
    const {dispatch, children, user_id} = this.props
    return (
      <div className="fullscreen">
        {
          user_id
          &&
          <div className="fullscreen">
            {children}
          </div>
        }
      </div>
    )
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

  const {authReducer, userReducer} = state

  const {
    isAuthenticated
  } = authReducer

  const {
    id: user_id
  } = userReducer
  
  return {
    isAuthenticated,
    user_id
  }
}

export default connect(mapStateToProps)(withRouter(Dashboard))
