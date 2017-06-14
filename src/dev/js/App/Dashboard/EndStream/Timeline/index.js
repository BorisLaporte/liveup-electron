import React, { Component } from 'react'

import timelineImg from 'IMG/timeline.png'
import './timeline.scss'

class Timeline extends Component {
  render() {
    return (
      <div className="timeline">
        <img src={timelineImg} alt=""/>
      </div>
    )
  }
}

export default Timeline