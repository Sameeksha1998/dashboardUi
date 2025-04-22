import React, { useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Paper,
} from '@mui/material';
import mockData from '../data/mockData.json';
import { User } from '../types';
import { useDispatch } from 'react-redux';

interface Props {
  open: boolean;
  onClose: () => void;
}

const users: User[] = mockData.users;

const MyMembersModal: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const handleSelectUser = useCallback(
    (userId: string) => {
      dispatch({ type: 'SET_SELECTED_USER', payload: userId });
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Select a Member</DialogTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => handleSelectUser(user.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Avatar alt={user.name} src={user.image} sx={{ width: 56, height: 56 }} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {user.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={500}>
                    {user.name}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

export default MyMembersModal;
