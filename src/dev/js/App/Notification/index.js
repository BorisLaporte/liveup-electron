import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    // const {notifications} = this.props
    const notifications = []
    return (
      <div id="notifications" className="fullscreen">
        <h1>notifications</h1>
        {
          notifications.map(
            notif => <li key={notif.id}>{notif.content}</li>,
          )
        }
      </div>
    )
  }
}
export default Notification
