// ComparisonChart.tsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { DashboardEntry } from '../../types';


interface ComparisonChartProps {
  data: DashboardEntry[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  // Prepare data for the comparison chart
  const chartData = data.map(entry => ({
    category: entry.category,
    percentChange: entry.mySpend.percentChange,
    reference: entry.mySpend.reference,
  }));

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['percentChange', 'reference']}
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
          legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
      />
    </div>
  );
};

export default ComparisonChart;