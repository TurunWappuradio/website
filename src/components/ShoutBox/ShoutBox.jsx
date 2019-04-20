import React, { Component } from 'react';
import MessageInput from './MessageInput/MessageInput';
import MessageFormatter from './MessageFormatter';

const wsURL = process.env.SHOUTBOX_SOURCE;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      wsConnected: false,
      colorSwitcher: false
    };

    this.ws = new WebSocket(wsURL);

    this.addMessage.bind(this);
    this.submitMessage.bind(this);
  }

  componentDidMount() {
    // Connect client
    this.ws.onopen = () => {
      this.setState({ wsConnected: true });
      console.log('WS connected');
    };

    // When receiving a message
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);
      if (message.name && message.message) {
        this.addMessage(message);
      }
    };

    // When connection closes
    this.ws.onclose = () => {
      this.setState({ wsConnected: false });
      console.log('WS disconnected');
      // Try to reconnect
      this.setState({
        ws: new WebSocket(wsURL)
      });
    };
  }

  addMessage(message) {
    this.setState(state => ({ messages: [message, ...state.messages] }));
  }

  submitMessage(name, messageString) {
    // on submitting the MessageSend form, send the message, add it to the list and reset the input
    this.setState({ colorSwitcher: !this.state.colorSwitcher });
    const message = {
      name: name,
      message: messageString,
      color: this.state.colorSwitcher
    };
    this.ws.send(JSON.stringify(message));
  }

  render() {
    return (
      <div className="sbMainWrapper">
        <div className="sbMessageArea">
          {this.state.messages.map((message, index) => (
            <MessageFormatter
              key={index}
              message={message.message}
              name={message.name}
              color={message.color}
            />
          ))}
          {!this.state.wsConnected && (
            <div className="sbNotConnectedText">
              Ei yhteyttä chat-palvelimeen
            </div>
          )}
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
