import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleUser = (event) => {
    this.props.newUser(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendToServer({username: this.props.currentUser.name,
                           content: this.state.value})
    this.setState({value: ''})
  }

  render() {

    return (
    <footer>
      <form onSubmit={this.handleSubmit}>
        <input value={this.props.currentUser.name} onChange={this.handleUser} id="username" type="text" placeholder="Your Name (Optional)" />
        <input value={this.state.value} onChange={this.handleChange} id="new-message" type="submit text" placeholder="Type a message and hit ENTER" />
        <input id="chat-submit" type="submit"/>
      </form>
    </footer>
    );
  }
}
export default ChatBar;