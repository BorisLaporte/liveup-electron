import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'
import moment from 'moment'

import {addError, TN} from 'STORE/actions/notification'
import {commitFile} from 'STORE/actions/versioning'
import addImg from 'IMG/add.svg'
import bubbleImg from 'IMG/marqueur.svg'

import LoaderModule from 'APP/LoaderModule'

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
    
    if (commitText != ""){
      if (!isFetching){
        dispatch(commitFile(file, version, stream_file_id, commitText))
        commit.value = ""
      }
    } else {
      dispatch(addError(TN.MISSING_FIELDS, "Donnez un nom à votre commit"))
    }
  }

  onSubmit(e){
    const {dispatch, stream_file_id, file, version, isInitiated, isFetching} = this.props
    const {commit} = this.refs
    e.preventDefault()
    const commitText = commit.value.trim()
    if (commitText != ""){
      if (!isFetching){
        dispatch(commitFile(file, version, stream_file_id, commitText))
        commit.value = ""
      }
    } else {
      dispatch(addError(TN.MISSING_FIELDS, "Donnez un nom à votre commit"))
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
      <div id="createCommit">
        <div className="form-container">
          <form className="form add-commit" onSubmit={this.onSubmit}>
            <div className="container-btn">
              {
                isFetching ?
                <LoaderModule />
                :
                <div className="btn-plus">
                  <img src={addImg} alt="add"/>
                  <input type="submit" value=""></input>
                </div>
              }
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
