import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DropdownSelector from './DropdownSelector';

const JobPostingForm = ({ initialValues = {}, onSubmit, departments, positions, employees }) => {
  const [formValues, setFormValues] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    department: initialValues?.department?.id || '',
    position: initialValues?.position?.id || '',
    location: initialValues?.location || '',
    employment_type: initialValues?.employment_type || '',
    closing_date: initialValues?.closing_date ? dayjs(initialValues.closing_date) : null,
    is_active: initialValues?.is_active ?? true,
    incharge_employee: initialValues?.incharge_employee?.id || '',
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const submissionValues = {
      ...formValues,
      closing_date: formValues.closing_date ? formValues.closing_date.format('YYYY-MM-DD') : null,
    };
    onSubmit(submissionValues);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Job Title"
              value={formValues.title}
              onChange={(e) => handleChange('title', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Job Description"
              value={formValues.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownSelector
              label="Department"
              value={formValues.department}
              options={departments}
              handleChange={(e) => handleChange('department', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownSelector
              label="Position"
              value={formValues.position}
              options={positions}
              handleChange={(e) => handleChange('position', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Location"
              value={formValues.location}
              onChange={(e) => handleChange('location', e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <DropdownSelector
              label="Incharge Employee"
              value={formValues.incharge_employee}
              options={employees}
              handleChange={(e) => handleChange('incharge_employee', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Closing Date"
              value={formValues.closing_date}
              onChange={(newValue) => handleChange('closing_date', newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            {initialValues?.id ? 'Update' : 'Create'}
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default JobPostingForm;
