// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Modal,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Avatar,
//   Grid,
//   Stepper,
//   Step,
//   StepLabel,
//   Typography,
// } from '@mui/material';
// import api from '../../../../../../services/api'; // Import your axios instance

// const CreateEmployeeForm = ({ open, handleClose, onEmployeeCreated, employee }) => {
//   const [activeStep, setActiveStep] = useState(0); // Stepper state
//   const steps = ['Basic Info', 'Personal Details', 'Job Details', 'Document Upload'];

//   const [departments, setDepartments] = useState([]);
//   const [positions, setPositions] = useState([]);

//   // Combined form data state
//   const [formData, setFormData] = useState({
//     // Employee model fields
//     firstName: '',
//     lastName: '',
//     email: '',
//     department: '',
//     position: '',
//     dateJoined: '',
//     profilePicture: null,
//     preview: '',

//     // EmployeePersonalDetails model fields
//     personalDetails: {
//       dateOfBirth: '',
//       gender: '',
//       address: '',
//       country: '',
//       city: '',
//       experience: '',
//     },

//     // EmployeeJobDetails model fields
//     jobDetails: {
//       shift: '',
//       workType: '',
//       employeeType: '',
//       salary: '',
//     },

//     // Documents
//     documents: {
//       aadhaar: null,
//       passport: null,
//     },
//   });

//   // Fetch departments and positions when the component is mounted
//   useEffect(() => {
//     const fetchDepartmentsAndPositions = async () => {
//       try {
//         const departmentResponse = await api.get('/departments/departments/');
//         setDepartments(departmentResponse.data);

//         const positionResponse = await api.get('/departments/positions/');
//         setPositions(positionResponse.data);
//       } catch (error) {
//         console.error('Error fetching departments or positions:', error);
//       }
//     };
//     fetchDepartmentsAndPositions();

//     if (employee) {
//       setFormData({
//         ...formData,
//         firstName: employee.user.first_name,
//         lastName: employee.user.last_name,
//         email: employee.user.email,
//         department: employee.department?.id ?? '',
//         position: employee.position?.id ?? '',
//         dateJoined: employee.date_joined,
//         preview: employee.image || '',

//         // Populate personalDetails and jobDetails if available
//         personalDetails: {
//           dateOfBirth: employee.personal_details?.date_of_birth || '',
//           gender: employee.personal_details?.gender || '',
//           address: employee.personal_details?.address || '',
//           country: employee.personal_details?.country || '',
//           city: employee.personal_details?.city || '',
//           experience: employee.personal_details?.experience || '',
//         },
//         jobDetails: {
//           shift: employee.job_details?.shift || '',
//           workType: employee.job_details?.work_type || '',
//           employeeType: employee.job_details?.employee_type || '',
//           salary: employee.job_details?.salary || '',
//         },
//       });
//     } else {
//       // Reset form data
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         department: '',
//         position: '',
//         dateJoined: '',
//         profilePicture: null,
//         preview: '',
//         personalDetails: {
//           dateOfBirth: '',
//           gender: '',
//           address: '',
//           country: '',
//           city: '',
//           experience: '',
//         },
//         jobDetails: {
//           shift: '',
//           workType: '',
//           employeeType: '',
//           salary: '',
//         },
//         documents: {
//           aadhaar: null,
//           passport: null,
//         },
//       });
//     }
//   }, [employee]);

//   // Handle form input changes
//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // Handle nested form input changes
//   const handleNestedChange = (section, field, value) => {
//     setFormData({
//       ...formData,
//       [section]: { ...formData[section], [field]: value },
//     });
//   };

//   // Handle profile picture change and preview
//   const handleProfilePictureChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       handleChange('profilePicture', file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         handleChange('preview', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle document uploads
//   const handleDocumentChange = (field, file) => {
//     setFormData({
//       ...formData,
//       documents: { ...formData.documents, [field]: file },
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const submitData = new FormData();
//     submitData.append('first_name', formData.firstName);
//     submitData.append('last_name', formData.lastName);
//     submitData.append('email', formData.email);
//     submitData.append('username', formData.email);
//     submitData.append('department', formData.department);
//     submitData.append('position', formData.position);
//     submitData.append('date_joined', formData.dateJoined);

//     // Append personalDetails fields
//     for (const key in formData.personalDetails) {
//       submitData.append(`personal_details.${key}`, formData.personalDetails[key]);
//     }

