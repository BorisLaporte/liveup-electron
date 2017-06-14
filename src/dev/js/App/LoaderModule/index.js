import React from 'react'
import './loaderModule.scss'

import loaderGif from 'IMG/loader.gif'

const LoaderModule = () => {
  return (
    <div className='loader-module'>
      <div className="content-loader in-middle">
        <img src={loaderGif} alt="Loading"/>
      </div>
    </div>
  )
}

export default LoaderModule