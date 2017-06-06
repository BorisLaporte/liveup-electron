import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Login from './Login'
import {Link} from 'react-router'

class Auth extends Component {

  render() {
    console.log(this.props)
    const {children} = this.props
    return (
      <div id="Auth" className="container">
        {children}
      </div>
    )
  }
}

Auth.propTypes = {
  children: PropTypes.element
}

export default Auth