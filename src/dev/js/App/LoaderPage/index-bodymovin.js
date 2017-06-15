import React, { Component } from 'react'
import ReactBodymovin from 'react-bodymovin'
import './loaderPage.scss'

import animation from './data.json'

import loaderGif from 'IMG/loader.gif'


const LoaderPage = ({text}) => {
  const bodymovinOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: animation
  }
  return (
    <div className='loader-page'>
      <div className="shadow fullscreen"></div>
      <div className="content-loader in-middle" id="bodymovin">
        <ReactBodymovin options={bodymovinOptions} />
      </div>
    </div>
  )
}



export default LoaderPage
