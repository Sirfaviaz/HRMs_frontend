import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import api from '../../../../../services/api'; // Assuming you have an API service set up
import { Viewer } from '@react-pdf-viewer/core'; // For PDF previews
import '@react-pdf-viewer/core/lib/styles/index.css'; // Required styles for react-pdf

const DocumentsList = ({ employeeId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get(`employees/document-list/${employeeId}/documents/`);
        setDocuments(response.data || []);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError('Failed to load documents.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [employeeId]);

  const isImageFile = (fileName) => {
    return /\.(jpg|jpeg|png)$/i.test(fileName);
  };

  const isPDFFile = (fileName) => {
    return /\.pdf$/i.test(fileName);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (documents.length === 0) {
    return <Typography>No documents found for this employee.</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Documents</Typography>
      <Grid container spacing={2}>
        {documents.map((document) => (
          <Grid item xs={12} md={6} key={document.id}>
            <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
              <Typography variant="body1">{document.name}</Typography>
              {isImageFile(document.file) ? (
                <img
                  src={document.file}
                  alt={document.name}
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
              ) : isPDFFile(document.file) ? (
                <Box sx={{ maxWidth: '100%', height: '400px', overflow: 'auto', marginTop: '10px' }}>
                  <Viewer fileUrl={document.file} />
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  File preview not available.
                </Typography>
              )}
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                href={document.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                View/Download
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DocumentsList;
