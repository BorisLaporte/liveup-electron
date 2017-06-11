import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './inputFile.scss'

export default class InputFile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nameFile: "Upload de fichier",
      counterDrag: 0
    }
  }

  onChange({target}) {
    const {onFileSelected} = this.props
    if (target.files.length > 0){
      const file = target.files[0]
      let nameFile = file.name
      if (nameFile.length > 14){
        nameFile = nameFile.substring(0, 14) + "..."
      }
      this.setState({nameFile: nameFile})
      onFileSelected(file)
    }
  }

  onDragEnter(e){
    const {main} = this.refs
    const {counterDrag} = this.state
    this.setState({counterDrag: counterDrag + 1})
  }

  onDragLeave(e){
    const {main} = this.refs
    const {counterDrag} = this.state
    this.setState({counterDrag: counterDrag - 1})
  }

  onDragOver(e){
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  onDrop(e) {
    const {onFileSelected} = this.props
    e.preventDefault()

    let file = null
    this.setState({counterDrag: 0})
    if ( e.dataTransfer.files.length > 1){
      return false
    }

    try {
      file = e.dataTransfer.files[0]
    } catch (e) {
      return false
    }
    if (file.name.length > 14){
      const nameFile = file.name.substring(0, 14) + "..."
      this.setState({nameFile: nameFile})
    }

    onFileSelected(file)
    return file
  }

  render() {
    const {nameFile, counterDrag} = this.state
    const {responsiveClass} = this.props
    let extraClass = ""
    if (responsiveClass){
      extraClass = responsiveClass
    }
    let dragClass = ""
    if ( counterDrag > 0 ){
      dragClass = "drag-over"
    }
    return (
      <div 
        className={"input-file " + dragClass + " " + extraClass}
        onDragEnter={(e) => this.onDragEnter(e)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e)}
        onDragLeave={(e) => this.onDragLeave(e)}
        ref="main"
      >
        <div className="bold drag-text">DRAG’N DROP</div>
        <div className="drag-text">ou</div>
        <div className="btn">
          <input
            id="file"
            ref="file"
            type="file"
            name="file"
            onChange={(e) => this.onChange(e)}
          />
          <label htmlFor="file" tabIndex="0" >
            {nameFile}
          </label>
        </div>
      </div>
    )
  }
}

InputFile.propTypes = {
  onFileSelected: PropTypes.func,
  responsiveClass: PropTypes.string
}