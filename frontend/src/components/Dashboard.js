// client/src/components/Dashboard.js
import React, { useState } from 'react';
import UserDetails from './UserDetails';
import AccountCreation from './AccountCreation';
import "./Dashboard.css"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('userDetails');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>

    <div className="Dashboard">
      <h1>Dashboard</h1>
      <div>
        <button className='btn active' onClick={() => handleTabChange('userDetails')}>User Details</button>
        <button className='btn active' onClick={() => handleTabChange('accountCreation')}>Account Creation</button>
      </div>
   
    </div>
       <div>
       {activeTab === 'userDetails' ? <UserDetails /> : <AccountCreation />}
       </div>
       </>
       
  );
};

export default Dashboard;
