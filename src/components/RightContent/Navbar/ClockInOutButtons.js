import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import api from '../../../services/api';
import './ClockInOutButton.css'; // Import the CSS file for animations

const ClockInOutButtons = () => {
  const [loading, setLoading] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false); // Track clock-in state

  // Fetch the clock-in status when the component mounts
  useEffect(() => {
    const fetchClockInStatus = async () => {
      try {
        setLoading(true);
        // Make an API call to check current clock-in status
        const response = await api.get('/attendance/status/');
        console.log(response.data.is_clocked_in)
        setIsClockedIn(response.data.is_clocked_in); // Assume the API returns { is_clocked_in: true/false }
      } catch (error) {
        message.error('Error fetching clock-in status.');
      } finally {
        setLoading(false);
      }
    };

    fetchClockInStatus(); // Call the function on component mount
  }, []); // Empty dependency array to only run on mount

  const handleToggle = async () => {
    try {
      setLoading(true);
      if (!isClockedIn) {
        await api.post('/attendance/clock-in/');
        message.success('Clock-in successful!');
      } else {
        await api.post('/attendance/clock-out/');
        message.success('Clock-out successful!');
      }
      setIsClockedIn(!isClockedIn); // Toggle the state after success
    } catch (error) {
      message.error(isClockedIn ? 'Error clocking out.' : 'Error clocking in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`futuristic-btn ${isClockedIn ? 'clocked-out' : 'clocked-in'}`}
      onClick={handleToggle}
      loading={loading}
    >
      {isClockedIn ? 'Check Out' : 'Check In'}
    </Button>
  );
};

export default ClockInOutButtons;
