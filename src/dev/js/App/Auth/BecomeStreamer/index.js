import React, { Component } from 'react'
import {Link} from 'react-router'

import './becomeStreamer.scss'
import {becomeStreamer, didLostSession, logoutUser} from 'STORE/actions/connection'
import {addError, TN} from 'STORE/actions/notification'

class BecomeStreamer extends Component {

  onSubmit(e) {
    const {dispatch, isAuthenticated} = this.props
    const {channel} = this.refs

    e.preventDefault()

    if (channel.value.trim()){
      if (isAuthenticated){
        dispatch(becomeStreamer(channel.value.trim()))
      } else {
        dispatch(didLostSession())
      }
    } else {
      dispatch(addError(TN.MISSING_FIELDS, "Veuillez remplir le champ"))
    }
    return false
  }

  onClick(e){
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(logoutUser())
    return false
  }


  render() {
    return (
      
      <div id="become-streamer" className="in-middle">
        <div className="title">
          <span >Je renseigne mon identifiant Twitch</span>
        </div>
        <div className="bloc">
          <form className="form" onSubmit={(e) => {this.onSubmit(e)}}>
            <div className="fields">
              <div className="label-input">
                <label htmlFor="channel">
                  Votre <span className="bold">identifiant Twitch</span>
                </label>
                <input 
                  id="channel"
                  ref="channel"
                  type="text"
                  name="channel"
                  placeholder="identifiant Twitch"
                  defaultValue="ogaminglol"
                />
              </div>
            </div> 
            <div className="bottom-part">
              <input type="submit" className="button-round" value="Validez">
              </input>
            </div>     
          </form>
          <div className="seperator"></div>
          <div className="links">
            <span>Vous avez déjà un compte streamer ? </span><a href="/" onClick={(e) => {this.onClick(e)}}>S'identifier</a>
          </div>
        </div>
      </div>
    )
  }
}

export default BecomeStreamer