import React, {Component} from 'react';

const imageURLCheck = (message) => {
  return message.match(/(?:(?:(?:ftp|http|https|www)[s]*:\/\/|www\.)[^\.]+\.[^ \n]+)(?:.png|.jpg|.gif)/gi);
}

class Message extends Component {

  render() {
    const { color, username, content } = this.props.message;
    let url = '';
    let message = content;
    const colour = {color: color};
    const width = {'maxWidth': '60%'};

    if (imageURLCheck(content)) {
      url = imageURLCheck(content);
      message = content.split(url)[0];
    };

    return (
      <div className="message">
        <span style={colour} className="username">{username}</span>
        <span className="content">{message}<br/><img style={width} src={url}></img></span>
      </div>
    );
  }
}
export default Message;