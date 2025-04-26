import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Amplify } from 'aws-amplify';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import config from './config';
import './index.css';

// Only configure Amplify if we have real values
if (config.aws.s3.mediaBucket && config.aws.s3.mediaBucket !== 'mock-media-bucket') {
  // Configure Amplify
  Amplify.configure({
    Storage: {
      AWSS3: {
        bucket: config.aws.s3.mediaBucket,
        region: config.aws.region
      }
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
