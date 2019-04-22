import React, { Component } from 'react';
import MessageInput from './MessageInput/MessageInput';
import NameInput from './NameInput';
import MessageFormatter from './MessageFormatter';

const wsURL = 'ws://localhost:3030';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      isAdmin: false,
      messages: [],
      wsConnected: false,
      colorSwitcher: false
    };

    this.addMessage.bind(this);
    this.submitMessage.bind(this);
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.handleBanClick = this.handleBanClick.bind(this);

    this.messagesViewport = React.createRef();
  }

  componentDidMount() {
    this.connectWebSocket();
  }

  connectWebSocket() {
    this.ws = new WebSocket(wsURL);

    // Connect client
    this.ws.onopen = () => {
      if (!!this.state.name) {
        this.handleSubmitName(this.state.name);
      }

      this.setState({ wsConnected: true });
    };

    // When receiving a message
    this.ws.onmessage = e => {
      if (e.data === 'PING') {
        return this.ws.send('PONG');
      }

      const { type, name, message } = JSON.parse(e.data);

      if (type === 'message' && name && message) {
        this.addMessage({ name, message });
      }
      else if (type === 'admin') {
        this.setState({ isAdmin: true });
      }
    };

    // When connection closes
    this.ws.onclose = () => {
      this.setState({ wsConnected: false });

      // Try to reconnect after 5 seconds
      setTimeout(this.connectWebSocket, 5000);
    };
  }

  addMessage(message) {
    message = {
      ...message,
      color: this.state.colorSwitcher
    };

    this.setState({
      messages: [...this.state.messages, message],
      colorSwitcher: !this.state.colorSwitcher
    });
    this.scrollToBottom();
  }

  submitMessage(messageString) {
    // on submitting the MessageSend form, send the message, add it to the list and reset the input
    const message = {
      type: 'message',
      name: this.state.name,
      message: messageString
    };
    this.ws.send(JSON.stringify(message));
  }

  handleSubmitName(name) {
    const message = {
      type: 'init',
      name
    };

    this.ws.send(JSON.stringify(message));
  }

  handleBanClick(name) {
    const message = {
      type: 'ban',
      name: this.state.name,
      message: name
    };

    this.ws.send(JSON.stringify(message));
  }

  scrollToBottom() {
    const el = this.messagesViewport.current;
    el.scrollTo(0, el.scrollHeight);
  }

  render() {
    return (
      <div className="sbMainWrapper">
        <div className="sbMessageArea" ref={this.messagesViewport}>
          {this.state.messages.map((message, index) => (
            <MessageFormatter
              key={index}
              message={message.message}
              name={message.name}
              color={message.color}
              isAdmin={this.state.isAdmin}
              onBanClick={this.handleBanClick}
            />
          ))}
          {!this.state.wsConnected && (
            <div className="sbNotConnectedText">
              Ei yhteyttä chat-palvelimeen
            </div>
          )}
        </div>
        <div className="sbInputArea">
          {this.state.name ? (
            <MessageInput
              ws={this.ws}
              onSubmitMessage={messageString =>
                this.submitMessage(messageString)
              }
            />
          ) : (
            <NameInput
              ws={this.ws}
              onSubmitName={(name) => {
                this.handleSubmitName(name);
                this.setState({ name });
              }}
            />)}
        </div>
      </div>
    );
  }
}

export default Chat;
