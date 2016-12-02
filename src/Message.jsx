import React, {Component} from 'react';

class Message extends Component {

  render() {
    const colour = {color: this.props.message.color}
    return (
      <div className="message">
        <span style={colour} className="username">{this.props.message.username}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;