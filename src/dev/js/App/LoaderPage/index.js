import React from 'react'
import './loaderPage.scss'

import loaderGif from 'IMG/loader.gif'

const LoaderPage = ({text}) => {
  return (
    <div className='loader-page'>
      <div className="shadow fullscreen"></div>
      <div className="content-loader in-middle">
        <img src={loaderGif} alt="Loading"/>
        <div className="text">{text}</div>
      </div>
    </div>
  )
}

export default LoaderPage