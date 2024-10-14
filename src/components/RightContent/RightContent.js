import React from 'react';
import { Box } from '@mui/material';
import AdminDashboard from './Menu/AdminDashboard';
import Mails from './Menu/Messaging';
import Meetings from './Menu/Meetings';
import JobPostings from './Recruitment/JobPostings';
import Candidates from './Recruitment/Candidates';
import Referrals from './Recruitment/Referrals';
import Employee from './Organization/Employee';
import Structure from './Organization/Structure';
import Report from './Organization/Report';
import Employees from './Organization/Employee/Employees';
import Profile from './Organization/Employee/Profile';
import Settings from './Organization/Settings'
import DocumentRequest from './Organization/Employee/DocumentRequest';

const RightContent = ({ selectedOption }) => {
  let content;
  switch (selectedOption) {
    case 'dashboard':
      content = <AdminDashboard />;
      break;
    case 'mails':
      content = <Mails />;
      break;
    case 'meetings':
      content = <Meetings />;
      break;
    case 'jobs':
      content = <JobPostings />;
      break;
    case 'candidates':
      content = <Candidates />;
      break;
    case 'referrals':
      content = <Referrals />;
      break;
    case 'employee':
      content = <Employee />; // New case for "Employees"
      break;
    case 'employees':
        content = <Employees />; // New case for "Employees"
        break;
    
    case 'profile':
      content = <Profile />; // New case for "Profile"
      break;
    case 'document-request':
      content = <DocumentRequest />; // New case for "Document Request"
      break;
    case 'structure':
      content = <Structure />;
      break;
    case 'report':
      content = <Report />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    default:
      content = <AdminDashboard />; // Default to Dashboard
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: '100vh', overflowY: 'auto' }}>
      {content}
    </Box>
  );
};

export default RightContent;
