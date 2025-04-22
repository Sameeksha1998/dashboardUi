import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { subMonths, isAfter } from 'date-fns';
import { SelectedMetric, attributeOptions, categories, metrics, sectors } from '../types';

interface Props {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  selectedSector: string | null;
  setSelectedSector: (value: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedAttributes: string[];
  setSelectedAttributes: (value: string[]) => void;
  selectedMetrics: string[];
  setSelectedMetrics: (value: SelectedMetric[]) => void;
  tab: number
}
const FilterPanel: React.FC<Props> = ({
  dateRange,
  setDateRange,
  selectedSector,
  setSelectedSector,
  selectedCategory,
  setSelectedCategory,
  selectedAttributes,
  setSelectedAttributes,
  selectedMetrics,
  setSelectedMetrics,
  tab
}) => {
  // Date range settings
  const minDate = subMonths(new Date(), 12);
  const maxDate = new Date();

  

  return (
    <Box display="flex" flexWrap="wrap" gap={3} mt={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* Use two DatePicker components for start and end dates */}
        <Box display="flex" gap={2}>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(newValue) => {
              if (newValue && dateRange[1] && isAfter(newValue, dateRange[1])) {
                return; // Prevent start date being after end date
              }
              setDateRange([newValue, dateRange[1]]);
            }}
            minDate={minDate}
            maxDate={maxDate}
            disableFuture
          // renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(newValue) => {
              if (newValue && dateRange[0] && isAfter(dateRange[0], newValue)) {
                return; // Prevent end date being before start date
              }
              setDateRange([dateRange[0], newValue]);
            }}
            minDate={minDate}
            maxDate={maxDate}
            disableFuture
          //renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>

      {/* Sector Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sector</InputLabel>
        <Select
          value={selectedSector || ''}
          label="Sector"
          onChange={(e) => setSelectedSector(e.target.value || null)}
        >
          <MenuItem value="">All</MenuItem>
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category Dropdown */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory || ''}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Attribute Multi-select */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Attributes</InputLabel>
        <Select
          multiple
          value={selectedAttributes}
          onChange={(e) => setSelectedAttributes(e.target.value as string[])}
          input={<OutlinedInput label="Attributes" />}
          //renderValue={(selected) => selected.join(', ')}
          renderValue={(selected) =>
            (selected as string[])
              .map((value) => attributeOptions.find((m) => m === value))
              .join(', ')
          }
          
        >
          {attributeOptions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedAttributes.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Metric Multi-select */}
      
      <FormControl sx={{ minWidth: 200 }}>
  <InputLabel id="metric-selector-label" >Metrics</InputLabel>
  <Select
    labelId="metric-selector-label"
    multiple
    input={<OutlinedInput label="Metrics" />}
    value={selectedMetrics}
    onChange={(e) => setSelectedMetrics(e.target.value as SelectedMetric[])}
    renderValue={(selected) =>
      (selected as string[])
        .map((value) => metrics.find((m) => m.value === value)?.label)
        .join(', ')
    }
  >
    {metrics.map((metric) => (
      <MenuItem key={metric.value} value={metric.value}>
        <Checkbox checked={selectedMetrics.indexOf(metric.value) > -1} />
        <ListItemText primary={metric.label} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

      <Button
        variant="outlined"
        onClick={() => {
          setDateRange([null, null]);
          setSelectedSector(null);
          setSelectedCategory(null);
          setSelectedAttributes([]);
          setSelectedMetrics([]);
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterPanel;
