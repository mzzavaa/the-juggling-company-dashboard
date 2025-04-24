import React, { useCallback } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFileUpload, acceptedFileTypes = {}, maxSize = 5242880 }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize: maxSize,
    multiple: false
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 
                    isDragReject ? 'error.main' : 'divider',
        borderRadius: 2,
        bgcolor: 'background.default',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        }
      }}
    >
      <input {...getInputProps()} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Object.keys(acceptedFileTypes).length > 0 
            ? `Accepted file types: ${Object.keys(acceptedFileTypes).join(', ')}`
            : 'All file types accepted'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Max file size: {Math.round(maxSize / 1024 / 1024)}MB
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<UploadIcon />}
          sx={{ mt: 2 }}
          onClick={(e) => e.stopPropagation()}
        >
          Select File
        </Button>
      </Box>
    </Paper>
  );
};

export default FileUploader;
