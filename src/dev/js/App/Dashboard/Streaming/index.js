import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import {getStreamInfo} from 'STORE/actions/stream'

import EndStreaming from './EndStreaming'
import Live from './Live'
import Stats from './Stats'
import Versioning from './Versioning'
import Chat from './Chat'
import Navbar from '../Navbar'

import stopStreamImg from 'IMG/stopstream.svg'
import './streaming.scss'

class Streaming extends Component {

  componentWillMount() {
    const {isStreaming, channel, dispatch, stream} = this.props
    // this.redirectOnStoped()
    if (isStreaming && Object.keys(stream).length == 0 ){
      dispatch(getStreamInfo(channel))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this.redirectOnStoped()
  }

  redirectOnStoped() {
    const {isStreaming, router} = this.props
    if (!isStreaming) {
      router.push('/dashboard')
    }
  }

  render() {
    const {dispatch, stream, channel} = this.props
    const button = {
      text: "Arrêtez le stream",
      color: "red",
      img: stopStreamImg,
      callback: (e) => {console.log(e); console.log("STOP IT")}
    }
    return (
      <div id="streaming" className="flex-column-screen fullscreen container">
        <Navbar dispatch={dispatch} button={button}/>
        {
          (Object.keys(stream).length > 0)
          &&
          <div className="container">
            <div className="left-part">
              <Versioning />
            </div>
            <div className="middle-part">
              <Live channel={channel} />
              <Stats stream={stream} />
            </div>
            <div className="right-part">
              <Chat />
            </div>
          </div>
        }
      </div>
    )
  }
}

Streaming.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps(state) {
  const {userReducer, streamReducer} = state

  const {
    id: user_id,
    channel
  } = userReducer

  const {
    isStreaming,
    stream
  } = streamReducer
  
  return {
    user_id,
    isStreaming,
    stream,
    channel
  }
}

export default connect(mapStateToProps)(withRouter(Streaming))

