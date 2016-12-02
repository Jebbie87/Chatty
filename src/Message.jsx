import React, {Component} from 'react';

class Message extends Component {

  render() {
    const { color, username, content } = this.props.message
    const colour = {color: color}
    return (
      <div className="message">
        <span style={colour} className="username">{username}</span>

        <span className="content"><img src={this.props.imageurl}></img>{content}</span>
      </div>
    );
  }
}
export default Message;