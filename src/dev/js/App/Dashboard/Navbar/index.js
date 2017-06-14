import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {logoutUser} from 'STORE/actions/connection'

import logo from 'IMG/logo_liveup.svg'
import './navbar.scss'

class Navbar extends Component {
  constructor(props){
    super(props)

    this.state = {
      menu: [
        'CRÉATION STREAM',
        'LIVE STREAM',
        'FINALISATION VOD'
      ]
    }
  }

  handleLogout(e){
    const {dispatch} = this.props
    e.preventDefault()
    dispatch(logoutUser())
  }

  render() {
    const {button, active} = this.props
    const {text, color, img, callback} = button
    const {menu} = this.state
    return (
      <div id="navbar">
        <div className="left-part">
          <div className="logo">
            <img src={logo} alt="Logo"/>
          </div>
          <div className="menu">
            <a
              className="link deconnexion"
              href="#"
              onClick={(event) => this.handleLogout(event)}
            >

              DÉCONNEXION
            </a>
            {
              menu.map(function(value, key){
                return (
                    <div key={key} className={"link " + (active == value ? 'active' : 'path')} >{value}</div>
                  )
              })
            }
          </div>
        </div>
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


function mapStateToProps(state) {

  const {authReducer} = state

  const {
    isAuthenticated
  } = authReducer
  
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Navbar)
