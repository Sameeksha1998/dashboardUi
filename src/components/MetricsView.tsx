import React, { useState, useMemo } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import FilterPanel from '../Filters/FilterPanel';
import MetricsTable from '../Filters/MetricsTable';
import mockData from '../data/mockData.json';
import { DashboardData, DashboardEntry } from '../types';
import { isAfter } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MetricsBarChart from './MetricsBarChart';

interface MetricsViewProps {}

const MetricsView: React.FC<MetricsViewProps> = () => {
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  // Tab for switching views
  const [tab, setTab] = useState(0);

  // Filters
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const dashboardData = mockData.dashboardData as DashboardData;

  const filteredData = useMemo(() => {
    let userData = dashboardData[selectedUserId] || [];

    if (selectedSector) {
      userData = userData.filter((item: DashboardEntry) => item.sector === selectedSector);
    }
    if (selectedCategory) {
      userData = userData.filter((item: DashboardEntry) => item.category === selectedCategory);
    }
    if (dateRange[0] && dateRange[1]) {
      userData = userData.filter((item: DashboardEntry) => {
        const itemDate = new Date(item.date);
        return (
          isAfter(itemDate, dateRange[0] as Date) &&
          isAfter(dateRange[1] as Date, itemDate)
        );
      });
    }

    return userData;
  }, [selectedUserId, dashboardData, selectedSector, selectedCategory, dateRange]);

  return (
    <Box p={2}>
      <FilterPanel
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
      />

      <Box mt={3}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} aria-label="Metrics View Tabs">
          <Tab label="Table" />
          <Tab label="Bar Chart" />
        </Tabs>
      </Box>

      <Box mt={3}>
        {tab === 0 ? (
          <>
            <Typography variant="h6">User Dashboard Data</Typography>
            <MetricsTable data={filteredData} />
          </>
        ) : (
          selectedMetrics.length === 1 && (
            <Box mt={4}>
              <Typography variant="h6">
                {selectedMetrics[0]} per {selectedAttributes.includes('Category') ? 'Category' : 'Sector'}
              </Typography>
              <MetricsBarChart
                data={filteredData}
                selectedMetric={selectedMetrics[0]}
                groupBy={selectedAttributes.includes('Category') ? 'category' : 'sector'}
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default MetricsView;
