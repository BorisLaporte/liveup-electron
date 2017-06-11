import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

// import {} from 'STORE/actions/stream'

class Stats extends Component {


  render() {
    const {stream} = this.props
    const {viewers} = stream
    console.log(stream)
    return (
      <div id="Stats">
        Number viewer : {viewers}
      </div>
    )
  }
}

Stats.propTypes = {
  stream: PropTypes.object
}

export default Stats

