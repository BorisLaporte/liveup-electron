import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {signupUser} from 'STORE/actions/connection'

class Signup extends Component {

  handleClick(e) {
    const {dispatch} = this.props
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      pseudo,
      channel
    } = this.refs

    const creds = { 
      email: email.value.trim(),
      password: password.value.trim(),
      password_confirmation: password_confirmation.value.trim(),
      first_name: first_name.value.trim(),
      last_name: last_name.value.trim(),
      pseudo: pseudo.value.trim(),
      channel: channel.value.trim()
    }

    dispatch(signupUser(creds))
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div id="Signup">
        <div className="form classic-form">
        <input
          ref="email"
          type="text"
          placeholder="email"
        />
        <input
          ref="password"
          type="password"
          placeholder="password"
        />
        <input
          ref="password_confirmation"
          type="text"
          placeholder="password_confirmation"
        />
        <input
          ref="first_name"
          type="text"
          placeholder="First name"
        />
        <input
          ref="last_name"
          type="text"
          placeholder="Last name"
        />
        <input
          ref="pseudo"
          type="text"
          placeholder="Pseudo"
        />
        <input
          ref="channel"
          type="text"
          placeholder="Channel"
        />
          <button onClick={(event) => this.handleClick(event)}>
            Signup
          </button>
        </div>
        <div className="links">
          <Link to="/">Login</Link>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func
}

export default Signup
