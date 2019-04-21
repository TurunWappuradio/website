import React, { Component } from 'react';

const isButtonDisabled = (message, timeout) => 
  message === '' || timeout;

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      timeout: false
    };
  }

  componentDidUpdate() {
    if (this.state.timeout) {
      // Set 5 second timeout between messages
      setTimeout(() => this.setState({ timeout: false }), 5000);
    }
  }

  render() {
    return (
      <form
        action="."
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: '', timeout: true });
        }}
        className="sbInputForm">
        <div className="sbTextFieldArea">
          <input
            type="text"
            placeholder={'Syötä viesti (max. 200 merkkiä)'}
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            className="sbTextInput"
          />
        </div>
        <div className="sbButtonArea">
          <button
            type="submit"
            value="Send"
            className="sbSubmitButton"
            disabled={isButtonDisabled(
              this.state.message, 
              this.state.timeout
            )}>
            Lähetä
          </button>
        </div>
      </form>
    );
  }
}

export default MessageInput;
