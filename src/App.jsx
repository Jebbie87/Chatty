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
                   messages: []
                 };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');
    this.socket.onmessage = this.receivedMessage;
  }

  sendServer = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  receivedMessage = (serverMessage) => {
    const parsedData = JSON.parse(serverMessage.data);
    if (parsedData.username === '') {
      parsedData.username = 'Anonymous'
    }
    const addMessage = this.state.messages.concat(parsedData);
    this.setState({messages: addMessage });
  }

  changeCurrentUser = (newUser) => {
    this.setState({currentUser: {name: newUser}});
  }

  render() {
    return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar newUser={this.changeCurrentUser}
                   currentUser={this.state.currentUser}
                   sendToServer={this.sendServer}>
          </ChatBar>
        </div>

    );
  }
}
export default App;
