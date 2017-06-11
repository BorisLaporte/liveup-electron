import React, { Component } from 'react'
import {connect} from 'react-redux'

import noAvatarImg from 'IMG/usernopicture.svg'
import './chat.scss'

class Chat extends Component {
  render() {
    const {live, pseudo} = this.props
    return (
      <div id="chat" className="chat-container">
        <div className="detail-user">
          <div className="content">
            <div className="pseudo">
              {pseudo}
            </div>
            {
              live ?
              <div className="status online">
                <div className="bubble"></div>
                <div className="status-human">
                  online
                </div>
              </div>
              :
              <div className="status offline">
                <div className="bubble"></div>
                <div className="status-human">
                  offline
                </div>
              </div>
            }
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
          <div className="conversation">
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>
            <div className="message">
              <div className="avatar">
                <img src={noAvatarImg}/>
              </div>
              <div className="text-content">
                <div className="pseudo">
                  Pauline Taveneau
                </div>
                <div className="content-message"> 
                  Salut je sais pas à quoi sert votre application mais j’adore discuter dans un chat
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {userReducer} = state

  const {
    pseudo,
    live
  } = userReducer

  
  return {
    pseudo,
    live
  }
}

export default connect(mapStateToProps)(Chat)

