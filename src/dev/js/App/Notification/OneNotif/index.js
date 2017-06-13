import React from 'react'
import PropTypes from 'prop-types'
import {Power2, TweenLite} from 'gsap'

import {deactivateNotif, deleteNotif, TN, ERROR, SUCCESS} from 'STORE/actions/notification'

import './oneNotif.scss'

const closeImg = require('IMG/close.svg')

class OneNotif extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      timeout: null,
      readyForTransition: false
    }
  }

  handleClick(e){
    const {active} = this.props.notif
    if (active){
      this.closeNotif()
    }
  }

  autoClose(){
    const self = this
    const timeout = setTimeout(function() {
      self.closeNotif()
    }, 5000)
    this.setState({timeout: timeout})
  }

  closeNotif(){
    const {dispatch, notif} = this.props
    dispatch(deactivateNotif(notif.id))
    const callback = this.selfDestruct.bind(this)
    this.leavingAnim(callback)
  }

  selfDestruct(){
    const {dispatch, notif} = this.props
    dispatch(deleteNotif(notif.id))
  }

  leavingAnim(callback){
    const {container} = this.refs
    TweenLite.to(container, 0.4,
    {
      opacity: 0,
      y: -10,
      onComplete: callback
    })
  }

  enteringAnim(){
    const {container} = this.refs
    TweenLite.from(container, 0.4,
    {
      opacity: 0,
      y: 10
    })
  }

  componentWillMount() {
    this.autoClose()
  }

  componentDidMount() {
    this.enteringAnim()
  }

  componentWillUnmount() {
    const {timeout} = this.state
    if (timeout != null){
      clearTimeout(timeout)
    }
  }

  getStyle(){
    const {theKey} = this.props
    const value = 'calc(' + (theKey * 100) + '%' + ' + ' + (theKey * 20) + 'px)'
    return {
      transform: 'translateY('+ value +')'
    }
  }

  render() {
    const {message, kind} = this.props.notif
    const {theKey} = this.props
    const {readyForTransition} = this.state
    return (
      <div 
        className={"one-notif " + kind}
        ref="main"
        style={this.getStyle()}
      >
        <div className="one-notif-container" ref="container">
          <div className="text">{message}</div>
          <div className="close" onClick={(e) => this.handleClick(e)}>
            <img src={closeImg} alt="close"/>
          </div>
        </div>
      </div>
    )
  }
}

OneNotif.propTypes = {
  notif: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default OneNotif
