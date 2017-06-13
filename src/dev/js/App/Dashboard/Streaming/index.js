import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import {getStreamInfo, endStream} from 'STORE/actions/stream'

import Live from './Live'
import Stats from './Stats'
import Versioning from './Versioning'
import Chat from './Chat'
import Navbar from '../Navbar'
import {STATUS} from 'STORE/reducers/stream'
import {getInfoCommit} from 'STORE/reducers/versioning'

import stopStreamImg from 'IMG/stopstream.svg'
import './streaming.scss'

class Streaming extends Component {

  componentWillMount() {
    const {status, channel, dispatch, stream, filesCommited} = this.props
    // this.redirectOnStoped()
    if (status == STATUS.STREAMING ){
      if (Object.keys(stream).length == 0){
        const isMissingCommit = (Object.keys(filesCommited).length < 1)
        dispatch(getStreamInfo(channel, isMissingCommit))
      }
      // if (Object.keys(filesCommited).length == 0){
      //   dispatch(getInfoCommit())
      // }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this.redirectOnStoped()
  }

  redirectOnStoped() {
    const {status, router} = this.props
    if (status != STATUS.STREAMING) {
      router.push('/dashboard')
    }
  }

  render() {
    const {dispatch, stream, channel} = this.props
    const button = {
      text: "Arrêtez le stream",
      color: "red",
      img: stopStreamImg,
      callback: (e) => {dispatch(endStream(stream.id))}
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
  const {userReducer, streamReducer, versioningReducer} = state

  const {
    id: user_id,
    channel
  } = userReducer

  const {
    filesCommited
  } = versioningReducer

  const {
    status,
    stream
  } = streamReducer
  
  return {
    user_id,
    status,
    stream,
    channel,
    filesCommited
  }
}

export default connect(mapStateToProps)(withRouter(Streaming))

