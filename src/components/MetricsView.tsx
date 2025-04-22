import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import FilterPanel from '../Filters/FilterPanel';
import MetricsTable from '../Filters/MetricsTable';
import { DashboardEntry, SelectedMetric } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MetricsBarChart from './MetricsBarChart';
import sampleData from '../data/sampleData';

interface MetricsViewProps {}

const MetricsView: React.FC<MetricsViewProps> = () => {
  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);

  // Tab for switching views
  const [tab, setTab] = useState<number>(0);

  // Filters
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<SelectedMetric[]>([]);

  const dashboardData = sampleData;

  const filteredData = useMemo(() => {
    let userData = dashboardData[selectedUserId] || [];

    if (selectedSector) {
      userData = userData.filter((item: DashboardEntry) => item.sector === selectedSector);
    }
    if (selectedCategory) {
      userData = userData.filter((item: DashboardEntry) => item.category === selectedCategory);
    }
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0];
      const endDate = dateRange[1];
  
      userData = userData.filter((item: DashboardEntry) => {
        const itemStartDate = new Date(item.startDate);
        const itemEndDate = new Date(item.endDate);
  
        return (
          (itemStartDate >= startDate && itemStartDate <= endDate) ||
          (itemEndDate >= startDate && itemEndDate <= endDate) ||
          (itemStartDate <= startDate && itemEndDate >= endDate) // Covers cases where the range is fully contained
        );
      });
    }

    return userData;
  }, [selectedUserId, dashboardData, selectedSector, selectedCategory, dateRange]);

  const groupedData = useMemo(() => {
    if (selectedAttributes.length > 0) {
      const grouped = filteredData.reduce((acc, row) => {
        // Create a composite key based on selected attributes
        const groupKey = selectedAttributes
          .map(attr => row[attr.toLowerCase() as keyof DashboardEntry]) // Type assertion
          .join('|'); // e.g., "India|Maharashtra|Mumbai"
  
        if (!acc[groupKey]) {
          // Initialize the group with the current row
          acc[groupKey] = { ...row };
        } else {
          // Aggregate the metrics
          acc[groupKey].mySpend.current += row.mySpend.current;
          acc[groupKey].mySpend.reference += row.mySpend.reference;
          acc[groupKey].mySpend.absoluteChange += row.mySpend.absoluteChange;
          acc[groupKey].mySpend.percentChange = ((acc[groupKey].mySpend.current - acc[groupKey].mySpend.reference) / acc[groupKey].mySpend.reference) * 100;
  
          acc[groupKey].sameStoreSpend.current += row.sameStoreSpend.current;
          acc[groupKey].sameStoreSpend.reference += row.sameStoreSpend.reference;
          acc[groupKey].sameStoreSpend.absoluteChange += row.sameStoreSpend.absoluteChange;
          acc[groupKey].sameStoreSpend.percentChange = ((acc[groupKey].sameStoreSpend.current - acc[groupKey].sameStoreSpend.reference) / acc[groupKey].sameStoreSpend.reference) * 100;
  
          acc[groupKey].newStoreSpend.current += row.newStoreSpend.current;
          acc[groupKey].newStoreSpend.reference += row.newStoreSpend.reference;
          acc[groupKey].newStoreSpend.absoluteChange += row.newStoreSpend.absoluteChange;
          acc[groupKey].newStoreSpend.percentChange = ((acc[groupKey].newStoreSpend.current - acc[groupKey].newStoreSpend.reference) / acc[groupKey].newStoreSpend.reference) * 100;
  
          acc[groupKey].lostStoreSpend.current += row.lostStoreSpend.current;
          acc[groupKey].lostStoreSpend.reference += row.lostStoreSpend.reference;
          acc[groupKey].lostStoreSpend.absoluteChange += row.lostStoreSpend.absoluteChange;
          acc[groupKey].lostStoreSpend.percentChange = ((acc[groupKey].lostStoreSpend.current - acc[groupKey].lostStoreSpend.reference) / acc[groupKey].lostStoreSpend.reference) * 100;
        }
        return acc;
      }, {} as Record<string, DashboardEntry>);
  
      return Object.values(grouped); // Convert the grouped object back to an array
    }
    return filteredData; // Return ungrouped data if no attributes are selected
  }, [filteredData, selectedAttributes]);


const groupBy = selectedAttributes[selectedAttributes.length - 1]?.toLowerCase() as "category" | "sector" | "country"; // Ensure it's a valid key

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
        tab={tab}
      />

      <Box mt={3}>
      <Tabs
  value={tab}
  onChange={(_, newValue) => setTab(newValue)} 
  aria-label="Metrics View Tabs"
  textColor="inherit"
  TabIndicatorProps={{
    style: {
      backgroundColor: 'rgb(244, 117, 96)', // this makes the underline white
      height: '3px',             // optional: makes the underline a bit thicker
    },
  }}
  sx={{ flexGrow: 1 }}
>
          <Tab label="Table" />
          <Tab label="Bar Chart" />
        </Tabs>
      </Box>

      <Box mt={3}>
        {tab === 0 ? (
          <>
            <Typography variant="h6">User Dashboard Data</Typography>
            <MetricsTable 
  data={filteredData} 
  selectedMetrics={selectedMetrics}
  selectedAttributes={selectedAttributes}
  groupedData={groupedData}
/>
          </>
        ) : (
          selectedMetrics.length === 1 && (
            <Box mt={4}>
              <Typography variant="h6">
                {selectedMetrics[0]} per {selectedAttributes[selectedAttributes.length - 1] || 'Category'}
              </Typography>
              <MetricsBarChart
               data={groupedData ? groupedData: filteredData} 
                selectedMetrics={selectedMetrics}
                groupBy={groupBy} 
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default MetricsView;
