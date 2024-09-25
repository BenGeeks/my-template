import React from 'react';
import { getServerSession } from 'next-auth';

const Dashboard = async () => {
  const session = await getServerSession();
  console.log('SESSION: ', session);
  return (
    <div>
      <h2>Dashboard goes here</h2>
    </div>
  );
};

export default Dashboard;
