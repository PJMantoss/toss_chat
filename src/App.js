import React from 'react';
import Chatkit from '@pusher/chatkit-client-react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client-react';
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
      messages: []
    }
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
      currentUser.subscribeToRoom({
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


  render(){
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
  
}

export default App;
