import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import {initFile} from 'STORE/actions/versioning'
import InputFile from 'APP/Dashboard/InputFile'

class InitCommit extends Component {

  handleClick(file) {
    const {dispatch, stream} = this.props
    if (file){
      console.log("START INIT")
      dispatch(initFile(stream.id, file))
    } else {
      // error
    }
  }


  render() {
    return (
      <div id="InitCommit">
          <InputFile 
            onFileSelected={(file) => {this.handleClick(file)}}
            responsiveClass="portrait"
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {streamReducer} = state

  const {
    stream
  } = streamReducer
  
  return {
    stream
  }
}

export default connect(mapStateToProps)(InitCommit)
