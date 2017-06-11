import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {signupUser} from 'STORE/actions/connection'
import './signup.scss'

class Signup extends Component {

  onSubmit(e) {
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

    e.preventDefault()

    const creds = { 
      email: email.value.trim(),
      password: password.value.trim(),
      password_confirmation: password_confirmation.value.trim(),
      first_name: first_name.value.trim(),
      last_name: last_name.value.trim(),
      pseudo: pseudo.value.trim(),
      channel: channel.value.trim()
    }

    if (creds.password && creds.password_confirmation && creds.password === creds.password_confirmation){

      if (creds.email && creds.first_name && creds.last_name && creds.pseudo && creds.channel){
        dispatch(signupUser(creds))
      }
    }

    return false
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div id="signup">
        <form className="form" onSubmit={(e) => {this.onSubmit(e)}}>
          <div className="content-form">
            <div className="fields">
              <div className="label-input">
                <label htmlFor="email">
                  votre <span className="bold">email</span>
                </label>
                <input 
                  id="email"
                  ref="email"
                  type="text"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div className="label-input">
                <label htmlFor="pseudo">
                  votre <span className="bold">pseudo</span>
                </label>
                <input 
                  id="pseudo"
                  ref="pseudo"
                  type="text"
                  name="pseudo"
                  placeholder="pseudo"
                />
              </div>
              <div className="label-input">
                <label htmlFor="last_name">
                  votre <span className="bold">nom de famille</span>
                </label>
                <input 
                  id="last_name"
                  ref="last_name"
                  type="text"
                  name="last_name"
                  placeholder="last_name"
                />
              </div>
              <div className="label-input">
                <label htmlFor="first_name">
                  votre <span className="bold">prénom</span>
                </label>
                <input 
                  id="first_name"
                  ref="first_name"
                  type="text"
                  name="first_name"
                  placeholder="first_name"
                />
              </div>
              <div className="label-input">
                <label htmlFor="channel">
                  votre <span className="bold">channel</span>
                </label>
                <input 
                  id="channel"
                  ref="channel"
                  type="text"
                  name="channel"
                  placeholder="channel"
                />
              </div>
              <div className="label-input">
                <label htmlFor="password">
                  votre <span className="bold">mot de passe</span>
                </label>
                <input 
                  id="password"
                  ref="password"
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </div>
              <div className="label-input">
                <label htmlFor="password_confirmation">
                  confirmer votre <span className="bold">mot de passe</span>
                </label>
                <input 
                  id="password_confirmation"
                  ref="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  placeholder="password_confirmation"
                />
              </div>
              <input type="submit" value="S'inscrire" className="button-round"/>
            </div>
            <div className="seperator"></div>
            <div className="links">
              <span>Vous avez déjà un compte ? </span><Link to="/">S'identifier</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func
}

export default Signup
