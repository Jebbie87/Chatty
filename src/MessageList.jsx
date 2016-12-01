import React, {Component} from 'react';
import Message from './Message.jsx';
import uuid from 'node-uuid';

class MessageList extends Component {

  render() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) =>
          <Message key={uuid.v1()} username={message.username} content={message.content} />
        )}
        <div className="message system">
          {this.props.nameChanged}
        </div>
      </div>
    );
  }
}

export default MessageList;