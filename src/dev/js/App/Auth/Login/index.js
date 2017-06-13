import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import './login.scss'
// import 'IMG/iconesbg.svg'

import {loginUser} from 'STORE/actions/connection'
import {addError, TN} from 'STORE/actions/notification'

class Login extends Component {

  onSubmit(e) {
    const {dispatch, isAuthenticated} = this.props
    const {email, password} = this.refs

    e.preventDefault()

    const creds = { 
      email: email.value.trim(),
      password: password.value.trim()
    }
    if (creds.email && creds.password){
      if (!isAuthenticated){
        dispatch(loginUser(creds))
      }
    } else {
      dispatch(addError(TN.MISSING_FIELDS, "Veuillez remplir tous les champs"))
    }
    return false
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch(addError(TN.MISSING_FIELDS, "Veuillez remplir tous les champs"))
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div id="login" className="in-middle">
        <div className="title">
          <span >Bienvenue sur Liveup</span>
        </div>
        <div className="bloc">
          <form className="form" onSubmit={(e) => {this.onSubmit(e)}}>
            <div className="fields">
              <div className="label-input">
                <label htmlFor="email">
                  Votre <span className="bold">identifiant</span>
                </label>
                <input 
                  id="email"
                  ref="email"
                  type="text"
                  name="email"
                  placeholder="email"
                  defaultValue="test@test.com"
                />
              </div>
              <div className="label-input no-margin">
                <label htmlFor="password">
                  Votre <span className="bold">mot de passe</span>
                </label>
                <input
                  id="password"
                  ref="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  defaultValue="password"
                />
              </div>
            </div> 
            <div className="bottom-part">
              <div className="checkbox">
                <input type="checkbox" name="remember" id="remember" defaultChecked/> 
                <label htmlFor="remember" className="inline">
                  Rester connectée
                </label>
              </div>
              <input type="submit" className="button-round" value="Se connecter">
              </input>
            </div>     
          </form>
          <div className="seperator"></div>
          <div className="links">
            <span>Vous n'avez pas de compte ? </span><Link to="/signup">S'inscrire</Link>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func
}

export default Login
