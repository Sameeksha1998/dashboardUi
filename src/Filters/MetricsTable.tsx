import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableSortLabel,
  TablePagination,
} from '@mui/material';
import { DashboardEntry, MetricData } from '../types';

interface Props {
  data: DashboardEntry[];
  selectedMetrics: (keyof DashboardEntry)[];
  selectedAttributes: string[];
  groupedData: DashboardEntry[];
}

type Order = 'asc' | 'desc';

interface Column {
  id: keyof DashboardEntry;
  label: string;
  visible: boolean;
}

type MetricField = 'current' | 'reference' | 'absoluteChange' | 'percentChange';

const MetricsTable: React.FC<Props> = ({
  selectedMetrics,
  selectedAttributes,
  groupedData,
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('sector');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...groupedData].sort((a, b) => {
      if (orderBy.includes('.')) {
        const [metric, prop] = orderBy.split('.') as [keyof DashboardEntry, MetricField];
        const aMetric = a[metric] as MetricData | undefined;
        const bMetric = b[metric] as MetricData | undefined;
        const aValue = aMetric?.[prop];
        const bValue = bMetric?.[prop];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      }

      if (orderBy === 'dateRange') {
        const aValue = new Date(a.startDate).getTime();
        const bValue = new Date(b.startDate).getTime();
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aValue = a[orderBy as keyof DashboardEntry];
      const bValue = b[orderBy as keyof DashboardEntry];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [groupedData, order, orderBy]);

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const attributeColumns: Column[] = [
    { id: 'country', label: 'Country', visible: selectedAttributes.includes('Country') },
    { id: 'state', label: 'State', visible: selectedAttributes.includes('State') },
    { id: 'city', label: 'City', visible: selectedAttributes.includes('City') },
    { id: 'sector', label: 'Sector', visible: true },
    { id: 'category', label: 'Category', visible: true },
  ].filter(col => col.visible);

  const metricsToShow = selectedMetrics.length > 0
    ? selectedMetrics
    : ['mySpend', 'sameStoreSpend', 'newStoreSpend', 'lostStoreSpend'] as (keyof DashboardEntry)[];

  const formatMetricName = (metric: string) =>
    metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  const metricFields: MetricField[] = ['current', 'reference', 'absoluteChange', 'percentChange'];

  return (
    <Paper sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {attributeColumns.map((column) => (
                <TableCell key={column.id as string}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id as string)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {metricsToShow.map((metric) => (
                <TableCell colSpan={4} key={metric as string} align="center">
                  {formatMetricName(metric as string)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {attributeColumns.map((column) => (
                <TableCell key={`${column.id}-header`} />
              ))}
              {metricsToShow.flatMap((metric) =>
                metricFields.map((field) => (
                  <TableCell key={`${metric as string}-${field}`}>
                    <TableSortLabel
                      active={orderBy === `${metric as string}.${field}`}
                      direction={orderBy === `${metric as string}.${field}` ? order : 'asc'}
                      onClick={() => handleRequestSort(`${metric as string}.${field}`)}
                    >
                      {field === 'absoluteChange' ? 'Δ Abs' : field === 'percentChange' ? 'Δ %' : formatMetricName(field)}
                    </TableSortLabel>
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow hover key={index}>
                {attributeColumns.map((column) => (
                  <TableCell key={`${column.id}-${index}`}>
                    {row[column.id] as React.ReactNode}
                  </TableCell>
                ))}
                {metricsToShow.flatMap((metric) => {
                  const metricData = row[metric] as MetricData | undefined;
                  return metricFields.map((field) => (
                    <TableCell key={`${metric as string}-${field}-${index}`}>
                      {metricData?.[field] != null 
                        ? field.includes('Change') 
                          ? field === 'percentChange'
                            ? `${metricData[field].toFixed(2)}%`
                            : `$${metricData[field].toLocaleString()}`
                          : `$${metricData[field].toLocaleString()}`
                        : '-'}
                    </TableCell>
                  ));
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={groupedData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_: unknown, newPage: number) => setPage(newPage)}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default MetricsTable;