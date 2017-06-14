import React, { Component } from 'react'
import {connect} from 'react-redux'

import noAvatarImg from 'IMG/usernopicture.svg'
import './chat.scss'
import chatJson from './chat.json'

class Chat extends Component {

  scrollBottom(){
    const {conversation} = this.refs
    conversation.scrollTop = conversation.scrollHeight
  }

  componentDidMount() {
    this.scrollBottom()
  }

  render() {
    const {pseudo} = this.props
    const {chatContent} = chatJson
    return (
      <div id="chat" className="chat-container">
        <div className="detail-user">
          <div className="content">
            <div className="pseudo">
              {pseudo}
            </div>
            <div className="status online">
              <div className="bubble"></div>
              <div className="status-human">
                online
              </div>
            </div>
          </div>
        </div>
        <div className="conversation-container">
          <div className="menu">
            <div className="all choice active">
              <div className="text">Discuter en ligne</div>
              <div className="indicator"></div>
            </div>
            <div className="questions choice">
              <div className="text">Échanger avec le streamer</div>
              <div className="indicator"></div>
            </div>
          </div>
          <div className="conversation" ref="conversation">
            {
              chatContent.map(function(value, key){
                return (
                  <div className="message" key={value.id}>
                    <div className="avatar">
                      <img src={noAvatarImg}/>
                    </div>
                    <div className="text-content">
                      <div className="pseudo">
                        {value.name}
                      </div>
                      <div className="content-message"> 
                        {value.content}
                      </div>
                    </div>
                  </div>
                  )
              })
            }

          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {userReducer} = state

  const {
    pseudo
  } = userReducer

  
  return {
    pseudo
  }
}

export default connect(mapStateToProps)(Chat)

