import React, { Component } from 'react';
import { format } from 'date-fns';
import ShoutBox from '../ShoutBox/ShoutBox';

const getTime = () => {
  return format(new Date(), 'HH:mm');
};

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      time: getTime()
    };
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          time: getTime()
        }),
      5000
    );
  }

  render() {
    return (
      <div style={{ height: 500 }}>
        <div className="dashboardTime">{this.state.time}</div>
        <h1>Shoutbox</h1>
        <ShoutBox limit={200} isOpen={true} />
      </div>
    );
  }
}

export default Dashboard;
