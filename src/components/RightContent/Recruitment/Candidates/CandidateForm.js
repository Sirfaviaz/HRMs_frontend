// src/components/RightContent/Recruitment/Candidates/CandidateForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';

const CandidateForm = ({ initialValues = {}, onSubmit, onClose, jobPostings }) => {
  const [formData, setFormData] = useState({
    job_posting: initialValues?.job_posting?.id || '', // Assuming job_posting is an object
    first_name: initialValues?.first_name || '',
    last_name: initialValues?.last_name || '',
    email: initialValues?.email || '',
    resume: null,  // File input will be handled differently
    cover_letter: initialValues?.cover_letter || '',
    status: initialValues?.status || 'Applied',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    setFormData((prev) => ({ ...prev, resume: event.target.files[0] }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const submissionData = new FormData();
    for (let key in formData) {
      submissionData.append(key, formData[key]);
    }

    onSubmit(submissionData); // Pass FormData to handle file uploads
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      {/* Job Posting Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel>Job Posting</InputLabel>
        <Select
          value={formData.job_posting}
          onChange={(e) => handleChange('job_posting', e.target.value)}
          label="Job Posting"
        >
          {jobPostings.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* First Name */}
      <TextField
        label="First Name"
        value={formData.first_name}
        onChange={(e) => handleChange('first_name', e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      {/* Last Name */}
      <TextField
        label="Last Name"
        value={formData.last_name}
        onChange={(e) => handleChange('last_name', e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      {/* Resume File Upload */}
      <Button variant="contained" component="label" startIcon={<Upload />} sx={{ mb: 2 }}>
        Upload Resume
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {formData.resume && (
        <Typography variant="body2">Selected file: {formData.resume.name}</Typography>
      )}

      {/* Cover Letter */}
      <TextField
        label="Cover Letter"
        value={formData.cover_letter}
        onChange={(e) => handleChange('cover_letter', e.target.value)}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      {/* Status Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel>Status</InputLabel>
        <Select
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          label="Status"
        >
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="Reviewed">Reviewed</MenuItem>
          <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
          <MenuItem value="Offered">Offered</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      {/* Submit and Cancel Buttons */}
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {initialValues?.id ? 'Update' : 'Create'}
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default CandidateForm;
