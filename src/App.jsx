import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import uuid from 'node-uuid';

var data = {
  currentUser: {name: ''},
  messages: []
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: {name: ''},
                   messages: [] };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      switch(data.type) {
        case 'incomingMessage':
          this.receivedMessage(data);
          break;
        case 'incomingNotification':
          this.receivedMessage(data);
          break;
        default:
          throw new Error(`Unknown event type $(data.type}`);
      }
    }
  }

  sendServer = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  receivedMessage = (serverMessage) => {
    this.setState({messages: this.state.messages.concat(serverMessage) });
  }

  // set to new user
  // add new message to system containing both users
  changeCurrentUser = (prevUser, newUser) => {
    if (prevUser != newUser) {
        if (prevUser === '') {
          prevUser = 'Anonymous'
        } else if (newUser === '') {
          newUser = 'Anonymous'
        };
      const sendNotification = {type: 'postNotification',
                                content: `${prevUser} changed their name to ${newUser}`};
      this.socket.send(JSON.stringify(sendNotification));
    };
    this.setState({currentUser: {name: newUser}});
  }

  notifyNameChange = (nameChange) => {
    this.setState({systemMessage: nameChange});
  }

  render() {
    return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
          <MessageList messages={this.state.messages} nameChanged={this.state.systemMessage}/>
          <ChatBar newUser={this.changeCurrentUser}
                   currentUser={this.state.currentUser}
                   sendToServer={this.sendServer}
                   notifyNameChange={this.notifyNameChange}>
          </ChatBar>
        </div>

    );
  }
}
export default App;
