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

    this.changeMessage.bind(this);
    this.changeName.bind(this);
  }

  componentDidUpdate() {
    if (this.state.timeout) {
      // Set 5 second timeout between messages
      setTimeout(() => this.setState({ timeout: false }), 2000);
    }
  }

  changeMessage(ev) {
    ev.preventDefault();
    if (ev.target.value.length >= 200) {
      return;
    }
    this.setState({ message: ev.target.value });
  }

  changeName(ev) {
    ev.preventDefault();
    if (ev.target.value.length >= 10) {
      return;
    }
    this.setState({ name: ev.target.value });
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
        className="sbInputForm">
        <div className="sbTextFieldArea">
          <input
            type="text"
            id="name"
            placeholder="Syötä nimimerkki (max. 10 merkkiä)"
            value={this.state.name}
            onChange={(ev) => this.changeName(ev)}
            className="sbNameInput"
          />
          <input
            type="text"
            placeholder={'Syötä viesti (max. 200 merkkiä)'}
            value={this.state.message}
            onChange={(ev) =>this.changeMessage(ev)}
            className="sbTextInput"
          />
        </div>
        <div className="sbButtonArea">
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
      </form>
    );
  }
}

export default MessageInput;
