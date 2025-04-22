import React, { useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { DashboardEntry, MetricData, SelectedMetric  } from '../types';

// interface DashboardEntry {
//   category: string;
//   sector: string;
//   country: string;
//   [key: string]: string | number | MetricData | undefined; 
// }

interface BarChartProps {
  data: DashboardEntry[]; 
  selectedMetrics: SelectedMetric[]; // Array of selected metrics
  groupBy: 'category' | 'sector' | 'country'; // New prop to control grouping
}

const BarChart: React.FC<BarChartProps> = ({ data, selectedMetrics, groupBy = 'category' }) => {
  // Prepare data for the bar chart based on the selected group
  const chartData = data.map(entry => {
    const groupKey = entry[groupBy] || 'Unknown'; // Group by category, sector, or country

    // Dynamically create the metrics data based on selected metrics
    const metricsData = selectedMetrics.reduce((acc, metric) => {
      const metricData = entry[metric] as MetricData | undefined;
      acc[metric] = metricData ? metricData.current : 0; // Use current value if available
      return acc;
    }, {} as Record<SelectedMetric, number>);

    // Return the structured data with the group key and metrics
    return { [groupBy]: groupKey, ...metricsData };
  });

  // Define the keys for the bar chart based on selected metrics
  const keys = selectedMetrics;

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={keys}
        indexBy={groupBy} // Dynamically use the groupBy field for the x-axis
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: groupBy.charAt(0).toUpperCase() + groupBy.slice(1), // Capitalize first letter of groupBy
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
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        // motionStiffness={90}
        // motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
