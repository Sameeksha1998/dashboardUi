import React from 'react';
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
  ListItemButton,
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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Select a Member</DialogTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt={user.name} src={user.image} sx={{ width: 56, height: 56 }} />
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    ID: {user.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <ListItemButton
                    onClick={() => {
                      dispatch({ type: 'SET_SELECTED_USER', payload: user.id });
                      onClose();
                    }}
                  >
                    Select
                  </ListItemButton>
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
