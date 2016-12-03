import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const { messages, nameChanged } = this.props;
    return (
      <div id="message-list">
        {messages.map((message, index) =>
          <Message key = {index} message = {message} />
        )}
        <div className="message system">
          {nameChanged}
        </div>
      </div>
    );
  }
}

export default MessageList;