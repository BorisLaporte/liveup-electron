import React from 'react'
import PropTypes from 'prop-types'
import {Power2, TweenLite} from 'gsap'

import {deactivateNotif, deleteNotif, TN, ERROR, SUCCESS} from 'STORE/actions/notification'

import closeImg from 'IMG/close.svg'
import './oneNotif.scss'

class OneNotif extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      timeout: null
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
    const {main} = this.refs
    TweenLite.to(main, 0.4,
    {
      opacity: 0,
      y: -10,
      onComplete: callback
    })
  }

  enteringAnim(){
    const {main} = this.refs
    TweenLite.from(main, 0.4,
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

  render() {
    const {message, kind} = this.props.notif
    return (
      <div className={"one-notif " + kind} ref="main">
        <div className="text">{message}</div>
        <div className="close" onClick={(e) => this.handleClick(e)}>
          <img src={closeImg} alt="close"/>
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
