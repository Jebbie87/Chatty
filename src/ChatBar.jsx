import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props)
    this.state = {value: '',
                  name:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUser   = this.handleUser.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleUser(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event) {
    // let name = null;
    // if (this.state.name == '') {
    //   name = 'Anonymous';
    // } else {
    //   name = this.state.name
    // }
    console.log("in handle", this.props.name)
    event.preventDefault();
    this.props.newMessage({username: this.props.name,
                           content: this.state.value})

    this.props.currentUser({name: this.props.name})
    this.setState({value: ''})
  }

  render() {

    return (
    <footer>
      <form onSubmit={this.handleSubmit}>
        <input value={this.props.name} onChange={this.handleUser} id="username" type="text" placeholder="Your Name (Optional)" />
        <input value={this.state.value} onChange={this.handleChange} id="new-message" type="submit text" placeholder="Type a message and hit ENTER" />
        <input id="chat-submit" type="submit"/>
      </form>
    </footer>
    );
  }
}
export default ChatBar;