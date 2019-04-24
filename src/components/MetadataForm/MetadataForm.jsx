import React, { Component } from 'react';
import Button from "../common/Button";
import TextField from "../common/TextField";

const METADATA_API = process.env.METADATA_API || 'http://localhost:3031/newsong';

class MetadataForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      track: '',
      password: '',
      error: null
    };

    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleArtistChange(ev) {
    ev.preventDefault();
    this.setState({ artist: ev.target.value });
  }

  handleTrackChange(ev) {
    ev.preventDefault();
    this.setState({ track: ev.target.value });
  }

  handlePasswordChange(ev) {
    ev.preventDefault();
    this.setState({ password: ev.target.value });
  }

  handleSubmitClick(ev) {
    ev.preventDefault();

    const { artist, track, password } = this.state;

    const body = JSON.stringify({
      song: `${artist} - ${track}`,
      password
    });

    fetch(METADATA_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body
    })
      .catch(err => console.error(err));
  }

  render() {
    const { artist, track, password, error } = this.state;

    const renderLabel = label => (
      <div className="FieldLabel">{label}</div>
    );

    return (
      <div className="MetadataFormContainer">
        {error}
        <div className="FieldWrapper">
          <TextField label={renderLabel('Artisti')}
                     placeholder="Artistin nimi"
                     value={artist}
                     onChange={this.handleArtistChange}/>
        </div>
        <div className="FieldWrapper">
          <TextField label={renderLabel('Kappale')}
                     placeholder="Kappaleen nimi"
                     value={track}
                     onChange={this.handleTrackChange}/>
        </div>
        <div className="FieldWrapper">
          <TextField label={renderLabel('Salasana')}
                     placeholder="Ootsä varmasti Wappuradion tyyppi?"
                     value={password}
                     onChange={this.handlePasswordChange}
                     type="password"/>
        </div>
        <div className="ButtonWrapper">
          <Button disabled={artist === '' || track === '' || password === ''}
                  type="submit"
                  value="Send"
                  onClick={this.handleSubmitClick}>
            Tallenna
          </Button>
        </div>
      </div>
    );
  }
}

export default MetadataForm;
