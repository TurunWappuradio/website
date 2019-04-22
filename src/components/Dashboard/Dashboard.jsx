import React from 'react';
import ShoutBox from "../ShoutBox/ShoutBox";

const Dashboard = props => {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  return (
    <div style={{ height: 500 }}>
      <div className="dashboardTime">{time}</div>
      <h1>Shoutbox</h1>
      <ShoutBox limit={200}/>
    </div>
  )
};

export default Dashboard;
