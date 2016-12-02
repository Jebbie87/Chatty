import React, {Component} from 'react';
import uuid from 'node-uuid';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

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
        case 'incomingNotification':
          this.receivedMessage(data);
          break;
        case 'incomingConnection':
          this.setState({userCounter: data.userCounter });
          this.receivedMessage(data);
          break;
        case 'incomingUsersOnline':
          this.setState({userCounter: data.userCounter});
          break;
        case 'incomingPicture':
          // console.log(event.data)
          // console.log('hello')
          this.setState({picture: data.content})
          break;
        default:
          throw new Error(`Unknown event type $(data.type}`);
      }
    }
  }

  // this will take the message sent from the client and send it to the server
  sendServer = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  // this function takes the data from the server and updates the state with the new message
  receivedMessage = (serverMessage) => {
    this.setState({messages: this.state.messages.concat(serverMessage) });
  }

  // this will change the current user. if the user entered is empty, it will add anonymous to the message username
  // this also sends the notification to the server when a user changes their name
  changeCurrentUser = (prevUser, newUser) => {
    if (prevUser != newUser) {
        if (prevUser === '') {
          prevUser = 'Anonymous'
        } else if (newUser === '') {
          newUser = 'Anonymous'
        };
      const sendNotification = {
        type: 'postNotification',
        content: `${prevUser} changed their name to ${newUser}`
      };
      this.socket.send(JSON.stringify(sendNotification));
    };
    this.setState({currentUser: {name: newUser}});
  }

  render() {
    let { messages, currentUser, systemMessage, userCounter, picture } = this.state
    return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
            <span className="client-count">{userCounter}</span>
          </nav>
          <MessageList
            messages = {messages}
            nameChanged = {systemMessage}
            image= {picture}
          />
          <ChatBar
            newUser = {this.changeCurrentUser}
            currentUser = {currentUser}
            sendToServer = {this.sendServer}
          />
        </div>
    );
  }
}
export default App;
