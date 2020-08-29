import React, { Component } from 'react';
import NameFormatter from '../NameFormatter';
import TextField from '../../common/TextField';

const isButtonDisabled = (message, timeout) => message === '' || timeout;

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      timeout: false
    };

    this.changeMessage.bind(this);
  }

  componentDidUpdate() {
    if (this.state.timeout) {
      // Set 5 second timeout between messages
      setTimeout(() => this.setState({ timeout: false }), 2000);
    }
  }

  changeMessage(ev) {
    ev.preventDefault();
    if (ev.target.value.length > 200) {
      return;
    }
    this.setState({ message: ev.target.value });
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
        <TextField
          label={<NameFormatter name={this.props.name} />}
          placeholder={'Syötä viesti (max. 200 merkkiä)'}
          value={this.state.message}
          onChange={ev => this.changeMessage(ev)}
        />
        <div className="sbButtonArea">
          <button
            type="submit"
            value="Send"
            className="sbSubmitButton"
            disabled={isButtonDisabled(this.state.message, this.state.timeout)}>
            Lähetä
          </button>
        </div>
      </form>
    );
  }
}

export default MessageInput;
