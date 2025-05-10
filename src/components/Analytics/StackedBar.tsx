// StackedBarChart.tsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { DashboardEntry } from '../../types';

interface StackedBarChartProps {
  data: DashboardEntry[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const chartData = data.map(entry => ({
    category: entry.category,
    mySpend: entry.mySpend.current,
    sameStoreSpend: entry.sameStoreSpend.current,
    newStoreSpend: entry.newStoreSpend.current,
    lostStoreSpend: entry.lostStoreSpend.current,
  }));

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['mySpend', 'sameStoreSpend', 'newStoreSpend', 'lostStoreSpend']}
        indexBy="category"
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Spend',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        // motionStiffness={90}
        // motionDamping={15}
      />
    </div>
  );
};

export default StackedBarChart;