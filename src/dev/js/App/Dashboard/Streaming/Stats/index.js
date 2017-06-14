import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

// import {} from 'STORE/actions/stream'
import eyeImg from 'IMG/eye.svg'
import evolutionImg from 'IMG/evolution-viewers.png'
import './stats.scss'

class Stats extends Component {


  render() {
    const {stream} = this.props
    const {viewers} = stream
    return (
      <div id="stats" className="stats-container">
        <div className="viewers">
          <img src={eyeImg}/>
          <div className="title">
            Nombre de personne en live
          </div>
          <div className="number">
            {viewers}
          </div>
        </div>
        <div className="evolution">
          <img src={evolutionImg}/>
        </div>
      </div>
    )
  }
}

Stats.propTypes = {
  stream: PropTypes.object
}

export default Stats

