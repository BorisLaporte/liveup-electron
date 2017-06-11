import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import CreateCommit from './CreateCommit'
import InitCommit from './InitCommit'

import './versioning.scss'

class Versioning extends Component {

  render() {
    const {isFetching, isInitiated} = this.props
    return (
      <div id="versioning">
        {
          (isFetching && !isInitiated) ?
          <div>LOADING</div>
          :
          <div>
            {
              isInitiated ?
              <CreateCommit />
              :
              <InitCommit />
            }
          </div>
        }
      </div>
    )
  }
}

Versioning.propTypes = {
  stream: PropTypes.object
}

function mapStateToProps(state) {
  const {versioningReducer} = state

  const {
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file
  } = versioningReducer
  
  return {
    version,
    stream_file_id,
    filesCommited,
    isInitiated,
    isFetching,
    file
  }
}

export default connect(mapStateToProps)(Versioning)
