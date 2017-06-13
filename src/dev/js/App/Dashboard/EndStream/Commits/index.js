import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {commitFile} from 'STORE/actions/versioning'
import addImg from 'IMG/add.svg'
import bubbleImg from 'IMG/marqueur.svg'

import './commits.scss'

class Commits extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleClick(e) {
    const {dispatch, stream_file_id, file, version, isInitiated, isFetching} = this.props
    const {commit} = this.refs
    const commitText = commit.value.trim()
    

    dispatch(commitFile(file, version, stream_file_id, commitText))
  }

  onSubmit(e){
    const {dispatch, stream_file_id, file, version, isInitiated, isFetching} = this.props
    const {commit} = this.refs
    e.preventDefault()
    const commitText = commit.value.trim()
    if (commitText){
      dispatch(commitFile(file, version, stream_file_id, commitText))
      commit.value = ""
    }
    return false
  }

  getHumanDate(time){
    moment.locale('fr')
    return moment(time).fromNow()
  }

  render() {
    const {filesCommited, isFetching} = this.props
    const {getHumanDate} = this
    return (
      <div id="commits">
        <div className="list-commit">
          {
            filesCommited.map(function(value, key){
              return (
                  <div className="commit" key={key}>
                    <div className="bubble">
                      <img src={bubbleImg}/>
                    </div>
                    <div className="text-content">
                      <div className="message">{value.commit_message}</div>
                      <div className="date">{getHumanDate(value.created_at)}</div>
                    </div>
                  </div>
                )
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {versioningReducer, streamReducer} = state

  const {
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file
  } = versioningReducer

  const {
    stream
  } = streamReducer
  
  return {
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file,
    stream
  }
}

export default connect(mapStateToProps)(Commits)
