import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Login extends Component {

  render() {
    return (
      <div className="form">
        <form action="POST">
          <input id="username" type="text" name="username"/>
          <input id="password" type="password" name="password"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
}


export default Login