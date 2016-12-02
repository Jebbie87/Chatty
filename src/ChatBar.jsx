import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {value: '',
                  name: ''};
  }

  // this function handles the change happening on the chat box
  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // this function handles the change happening on the user box and also sends it to App.jsx after hitting enter
  handleUser = (event) => {
    if (event.key === 'Enter') {
      this.props.newUser(this.props.currentUser.name, this.state.name)
    }
      this.setState({name: event.target.value})
  }

  // this function submits all the data to App.jsx after pressing enter
  handleSubmit = (event) => {
    if (event.key === 'Enter'){
      this.props.sendToServer({ type: 'postMessage',
                                username: this.props.currentUser.name || 'Anonymous',
                                content: this.state.value})
      this.setState({value: ''})
    }
  }

  render() {
    return (
    <footer>
        <input
          value={this.state.name}
          onChange={this.handleUser}
          onKeyDown={this.handleUser}
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
        />
        <input
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          id="new-message"
          type="submit text"
          placeholder="Type a message and hit ENTER"
        />
    </footer>
    );
  }
}
export default ChatBar;