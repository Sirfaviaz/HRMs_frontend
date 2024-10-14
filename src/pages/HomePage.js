// src/pages/HomePage.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import RightContent from '../components/RightContent/RightContent';
import Navbar from '../components/Navbar'; // Import the Navbar

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, isAdmin, isHR } = useSelector((state) => state.user);

  const [selectedOption, setSelectedOption] = useState('dashboard'); // Default to dashboard
  const [sidebarVisible, setSidebarVisible] = useState(true); // State to manage sidebar visibility

  const handleLogout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    dispatch(clearUser());
    navigate('/login');
  };

  const handleSelection = (option) => {
    setSelectedOption(option); // Update selected option
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Pass selectedOption, toggleSidebar, and handleLogout to Navbar */}
      <Navbar selectedOption={selectedOption} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Conditionally render Sidebar based on visibility */}
        {sidebarVisible && (
          <Sidebar isAdmin={isAdmin} isHR={isHR} handleSelection={handleSelection} />
        )}
        <RightContent selectedOption={selectedOption} username={username} handleLogout={handleLogout} />
      </Box>
    </Box>
  );
}

export default HomePage;
