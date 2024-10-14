import React, { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography, Tab, Tabs, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import api from '../../../../services/api';
import DocumentsList from './Profile/DocumentsList'; // Import the new DocumentsList component

const EmployeeProfile = () => {
  const user_id = useSelector((state) => state.user.user_id); // Get the logged-in user_id from Redux
  const [employeeData, setEmployeeData] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        const response = await api.get('employees/profile/');
        const { employee, personal_details, job_details } = response.data;
        console.log("response:", response.data);
        setEmployeeData(employee || {});
        setPersonalDetails(personal_details || {});
        setJobDetails(job_details || {});
      } catch (error) {
        console.error('Error fetching employee profile:', error);
        setError('Failed to load employee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, []);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 4, border: '1px solid #e0e0e0' }}>
      {/* Header Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={employeeData?.image || '/placeholder.jpg'}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" sx={{ mt: 1 }}>
            {`${employeeData?.first_name || ''} ${employeeData?.last_name || ''}`}
          </Typography>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>Work Email: {employeeData?.email || 'N/A'}</Typography>
            <Typography>Personal Email: {employeeData?.user || 'N/A'}</Typography>
            <Typography>Phone: {employeeData?.phone || 'N/A'}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mt: 4, borderBottom: '1px solid #e0e0e0' }}
      >
        <Tab label="About" />
        <Tab label="Work Type & Shift" />
        <Tab label="Attendance" />
        <Tab label="Leave" />
        <Tab label="Payroll" />
        <Tab label="Allowance & Deductions" />
        <Tab label="Penalty Account" />
        <Tab label="Assets" />
        <Tab label="Documents" />
      </Tabs>

      {/* Render Content Based on Selected Tab */}
      <Box sx={{ mt: 4 }}>
        {selectedTab === 0 && (
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
                <Typography variant="h6">Personal Information</Typography>
                <Typography>Date of Birth: {personalDetails?.date_of_birth || 'N/A'}</Typography>
                <Typography>Gender: {personalDetails?.gender || 'N/A'}</Typography>
                <Typography>Address: {personalDetails?.address || 'N/A'}</Typography>
                <Typography>Country: {personalDetails?.country || 'N/A'}</Typography>
                <Typography>City: {personalDetails?.city || 'N/A'}</Typography>
                <Typography>Experience: {personalDetails?.experience || 'N/A'} years</Typography>
              </Box>
            </Grid>

            {/* Work Information */}
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
                <Typography variant="h6">Work Information</Typography>
                <Typography>Department: {jobDetails?.department?.name || 'N/A'}</Typography>
                <Typography>Job Position: {jobDetails?.job_position || 'N/A'}</Typography>
                <Typography>Shift: {jobDetails?.shift || 'N/A'}</Typography>
                <Typography>Work Type: {jobDetails?.work_type || 'N/A'}</Typography>
                <Typography>Employee Type: {jobDetails?.employee_type || 'N/A'}</Typography>
                <Typography>Salary: {jobDetails?.salary || 'N/A'}</Typography>
                <Typography>Joining Date: {jobDetails?.joining_date || 'N/A'}</Typography>
              </Box>
            </Grid>
          </Grid>
        )}

        {/* Documents Tab */}
        {selectedTab === 8 && <DocumentsList employeeId={employeeData?.user} />}
      </Box>
    </Box>
  );
};

export default EmployeeProfile;
