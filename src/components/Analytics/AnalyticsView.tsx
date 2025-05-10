// Dashboard.tsx
import React from 'react';
import sampleData from '../../data/sampleData';
import TimeSeriesChart from './TimeSeriesChart';
import ComparisonChart from './ComparisionChart';
import StackedBarChart from './StackedBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard: React.FC = () => {
  const dashboardData = sampleData;
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  let userData = dashboardData[selectedUserId] || [];


  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Spend Over Time</h2>
      <TimeSeriesChart data={userData} />
      
      <h2>Comparison of Percent Change vs Reference</h2>
      <ComparisonChart data={userData} />
      
      <h2>Stacked Bar Chart</h2>
      <StackedBarChart data={userData} />
    </div>
  );
};

export default Dashboard;