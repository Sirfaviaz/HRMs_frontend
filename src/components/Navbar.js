import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout'; // Import the logout icon
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import ClockInOutButtons from './RightContent/Navbar/ClockInOutButtons'; // Import ClockInOutButtons component
import logo from './logo.png';

const Navbar = ({ selectedOption, toggleSidebar, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to control avatar dropdown
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search box visibility in mobile
  const theme = useTheme(); // Get the current theme
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  const open = Boolean(anchorEl); // Determine if the avatar menu is open

  // Handle click on the avatar to open the dropdown
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle search toggle in mobile view
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search visibility
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '1px solid #e0e0e0', // light border
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        {/* Left section with clickable logo to toggle sidebar */}
        <Box display="flex" alignItems="center">
        <Box
          onClick={toggleSidebar} // Toggle sidebar visibility when clicked
          sx={{
            width: 80,
            height: 80,
            bgcolor: '#e0e0e0',
            borderRadius: '50%',
            marginRight: 2, // Smaller margin between logo and selectedOption
            cursor: 'pointer', // Show pointer to indicate clickability
            display: 'flex', // Center the logo inside the box
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden', // Make sure the logo doesn't overflow the rounded box
          }}
        >
          <img
            src={logo} // Replace this with your logo path
            alt="Logo"
            style={{
              width: '100%', // Ensures the logo fits inside the box
              height: '100%',
              objectFit: 'cover', // Maintain aspect ratio and cover the entire box
            }}
          />
        </Box>
          {/* Selected Option, slightly closer to the logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              ml: 2, // Shift selectedOption towards the logo
              display: { xs: isSearchOpen ? 'none' : 'block', md: 'block' }, // Hide title when search is open on small screens
            }}
          >
            {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
          </Typography>
        </Box>

        {/* Search bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: isSearchOpen ? '100%' : 'auto', md: '400px' }, // Full-width on mobile when search is open
            ml: 'auto',
            justifyContent: 'flex-end', // Align search icon to the right in mobile
          }}
        >
          {/* Search Input */}
          {isSearchOpen ? (
            <>
              <InputBase
                autoFocus
                placeholder="Search by anything"
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '0 12px',
                  height: 40,
                  width: '100%',
                  display: { xs: 'block', md: 'block' },
                }}
              />
              <IconButton
                onClick={handleSearchToggle}
                sx={{
                  height: 40,
                  borderRadius: 0,
                  color: '#333',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={handleSearchToggle}
              sx={{
                color: '#007bff',
                display: { xs: 'block', md: 'none' }, // Only show this icon on small screens
              }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Desktop search input */}
          <InputBase
            placeholder="Search by anything"
            sx={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0 12px',
              height: 40,
              width: '100%',
              display: { xs: 'none', md: 'block' }, // Hide search input on small screens, always visible on larger screens
            }}
          />
          <IconButton
            type="submit"
            sx={{
              marginLeft: '-40px',
              borderRadius: 0,
              height: '40px',
              backgroundColor: '#007bff',
              color: '#fff',
              '&:hover': { backgroundColor: '#0056b3' },
              display: { xs: 'none', md: 'block' }, // Hide on small screens, only show on larger screens
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Right section with icons */}
        <Box display="flex" alignItems="center">
          {!isMobile && (
            <>
              <IconButton sx={{ mr: 2 }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton sx={{ mr: 2 }}>
                <HelpOutlineIcon />
              </IconButton>
              <ClockInOutButtons /> {/* Include Clock In/Out buttons */}
              <IconButton onClick={handleLogout} title="Logout" sx={{ mr: 2 }}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Avatar dropdown button */}
        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: '#007bff' }}>A</Avatar>
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* These options are only available inside the avatar dropdown on mobile */}
          {isMobile && (
            <>
              <MenuItem>
                <NotificationsIcon sx={{ mr: 1 }} />
                Notifications
              </MenuItem>
              <MenuItem>
                <HelpOutlineIcon sx={{ mr: 1 }} />
                Help
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
