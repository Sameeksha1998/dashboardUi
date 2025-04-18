import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { DashboardData, DashboardEntry } from '../types';
import { useSelector } from 'react-redux';
import mockData from '../data/mockData.json';
import { RootState } from '../store';

const AnalyticsView: React.FC = () => {
  const dashboardData = mockData.dashboardData as DashboardData;
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  let data = dashboardData[selectedUserId] || [];

  const [selectedMetric, ] = useState('Spend');

  // Function to format data for time-series chart (Spend over time)
  const getTimeSeriesData = () => {
    const timeSeriesData = data.map((item) => {
      const date = new Date(item.date); // Convert item.date to a Date object
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", item.date);
        return { x: "", y: 0 }; // Handle invalid date
      }
      return {
        x: date, // Pass the Date object
        y: item[selectedMetric.toLowerCase().replace(/ /g, '') as keyof DashboardEntry] || 0,
      };
    });

    return [
      {
        id: selectedMetric,
        data: timeSeriesData,
      },
    ];
  };

  // Function to get comparison data (Percent Change vs Reference)
  const getComparisonData = () => {
    const comparisonData = data.map((item) => ({
      sector: item.sector,
      percentChange: item.percentChange || 0,
      reference: item.reference || 0,
    }));

    return comparisonData;
  };

  // Stacked bar chart data (optional)
  const getStackedBarChartData = () => {
    const sectors = Array.from(new Set(data.map((item) => item.sector)));
    const chartData = sectors.map((sector) => {
      const sectorData = data.filter((item) => item.sector === sector);
      return {
        sector,
        spend: sectorData.reduce((sum, item) => sum + item.spend, 0),
        reference: sectorData.reduce((sum, item) => sum + item.reference, 0),
        percentChange: sectorData.reduce((sum, item) => sum + item.percentChange, 0),
      };
    });

    return chartData;
  };

  return (
    <div>
      <h1>Analytics View</h1>
      <div style={{ height: 400, marginBottom: '20px' }}>
        <ResponsiveLine
          data={getTimeSeriesData()}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: 'native' }} // Set xScale to handle time-based data
          yScale={{ type: 'linear', stacked: false }}
          axisBottom={{
            legend: 'Date',
            legendOffset: 36,
            tickValues: 'every 1 month', // This defines the tick interval
            format: '%b %d, %Y', // This is the format for the date labels
          }}
          axisLeft={{
            legend: selectedMetric,
            legendOffset: -40,
          }}
          colors={{ scheme: 'set2' }}
          lineWidth={2}
          pointSize={8}
          pointColor={{ from: 'color', modifiers: [['darker', 2]] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'color', modifiers: [['darker', 3]] }}
          enableGridX={false}
          animate={true}  // Enable animation (default behavior)
        />


      </div>

      <div style={{ height: 400, marginBottom: '20px' }}>
        <ResponsiveBar
          data={getComparisonData()}
          keys={['percentChange', 'reference']}
          indexBy="sector"
          margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'set2' }}
          axisBottom={{
            tickRotation: -30,
          }}
          axisLeft={{
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}  // Enable animation (default behavior)
        />

      </div>

      <div style={{ height: 400, marginBottom: '20px' }}>
        <ResponsiveBar
          data={getStackedBarChartData()}
          keys={['spend', 'reference', 'percentChange']}
          indexBy="sector"
          margin={{ top: 40, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'set2' }}
          axisBottom={{
            tickRotation: -30,
          }}
          axisLeft={{
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}  // Enable animation (default behavior)
        />
      </div>
    </div>
  );
};

export default AnalyticsView;
