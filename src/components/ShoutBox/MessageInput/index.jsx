import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageInput extends Component {
  state = {
    name: '',
    message: '',
    timeout: false
  };

  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    if (this.state.timeout) {
      // Set 5 second timeout between messages
      setTimeout(() => this.setState({ timeout: false }), 5000);
    }
  }

  isButtonDisabled = (name, message) =>
    name === '' || message === '' || this.state.timeout;

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
              disabled={this.isButtonDisabled(
                this.state.name,
                this.state.message
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