//     // Append jobDetails fields
//     for (const key in formData.jobDetails) {
//       submitData.append(`job_details.${key}`, formData.jobDetails[key]);
//     }

//     // Append documents
//     if (formData.documents.aadhaar) {
//       submitData.append('aadhaar', formData.documents.aadhaar);
//     }
//     if (formData.documents.passport) {
//       submitData.append('passport', formData.documents.passport);
//     }

//     if (formData.profilePicture) {
//       submitData.append('profile_picture', formData.profilePicture);
//     }

//     try {
//       if (employee) {
//         await api.put(`employees/employees/${employee.id}/`, submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         console.log('Employee updated successfully');
//       } else {
//         await api.post('employees/employees/', submitData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         console.log('Employee created successfully');
//       }
//       onEmployeeCreated();
//       handleClose();
//       setActiveStep(0); // Reset to first step after submission
//     } catch (error) {
//       console.error('Error submitting employee form:', error);
//     }
//   };

//   // Navigation handlers
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   // Step content rendering
//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         // Step 1: Employee Model Fields
//         return (
//           <Grid container spacing={2}>
//             {/* Profile Picture */}
//             <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//               <input
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="profile-picture-upload"
//                 type="file"
//                 onChange={handleProfilePictureChange}
//               />
//               <label htmlFor="profile-picture-upload">
//                 <Avatar
//                   src={formData.preview || '/placeholder.jpg'}
//                   sx={{ width: 100, height: 100, cursor: 'pointer' }}
//                 />
//               </label>
//             </Grid>

//             {/* First Name */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 value={formData.firstName}
//                 onChange={(e) => handleChange('firstName', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Last Name */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 value={formData.lastName}
//                 onChange={(e) => handleChange('lastName', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Email */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 value={formData.email}
//                 onChange={(e) => handleChange('email', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Department Dropdown */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   value={formData.department || ''}
//                   onChange={(e) => handleChange('department', e.target.value)}
//                   required
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept.id} value={dept.id}>
//                       {dept.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Position Dropdown */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Position</InputLabel>
//                 <Select
//                   value={formData.position || ''}
//                   onChange={(e) => handleChange('position', e.target.value)}
//                   required
//                 >
//                   {positions.map((pos) => (
//                     <MenuItem key={pos.id} value={pos.id}>
//                       {pos.title}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Date Joined */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Date Joined"
//                 type="date"
//                 value={formData.dateJoined}
//                 onChange={(e) => handleChange('dateJoined', e.target.value)}
//                 required
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//           </Grid>
//         );
//       case 1:
//         // Step 2: EmployeePersonalDetails Model Fields
//         return (
//           <Grid container spacing={2}>
//             {/* Date of Birth */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Date of Birth"
//                 type="date"
//                 value={formData.personalDetails.dateOfBirth}
//                 onChange={(e) => handleNestedChange('personalDetails', 'dateOfBirth', e.target.value)}
//                 required
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//             </Grid>

//             {/* Gender */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   value={formData.personalDetails.gender || ''}
//                   onChange={(e) => handleNestedChange('personalDetails', 'gender', e.target.value)}
//                   required
//                 >
//                   <MenuItem value="Male">Male</MenuItem>
//                   <MenuItem value="Female">Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Address */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 value={formData.personalDetails.address}
//                 onChange={(e) => handleNestedChange('personalDetails', 'address', e.target.value)}
//                 required
//                 multiline
//                 rows={2}
//               />
//             </Grid>

//             {/* Country */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Country"
//                 value={formData.personalDetails.country}
//                 onChange={(e) => handleNestedChange('personalDetails', 'country', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* City */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="City"
//                 value={formData.personalDetails.city}
//                 onChange={(e) => handleNestedChange('personalDetails', 'city', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Experience */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Experience (years)"
//                 type="number"
//                 inputProps={{ step: '0.1' }}
//                 value={formData.personalDetails.experience}
//                 onChange={(e) => handleNestedChange('personalDetails', 'experience', e.target.value)}
//                 required
//               />
//             </Grid>
//           </Grid>
//         );
//       case 2:
//         // Step 3: EmployeeJobDetails Model Fields
//         return (
//           <Grid container spacing={2}>
//             {/* Shift */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Shift"
//                 value={formData.jobDetails.shift}
//                 onChange={(e) => handleNestedChange('jobDetails', 'shift', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Work Type */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Work Type"
//                 value={formData.jobDetails.workType}
//                 onChange={(e) => handleNestedChange('jobDetails', 'workType', e.target.value)}
//                 required
//               />
//             </Grid>

