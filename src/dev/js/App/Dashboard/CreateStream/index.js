import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router'

import {createStream} from 'STORE/actions/stream'
import {getSubCategories} from 'STORE/actions/sub_categories'
import {initFile} from 'STORE/actions/versioning'

import Navbar from '../Navbar'
import InputFile from '../InputFile'
import './createStream.scss'

import uploadImg from 'IMG/upload.svg'

class CreateStream extends Component {
  constructor(props){
    super(props)

    this.state = {
      file: null
    }

    this.getFile = this.getFile.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {dispatch} = this.props
    const {file} = this.state
    const {name, desc, subCategories} = this.refs

    if (name.value.trim() !== ""){
      //TODO REAL CASE
      const stream = {
        stream: {
          name: name.value.trim(),
          description: desc.value.trim(),
          sub_category_ids: [subCategories.value]
        }
      }
      dispatch(createStream(stream, file))
    } else {
      // error
    }
  }

  getFile(file){
    this.setState({file: file})
  }

  componentWillMount() {
    const {dispatch} = this.props
    this.redirectOnStreaming()
    dispatch(getSubCategories())
  }

  componentDidUpdate(prevProps, prevState) {
    this.redirectOnStreaming()
  }

  redirectOnStreaming() {
    const {isStreaming, router} = this.props
    if (isStreaming) {
      router.push('/dashboard/streaming')
    }
  }

  render() {
    const {sub_categories, dispatch} = this.props
    const button = {
      text: "Créez le stream",
      color: "blue",
      img: uploadImg,
      callback: () => {this.handleClick()}
    }
    return (
      <div id="createStream" className="flex-column-screen fullscreen">
        <Navbar
          dispatch={dispatch}
          button={button}
        />
        <div className="container form">
          <div className="in-middle core-form">
            <div className="title">
              Je définis les paramétres de mon stream
            </div>
            <div className="label-input">
              <label htmlFor="name">
               votre <span className="bold">titre</span>
              </label>
              <input
                id="name"
                ref="name"
                type="text"
                name="name"
                placeholder="name"
                defaultValue="petittest"
              />
            </div>
            <div className="label-input">
              <label htmlFor="subCategories">
               la <span className="bold">sous-catégorie</span>
              </label>
              <select name="subCategories" id="subCategories" ref="subCategories">
                <option value="" defaultValue>Séléctionnez une sous-catégorie</option>
                {sub_categories.map(function(value, key){
                  return <option key={key} value={value.id}>{value.name}</option>
                })}
              </select>
            </div>
            <div className="label-input">
              <label htmlFor="desc">
               votre <span className="bold">description</span>
              </label>
              <textarea
                name="desc"
                id="desc"
                rows="5"
                ref="desc"
                placeholder="Description"
                defaultValue="Le petit Benjamin est la chaîne pour les professionnels pour ne jamais apprendre tout seul."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bottom-upload">
          <InputFile onFileSelected={this.getFile}/>
        </div>
      </div>
    )
  }
}

CreateStream.propTypes = {
  dispatch: PropTypes.func
}



function mapStateToProps(state) {
  console.log(state)
  const {userReducer, streamReducer, subCategoriesReducer} = state

  const {
    id: user_id
  } = userReducer

  const {sub_categories} = subCategoriesReducer

  const {
    isStreaming
  } = streamReducer
  
  return {
    user_id,
    sub_categories,
    isStreaming
  }
}

export default connect(mapStateToProps)(withRouter(CreateStream))
