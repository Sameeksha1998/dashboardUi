import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { DashboardEntry } from '../types';

interface Props {
  data: DashboardEntry[];
  selectedMetric: string;
  groupBy: 'category' | 'sector';
}

const MetricsBarChart: React.FC<Props> = ({ data, selectedMetric, groupBy }) => {
  // Map selectedMetric to the actual lowercase property
  const metricMapping: Record<string, keyof DashboardEntry> = {
    Spend: 'spend',
    Reference: 'reference',
    PercentChange: 'percentChange',
    AbsoluteChange: 'absoluteChange',
  };
  


  // Get the correct metric key from the mapping
  const metricKey = metricMapping[selectedMetric];

  if (!metricKey) {
    // Handle the case where the metric doesn't exist in the mapping
    console.error(`Invalid metric selected: ${selectedMetric}`);
    return null;
  }

  const groupedData: Record<string, number> = {};

  data.forEach((item) => {
    const key = item[groupBy];
    const metricValue = item[metricKey];

    if (typeof metricValue === 'number') {
      groupedData[key] = (groupedData[key] || 0) + metricValue;
    }
  });

  const chartData = Object.entries(groupedData).map(([key, value]) => ({
    [groupBy]: key,
    [selectedMetric]: value, // Using selectedMetric as label here
  }));

  if (!chartData) {
    return <div>Please select a metric to display the chart.</div>;
  }

 return (
  <div style={{ height: 400 }}>
    <ResponsiveBar
      data={chartData}
      keys={[selectedMetric]}
      indexBy={groupBy}
      margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'set2' }}
      axisBottom={{
        tickRotation: -30,
      }}
      axisLeft={{
        legend: selectedMetric,
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate = {true}
     
    />
  </div>
);
    }

export default MetricsBarChart;
