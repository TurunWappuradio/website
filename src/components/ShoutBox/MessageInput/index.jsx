import React, { Component } from 'react';

const isButtonDisabled = (name, message, timeout) =>
  name === '' || message === '' || timeout;

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
          this.props.onSubmitMessage(this.state.name, this.state.message);
          this.setState({ message: '', timeout: true });
        }}
        style={{ margin: 0 }}>
        <div className="sbTextFieldArea">
          <div className="sbTextFieldInnerArea">
            <input
              type="text"
              id="name"
              placeholder="Syötä nimimerkki (max. 10 merkkiä)"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              className="sbNameInput"
            />
            <input
              type="text"
              placeholder={'Syötä viesti (max. 200 merkkiä)'}
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              className="sbTextInput"
            />
          </div>
        </div>
        <div className="sbButtonArea">
          <div className="sbButtonInnerArea">
            <button
              type="submit"
              value="Send"
              className="sbSubmitButton"
              disabled={isButtonDisabled(
                this.state.name,
                this.state.message,
                this.state.timeout
              )}>
              Lähetä
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageInput;