//             {/* Employee Type */}
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Employee Type</InputLabel>
//                 <Select
//                   value={formData.jobDetails.employeeType || ''}
//                   onChange={(e) => handleNestedChange('jobDetails', 'employeeType', e.target.value)}
//                   required
//                 >
//                   <MenuItem value="Permanent">Permanent</MenuItem>
//                   <MenuItem value="Contract">Contract</MenuItem>
//                   <MenuItem value="Intern">Intern</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Salary */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Salary"
//                 type="number"
//                 inputProps={{ step: '0.01' }}
//                 value={formData.jobDetails.salary}
//                 onChange={(e) => handleNestedChange('jobDetails', 'salary', e.target.value)}
//                 required
//               />
//             </Grid>
//           </Grid>
//         );
//       case 3:
//         // Step 4: Document Model Fields
//         return (
//           <Grid container spacing={2}>
//             {/* Aadhaar Upload */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1">Upload Aadhaar</Typography>
//               <input
//                 accept="application/pdf,image/*"
//                 style={{ display: 'none' }}
//                 id="aadhaar-upload"
//                 type="file"
//                 onChange={(e) => handleDocumentChange('aadhaar', e.target.files[0])}
//               />
//               <label htmlFor="aadhaar-upload">
//                 <Button variant="contained" component="span">
//                   Choose File
//                 </Button>
//                 {formData.documents.aadhaar && (
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     {formData.documents.aadhaar.name}
//                   </Typography>
//                 )}
//               </label>
//             </Grid>

//             {/* Passport Upload */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1">Upload Passport</Typography>
//               <input
//                 accept="application/pdf,image/*"
//                 style={{ display: 'none' }}
//                 id="passport-upload"
//                 type="file"
//                 onChange={(e) => handleDocumentChange('passport', e.target.files[0])}
//               />
//               <label htmlFor="passport-upload">
//                 <Button variant="contained" component="span">
//                   Choose File
//                 </Button>
//                 {formData.documents.passport && (
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     {formData.documents.passport.name}
//                   </Typography>
//                 )}
//               </label>
//             </Grid>
//           </Grid>
//         );
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           bgcolor: 'background.paper',
//           p: 4,
//           width: 700,
//         }}
//       >
//         <h2>{employee ? 'Edit Employee' : 'Create Employee'}</h2>

//         {/* Stepper */}
//         <Stepper activeStep={activeStep} alternativeLabel>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {/* Step Content */}
//         <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>

//         {/* Navigation Buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//           <Button
//             disabled={activeStep === 0}
//             onClick={handleBack}
//             variant="contained"
//             color="secondary"
//           >
//             Back
//           </Button>
//           {activeStep === steps.length - 1 ? (
//             <Button type="submit" variant="contained" color="primary">
//               {employee ? 'Update Employee' : 'Create Employee'}
//             </Button>
//           ) : (
//             <Button onClick={handleNext} variant="contained" color="primary">
//               Next
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default CreateEmployeeForm;

// CreateEmployeeForm.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import api from '../../../../../../services/api';

// Import step components
import EmployeeBasicInfoStep from './Create/EmployeeBasicInfoStep';
import EmployeePersonalDetailsStep from './Create/EmployeePersonalDetailsStep';
import EmployeeJobDetailsStep from './Create/EmployeeJobDetailsStep.js';
import EmployeeDocumentUploadStep from './Create/EmployeeDocumentUploadStep';

