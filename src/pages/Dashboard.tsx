import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, AppBar, Toolbar, IconButton, Button, Avatar, Tooltip } from '@mui/material';
import { useNavigate , Outlet} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MyMembersModal from '../components/MyMembersModal';
import { User } from '../types';
import mockData from '../data/mockData.json';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const Dashboard = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [tab, setTab] = useState<number>(0);

  const selectedUserId = useSelector((state: RootState) => state.user.selectedUserId);
  const users = mockData.users as User[];

  useEffect(() => {
    const foundUser = users.find((u) => u.id === selectedUserId);
    setUser(foundUser);
  }, [selectedUserId , users ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);

    // Change the route based on the selected tab
    if (newValue === 0) {
      navigate('/');
    } else {
      navigate('/analytics');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'rgb(244, 117, 96)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tabs
  value={tab}
  onChange={handleTabChange}
  aria-label="Dashboard tabs"
  textColor="inherit"
  TabIndicatorProps={{
    style: {
      backgroundColor: 'white', // this makes the underline white
      height: '3px',             // optional: makes the underline a bit thicker
    },
  }}
  sx={{ flexGrow: 1 }}
>
            <Tab label="Metrics View" />
            <Tab label="Analytics View" />
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              My Members
            </Button>

            <Tooltip title={user?.name || 'User'}>
              <IconButton>
                {user?.image ? (
                  <Avatar alt={user.name} src={user.image} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <MyMembersModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Route Content */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
