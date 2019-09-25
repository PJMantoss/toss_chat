import React from 'react';
import Chatkit from '@pusher/chatkit';
import logo from './logo.svg';
import Message from './components/Message';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import RoomList from './components/RoomList';
import SendMessageForm from './components/SendMessageForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'pjtoss',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser

      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })

      this.currentUser.subscribeToRoom({
        roomId: '2d1bf28a-be17-40e6-a458-d470a0f7830f',
        messageLimit: 18,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: '2d1bf28a-be17-40e6-a458-d470a0f7830f'
    })
  }

  render(){
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
  
}

export default App;
