import React, { useState } from 'react';
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

interface DashboardEntry {
  sector: string;
  category: string;
  spend: number;
  percentChange: number;
  absoluteChange: number;
  date: string;
}

interface Props {
  data: DashboardEntry[];
}

const MetricsTable: React.FC<Props> = ({ data }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof DashboardEntry>('sector');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle sorting logic
  const handleRequestSort = (property: keyof DashboardEntry) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // Compare string values (for 'sector' and 'category')
  const compareStrings = (a: string, b: string) => {
    if (a < b) return order === 'asc' ? -1 : 1;
    if (a > b) return order === 'asc' ? 1 : -1;
    return 0;
  };

  // Compare numerical values (for 'spend', '% change', 'absolute change')
  const compareNumbers = (a: number, b: number) => {
    if (a < b) return order === 'asc' ? -1 : 1;
    if (a > b) return order === 'asc' ? 1 : -1;
    return 0;
  };

  // Handle page change for pagination
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get sorted data and paginate

  const sortData = (array: DashboardEntry[]) => {
    return array.sort((a, b) => {
      if (orderBy === 'sector' || orderBy === 'category') {
        return compareStrings(a[orderBy], b[orderBy]);
      }
  
      // Ensure the values are numbers before calling compareNumbers
      const aValue = a[orderBy];
      const bValue = b[orderBy];
  
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return compareNumbers(aValue, bValue);
      }
  
      // If values are not numbers, you can either return 0 or handle this case as needed
      return 0; // Or handle it differently based on your use case
    });
  };

  
  const sortedData = sortData(data);
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'sector'}
                  direction={orderBy === 'sector' ? order : 'asc'}
                  onClick={() => handleRequestSort('sector')}
                >
                  Sector
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleRequestSort('category')}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'spend'}
                  direction={orderBy === 'spend' ? order : 'asc'}
                  onClick={() => handleRequestSort('spend')}
                >
                  Spend ($)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'percentChange'}
                  direction={orderBy === 'percentChange' ? order : 'asc'}
                  onClick={() => handleRequestSort('percentChange')}
                >
                  % Change
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'absoluteChange'}
                  direction={orderBy === 'absoluteChange' ? order : 'asc'}
                  onClick={() => handleRequestSort('absoluteChange')}
                >
                  Absolute Change
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleRequestSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow hover key={row.date + row.category}>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.spend}</TableCell>
                <TableCell>{row.percentChange}%</TableCell>
                <TableCell>{row.absoluteChange}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MetricsTable;
