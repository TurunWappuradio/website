import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="ShowList">
        <h1 className="ShowList-title">Ohjelmat:</h1>
        <ul>
          <li>Ohjelma1</li>
          <li>Ohjelma2</li>
          <li>Ohjelma3</li>
        </ul>
      </div>
    )
  }
}