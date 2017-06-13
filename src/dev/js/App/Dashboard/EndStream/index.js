import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'


import Navbar from '../Navbar'
import uploadImg from 'IMG/upload.svg'

import {uploadStream, getStreamInfo} from 'STORE/actions/stream'
import {STATUS} from 'STORE/reducers/stream'
import {getInfoCommit} from 'STORE/reducers/versioning'

import Commits from './Commits'
import Timeline from './Timeline'
import Vod from './Vod'
import './endStream.scss'

class EndStream extends Component {

  componentDidMount() {
    const {status, stream, channel, filesCommited, dispatch} = this.props
    if (status == STATUS.FINISHED ){
      if (Object.keys(stream).length == 0){
        const isMissingCommit = (Object.keys(filesCommited).length < 1)
        dispatch(getStreamInfo(channel, isMissingCommit))
      }
    }
  }

  render() {
    const {dispatch, stream} = this.props
    const button = {
      text: "Mettre en ligne",
      color: "blue",
      img: uploadImg,
      callback: () => {
        dispatch(uploadStream())
      }
    }
    return (
      <div id="end-stream" className="flex-column-screen fullscreen container">
        <Navbar
            dispatch={dispatch}
            button={button}
          />
        <div className="wrapper-end-stream">
          {
            (stream && (Object.keys(stream).length > 0)) ?
            <div className="container-end-stream">
              <div className="left-part">
                <Commits />
              </div>
              <div className="main-part">
                <Vod cover={stream.thumbnail}/>
                <Timeline />
              </div>
            </div>
            :
            <div>LOADING</div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {versioningReducer, streamReducer, userReducer} = state

  const {
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file
  } = versioningReducer

  const {channel} = userReducer

  const {
    stream,
    status
  } = streamReducer
  
  return {
    stream,
    status,
    channel,
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file
  }
}

export default connect(mapStateToProps)(withRouter(EndStream))