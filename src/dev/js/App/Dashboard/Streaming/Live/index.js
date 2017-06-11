import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

// import {} from 'STORE/actions/stream'
import './live.scss'

class Live extends Component {


  render() {
    const {channel} = this.props
    return (
      <div id="live" className="iframe-container">
        <iframe
          title="stream"
          src={"http://player.twitch.tv/?channel="+channel}
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
        />
      </div>
    )
  }
}

Live.propTypes = {
  channel: PropTypes.string.isRequired
}

export default Live

