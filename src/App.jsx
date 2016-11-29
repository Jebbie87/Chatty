import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: 'Bob',
      content: 'Has anyone seen my marbles?'
    },
    {
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.addNewMessage = this.addNewMessage.bind(this)
    this.changeCurrentUser = this.changeCurrentUser.bind(this)
  }

  componentDidMount() {
    // console.log('componentDidMount <App />');
    /*setTimeout(() => {
      console.log('Simulating incoming message.');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component
      // Calling setState will trigger a call to render() in App and all child components
      this.setState({messages: messages})
    }, 3000);
    */
  }

  addNewMessage (message) {
    const addMessages = this.state.messages.concat(message)
    this.setState({messages: addMessages })
  }

  changeCurrentUser(newUser) {
    this.setState({currentUser: {name: newUser.name}})
  }

  render() {
    console.log('in render', this.state.currentUser.name)
    return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar name={this.state.currentUser.name} messages={this.state.messages} newMessage={this.addNewMessage}></ChatBar>
        </div>
    );
  }
}
export default App;
