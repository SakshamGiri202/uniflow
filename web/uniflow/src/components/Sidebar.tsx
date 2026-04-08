import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>Dashboard</li>
        <li>Profile</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;