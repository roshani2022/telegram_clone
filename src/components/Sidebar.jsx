
import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SidebarHeader from './SidebarHeader';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallIcon from '@mui/icons-material/Call';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TelegramIcon from '@mui/icons-material/Telegram';

const Sidebar = ({ drawerOpen, handleDrawerToggle }) => {
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <SidebarHeader handleDrawerToggle={handleDrawerToggle} />
        <List>
          {[
            { text: 'My Profile', icon: <PersonIcon /> },
            { text: 'New Group', icon: <GroupIcon /> },
            { text: 'Contacts', icon: <ContactsIcon /> },
            { text: 'Calls', icon: <CallIcon /> },
            { text: 'People Nearby', icon: <PeopleAltIcon /> },
            { text: 'Saved Messages', icon: <BookmarkIcon /> },
            { text: 'Settings', icon: <SettingsOutlinedIcon /> },
            { text: 'Invite Friends', icon: <PersonAddIcon /> },
            { text: 'Telegram Features', icon: <TelegramIcon /> },
            
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

