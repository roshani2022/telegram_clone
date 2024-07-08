// src/components/Header.jsx
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ handleDrawerToggle }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
        Welcome to Telegram
      </Typography>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
