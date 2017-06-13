import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import Navbar from '../Navbar'
import uploadImg from 'IMG/upload.svg'

import {uploadStream} from 'STORE/actions/stream'

class EndStream extends Component {
  render() {
    const {dispatch} = this.props
    const button = {
      text: "Mettre en ligne",
      color: "blue",
      img: uploadImg,
      callback: () => {
        dispatch(uploadStream())
      }
    }
    return (
      <div id="endStream">
        <Navbar
            dispatch={dispatch}
            button={button}
          />
        <div>STREAM FINISHED !!</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(withRouter(EndStream))