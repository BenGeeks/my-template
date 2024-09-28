import React from 'react';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';

const Dashboard = async () => {
  const session = await getServerSession(options);
  console.log('SESSION: ', session);
  return (
    <div>
      <h2>Dashboard goes here</h2>
    </div>
  );
};

export default Dashboard;
