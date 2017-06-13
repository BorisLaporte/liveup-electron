import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {signupUser} from 'STORE/actions/connection'
import './signup.scss'

class Signup extends Component {

  onSubmit(e) {
    const {dispatch, isAuthenticated} = this.props
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
        if (!isAuthenticated){
          dispatch(signupUser(creds))
        }
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
        <div className="container-main">
          <div className="title">
            <span >Créer votre compte streamer</span>
          </div>
          <div className="title shadow">
            <span >Créer votre compte streamer</span>
          </div>
          <div className="bloc-container">
            <div className="bloc">
              <form className="form" onSubmit={(e) => {this.onSubmit(e)}}>
                <div className="fields">
                  <div className="line">
                    <div className="label-input half left">
                      <label htmlFor="first_name">
                        Votre <span className="bold">prénom</span>
                      </label>
                      <input 
                        id="first_name"
                        ref="first_name"
                        type="text"
                        name="first_name"
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="label-input half right">
                      <label htmlFor="last_name">
                        Votre <span className="bold">nom</span>
                      </label>
                      <input 
                        id="last_name"
                        ref="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="label-input">
                    <label htmlFor="pseudo">
                      Votre <span className="bold">pseudo</span>
                    </label>
                    <input 
                      id="pseudo"
                      ref="pseudo"
                      type="text"
                      name="pseudo"
                      placeholder="Entrez votre pseudo"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="email">
                      Votre <span className="bold">email</span>
                    </label>
                    <input 
                      id="email"
                      ref="email"
                      type="text"
                      name="email"
                      placeholder="Entrez votre email"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="channel">
                      Votre <span className="bold">identifiant Twitch</span>
                    </label>
                    <input 
                      id="channel"
                      ref="channel"
                      type="text"
                      name="channel"
                      placeholder="Entrez votre identifiant Twitch"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="password">
                      Votre <span className="bold">mot de passe</span>
                    </label>
                    <input 
                      id="password"
                      ref="password"
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                    />
                  </div>
                  <div className="label-input">
                    <label htmlFor="password_confirmation">
                      confirmer Votre <span className="bold">mot de passe</span>
                    </label>
                    <input 
                      id="password_confirmation"
                      ref="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirmation mot de passe"
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
                  <input type="submit" className="button-round" value="S'inscrire">
                  </input>
                </div>     
              </form>
              <div className="seperator"></div>
              <div className="links">
                <span>Vous avez déjà un compte ? </span><Link to="/">S'identifier</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func
}

export default Signup
