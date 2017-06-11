import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {logoutUser} from 'STORE/actions/connection'

import logo from 'IMG/logo_liveup.svg'
import './navbar.scss'

export default class Navbar extends Component {

  handleLogout(e){
    const {dispatch} = this.props
    dispatch(logoutUser())
  }

  render() {
    const {text, color, img, callback} = this.props.button
    return (
      <div id="navbar">
        <div className="left-part">
          <div className="logo">
            <img src={logo} alt="Logo"/>
          </div>
          <div className="menu">
            <a className="link" href="#">INFORMATIONS GÉNÉRALES</a>
            <a className="link" href="#">LIVE STREAM</a>
            <a className="link" href="#">FINALISATION VOD</a>
          </div>
        </div>
        <button onClick={(event) => this.handleLogout(event)} className="btn btn-primary">
          Logout
        </button>
        <div className="right-part">
          <button className={"big-btn " + color} onClick={(e) => callback(e)}>
            <img className="img" src={img}/>
            <div className="text">{text}</div>
          </button>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  button: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    img: PropTypes.string,
    callback: PropTypes.func
  })
}
