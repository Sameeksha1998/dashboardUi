// TimeSeriesChart.tsx
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { DashboardEntry } from '../../types';


interface TimeSeriesChartProps {
  data: DashboardEntry[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  // Prepare data for the time series chart
  const chartData = data.map(entry => ({
    x: entry.startDate, // Assuming you want to plot based on startDate
    y: entry.mySpend.current,
  }));

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={[
          {
            id: 'Spend',
            data: chartData.map(d => ({ x: d.x, y: d.y })),
          },
        ]}
        colors={{ scheme: 'nivo' }}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
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
        enablePoints={true}
        pointSize={10}
        pointColor={{ from: 'color', modifiers: [['brighter', 0.5]] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={true}
        areaOpacity={0.1}
        useMesh={true}
        animate={true}
        // motionStiffness={90}
        // motionDamping={15}
      />
    </div>
  );
};

export default TimeSeriesChart;