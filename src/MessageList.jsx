import React, {Component} from 'react';
import Message from './Message.jsx';
import uuid from 'node-uuid';


class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) =>
          <Message key={uuid.v1()} message={message} />
        )}
        <div className="message system">
          {this.props.nameChanged}
        </div>
      </div>
    );
  }
}

export default MessageList;