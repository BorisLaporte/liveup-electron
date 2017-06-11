import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {endStream} from 'STORE/actions/stream'

class EndStreaming extends Component {

  handleClick(e) {
    const {dispatch} = this.props

    // TODO
    dispatch(endStream())
  }

  render() {
    return (
      <div>
        <button onClick={(event) => this.handleClick(event)}> end </button>
      </div>
    )
  }
}

EndStreaming.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default EndStreaming

