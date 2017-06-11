import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

// import {} from 'STORE/actions/stream'

class Live extends Component {


  render() {
    const {channel} = this.props
    return (
      <div id="Live">
        <iframe
          title="iframe-stream"
          src={"http://player.twitch.tv/?channel="+channel}
          height="500"
          width="700"
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

