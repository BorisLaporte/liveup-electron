import React, {Component, PropTypes} from 'react'
import {TweenLite, TimelineLite, Power2} from 'gsap'
import sortImgPath from "./sortImgPath"
import Preload from "./preload"


export default class PreloaderReact extends Component {
  constructor(props){
    super(props)
    this.state = {
      ready: false,
      preloading: false,
      status: 0,
      queue: [],
      queueing: false,
      tl: null
    }

    this.percentage = this.percentage.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.itsReady = this.itsReady.bind(this)
    this.execQueue = this.execQueue.bind(this)
    this.letsGo = this.letsGo.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (
      ( nextProps.data != null 
        && nextProps.data != this.props.data ) 
      || nextState.ready 
      || ( nextState.status != this.state.status )
      || ( nextState.queueing != this.state.queueing )
    ){
        return true
    } else {
        return false
    }
  }

  componentWillMount() {
    this.setState({tl: new TimelineLite()})
  }

  componentDidMount() {
    const {tl} = this.state
    const {main} = this.refs
    tl.from(main, 2,
    {
      opacity: 0,
      ease: Power2.easeOut
    })
  }


  componentDidUpdate(prevProps, prevState){
    if ( !this.state.preloading ){
      this.start()
    } 
  }

  start(){
    const {data, prefixUrl = ""} = this.props
    const {ready} = this.state
    if ( Object.keys(data).length > 0 && !ready){
      const img = sortImgPath( data, prefixUrl)
      if ( img.length > 0 ){
        this.setState({preloading: true})
        new Preload(img, this.itsReady, this.letsGo, this.percentage )
      }
    }
  }

  itsReady(){
    // this.letsGo()
    console.log("It's already ready, but let's take our time :D")
  }

  leavingAnim(callback){
    // callback()
    const {tl} = this.state
    tl.to(main, 1,
    {
      opacity:0,
      ease: Power2.easeOut,
      onComplete: callback
    })
  }


  percentage(status){
    const new_status = Math.floor(status * 100)
    this.addQueue(new_status)
  }

  addQueue(status){
    const {queueing, queue} = this.state
    queue.push(status)
    if ( !queueing ){
      this.execQueue()
    }
  }

  execQueue(){
    const {queue, queueing} = this.state
    const self = this
    if ( typeof queue != "undefined" && queue.length > 0 ){
      this.state.queueing = true
      this.setStatus(queue[0])
      queue.splice(0,1)
      window.requestAnimationFrame(this.execQueue)
    } else {
      this.state.queueing = false
    }
  }

  setStatus(new_status){
    this.setState({status: new_status})
    if ( new_status == 100 ){
      this.letsGo()
    }
  }

  letsGo(){
    this.leavingAnim(() => {
      const {onSuccess} = this.props
      this.setState({ready: true, preloading: false})
      if (typeof onSuccess === "function"){
        onSuccess()
      }
    })
  }

  render(){
    const {ready, status} = this.state
    const {children} = this.props
    return (
      ready && children ? 
      children 
      : 
      <div 
        className="sub-wrapper in-middle shadowy" 
        ref="main"
      >
        {status}%
      </div>
    )
  }
}

PreloadReact.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  prefixUrl: PropTypes.string
}