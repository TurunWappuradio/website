import React, { Component } from 'react';
import MessageInput from './MessageInput';
import MessageFormatter from './MessageFormatter';

const URL = 'ws://localhost:3030';

class Chat extends Component {
  state = {
    messages: []
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    // Connect client
    this.ws.onopen = () => {
      console.log('WS connected');
    };

    // When receiving a message
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);
      this.addMessage(message);
    };

    // When connection closes
    this.ws.onclose = () => {
      console.log('WS disconnected');
      // Try to reconnect
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }));

  submitMessage = (name, messageString) => {
    // on submitting the MessageSend form, send the message, add it to the list and reset the input
    const message = { name: name, message: messageString };
    this.ws.send(JSON.stringify(message));
  };

  render() {
    return (
      <div id="sbMainWrapper">
        <div className="sbMessageArea">
          {this.state.messages.map((message, index) => (
            <MessageFormatter
              key={index}
              message={message.message}
              name={message.name}
            />
          ))}
        </div>
        <div className="sbInputArea">
          <MessageInput
            ws={this.ws}
            onSubmitMessage={(name, messageString) =>
              this.submitMessage(name, messageString)
            }
          />
        </div>
      </div>
    );
  }
}

export default Chat;
