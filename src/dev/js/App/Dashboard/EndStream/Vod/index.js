import React, { Component } from 'react'

import './vod.scss'

class Vod extends Component {
  render() {
    const {cover} = this.props
    return (
      <div className="vod">
        <img src={cover} alt="cover"/>
      </div>
    )
  }
}

export default Vod