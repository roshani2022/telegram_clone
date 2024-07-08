import React, { useContext, useState } from 'react';
import { Box, IconButton, Avatar, Typography } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { keyframes } from '@mui/system';

// Define the keyframes
const rotate180 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const SidebarHeader = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const [rotateThemeIcon, setRotateThemeIcon] = useState(false);
  const [rotateExpandIcon, setRotateExpandIcon] = useState(false);

  const userInitials = "JD"; // Replace with dynamic user initials
  const fullName = "John Doe"; // Replace with dynamic user full name

  const handleToggleTheme = () => {
    setRotateThemeIcon(!rotateThemeIcon);
    toggleTheme();
  };

  const handleExpandToggle = () => {
    setRotateExpandIcon(!rotateExpandIcon);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: 1,
        borderColor: mode === 'light' ? 'darkcyan' : 'lightcyan',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ mb: 1 }}>{userInitials}</Avatar>
        <Typography variant="body1">{fullName}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton
          onClick={handleToggleTheme}
          color="inherit"
          sx={{
            animation: rotateThemeIcon
              ? `${rotate180} 0.5s ease-in-out forwards`
              : 'none',
          }}
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleExpandToggle}
          sx={{
            animation: rotateExpandIcon
              ? `${rotate180} 0.5s ease-in-out forwards`
              : 'none',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SidebarHeader;
