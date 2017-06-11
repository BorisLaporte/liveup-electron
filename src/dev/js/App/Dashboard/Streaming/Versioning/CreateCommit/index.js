import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'
import moment from 'moment'

import {commitFile} from 'STORE/actions/versioning'
import addImg from 'IMG/add.svg'
import bubbleImg from 'IMG/marqueur.svg'

import './createCommit.scss'

class CreateCommit extends Component {
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
    const now = moment()
    const fileTime = moment(time)
    console.log(now)
    console.log(fileTime)
    const diff = fileTime.diff(now)
    console.log(diff)
    const finalTime = moment.duration(diff).humanize(true)
    console.log(finalTime)
    return finalTime
  }


  render() {
    const {filesCommited, isFetching} = this.props
    const {getHumanDate} = this
    return (
      <div id="createCommit">
        <div className="form-container">
          {
            isFetching ?
            <div>LOADING</div>
            :
            <form className="form add-commit" onSubmit={this.onSubmit}>
              <div className="btn-plus">
                <img src={addImg} alt="add"/>
                <input type="submit" value=""></input>
              </div>
              <input
                type="text"
                ref="commit"
                id="commit"
                name="commit"
                className="commit-field"
                required
                placeholder="Ajouter un instant clé"
              />
            </form>
          }
        </div>
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

CreateCommit.propTypes = {
  stream: PropTypes.object
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

export default connect(mapStateToProps)(CreateCommit)
