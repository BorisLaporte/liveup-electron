import React from 'react'
import { connect } from 'react-redux'

import OneNotif from './OneNotif'
import './notifications.scss'

class Notification extends React.Component {

  render() {
    const {notif, id, dispatch} = this.props
    return (
      <div id="notifications">
        {
          notif.map(
            _notif => 
           <OneNotif notif={_notif} dispatch={dispatch} key={_notif.id}/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {

  const {notificationsReducer} = state

  const {
    notif,
    id
  } = notificationsReducer
  
  return {
    notif,
    id
  }
}

export default connect(mapStateToProps)(Notification)