const CreateEmployeeForm = ({ open, handleClose, onEmployeeCreated, employee }) => {
  const [activeStep, setActiveStep] = useState(0); // Stepper state
  const steps = ['Basic Info', 'Personal Details', 'Job Details', 'Document Upload'];

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  // Combined form data state
  const [formData, setFormData] = useState({
    // Employee model fields
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    dateJoined: '',
    profilePicture: null,
    preview: '',

    // EmployeePersonalDetails model fields
    personalDetails: {
      dateOfBirth: '',
      gender: '',
      address: '',
      country: '',
      city: '',
      experience: '',
    },

    // EmployeeJobDetails model fields
    jobDetails: {
      shift: '',
      workType: '',
      employeeType: '',
      salary: '',
    },

    // Documents
    documents: {
      aadhaar: null,
      passport: null,
    },
  });

  // Fetch departments and positions when the component is mounted
  useEffect(() => {
    const fetchDepartmentsAndPositions = async () => {
      try {
        const departmentResponse = await api.get('/departments/departments/');
        setDepartments(departmentResponse.data);

        const positionResponse = await api.get('/departments/positions/');
        setPositions(positionResponse.data);
      } catch (error) {
        console.error('Error fetching departments or positions:', error);
      }
    };
    fetchDepartmentsAndPositions();

    if (employee) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: employee.user.first_name,
        lastName: employee.user.last_name,
        email: employee.user.email,
        department: employee.department?.id ?? '',
        position: employee.position?.id ?? '',
        dateJoined: employee.date_joined,
        preview: employee.image || '',

        // Populate personalDetails and jobDetails if available
        personalDetails: {
          dateOfBirth: employee.personal_details?.date_of_birth || '',
          gender: employee.personal_details?.gender || '',
          address: employee.personal_details?.address || '',
          country: employee.personal_details?.country || '',
          city: employee.personal_details?.city || '',
          experience: employee.personal_details?.experience || '',
        },
        jobDetails: {
          shift: employee.job_details?.shift || '',
          workType: employee.job_details?.work_type || '',
          employeeType: employee.job_details?.employee_type || '',
          salary: employee.job_details?.salary || '',
        },
      }));
    } else {
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        position: '',
        dateJoined: '',
        profilePicture: null,
        preview: '',
        personalDetails: {
          dateOfBirth: '',
          gender: '',
          address: '',
          country: '',
          city: '',
          experience: '',
        },
        jobDetails: {
          shift: '',
          workType: '',
          employeeType: '',
          salary: '',
        },
        documents: {
          aadhaar: null,
          passport: null,
        },
      });
    }
  }, [employee]);

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handle nested form input changes
  const handleNestedChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [field]: value },
    }));
  };

  // Handle profile picture change and preview
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange('profilePicture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('preview', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document uploads
  const handleDocumentChange = (field, file) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: { ...prevData.documents, [field]: file },
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitData = new FormData();
    submitData.append('first_name', formData.firstName);
    submitData.append('last_name', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('username', formData.email);
    submitData.append('department', formData.department);
    submitData.append('position', formData.position);
    submitData.append('date_joined', formData.dateJoined);

    // Append personalDetails fields
    for (const key in formData.personalDetails) {
      submitData.append(`personal_details.${key}`, formData.personalDetails[key]);
    }

    // Append jobDetails fields
    for (const key in formData.jobDetails) {
      submitData.append(`job_details.${key}`, formData.jobDetails[key]);
    }

    // Append documents
    if (formData.documents.aadhaar) {
      submitData.append('aadhaar', formData.documents.aadhaar);
    }
    if (formData.documents.passport) {
      submitData.append('passport', formData.documents.passport);
    }

    if (formData.profilePicture) {
      submitData.append('profile_picture', formData.profilePicture);
    }

    try {
      if (employee) {
        await api.put(`employees/employees/${employee.id}/`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Employee updated successfully');
      } else {
        await api.post('employees/employees/', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Employee created successfully');
      }
      onEmployeeCreated();
      handleClose();
      setActiveStep(0); // Reset to first step after submission
    } catch (error) {
      console.error('Error submitting employee form:', error);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Step content rendering
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <EmployeeBasicInfoStep
            formData={formData}
            handleChange={handleChange}
            departments={departments}
            positions={positions}
            handleProfilePictureChange={handleProfilePictureChange}
          />
        );
      case 1:
        return (
          <EmployeePersonalDetailsStep
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case 2:
        return (
          <EmployeeJobDetailsStep
            formData={formData}
            handleNestedChange={handleNestedChange}
          />
        );
      case 3:
        return (
          <EmployeeDocumentUploadStep
            formData={formData}
            handleDocumentChange={handleDocumentChange}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          width: 700,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2>{employee ? 'Edit Employee' : 'Create Employee'}</h2>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            color="secondary"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              {employee ? 'Update Employee' : 'Create Employee'}
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateEmployeeForm;
