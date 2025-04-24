import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Tabs, 
  Tab, 
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip
} from '@mui/material';
import { 
  CloudUpload as UploadIcon, 
  PlayArrow as PlayIcon,
  Videocam as RecordIcon,
  Check as CheckIcon,
  BarChart as AnalyticsIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useUserProgress } from '../context/UserProgressContext';

export default function JugglingTrainer() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  
  const { modules } = useUserProgress();
  
  // Get active module
  const activeModule = modules.find(module => module.status === 'in-progress');
  
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setActiveStep(1);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  });
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // In a real app, this would upload to S3 and call the API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsUploading(false);
      setActiveStep(2);
      handleAnalyze();
    } catch (err) {
      setError('Failed to upload video. Please try again.');
      setIsUploading(false);
    }
  };
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // In a real app, this would call the analysis API
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis results
      const mockResults = {
        patternIdentified: '3-ring cascade',
        confidence: 0.85,
        metrics: {
          consistency: 0.72,
          rhythm: 0.68,
          height: 0.81,
          dropRate: 0.15
        },
        feedback: [
          'Good height consistency on most throws',
          'Try to keep your elbows closer to your body',
          'Your rhythm is slightly uneven - focus on consistent timing',
          'Good recovery after drops'
        ],
        improvements: [
          'Practice with one ring in each hand to improve hand position',
          'Focus on maintaining a steady rhythm',
          'Try to reduce unnecessary arm movement'
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setActiveStep(3);
    } catch (err) {
      setError('Failed to analyze video. Please try again.');
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setUploadedFile(null);
    setVideoUrl(null);
    setAnalysisResults(null);
    setActiveStep(0);
    setError(null);
  };
  
  const renderUploadStep = () => (
    <Box 
      {...getRootProps()} 
      sx={{ 
        border: '2px dashed', 
        borderColor: isDragActive ? 'primary.main' : 'grey.400',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
        bgcolor: isDragActive ? 'rgba(74, 47, 189, 0.05)' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <input {...getInputProps()} />
      <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Drag & drop your juggling video here
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        or click to select a file
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Supported formats: MP4, MOV, AVI, WebM (max 100MB)
      </Typography>
    </Box>
  );
  
  const renderPreviewStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Preview Your Video
      </Typography>
      <Box sx={{ mb: 3 }}>
        <video 
          src={videoUrl} 
          controls 
          width="100%" 
          style={{ borderRadius: 8, maxHeight: 400 }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          onClick={handleReset}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleUpload}
          disabled={isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : <UploadIcon />}
        >
          {isUploading ? 'Uploading...' : 'Upload & Analyze'}
        </Button>
      </Box>
    </Box>
  );
  
  const renderAnalyzingStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CircularProgress size={60} sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>
        Analyzing Your Juggling
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Our AI is watching your technique and identifying patterns...
      </Typography>
    </Box>
  );
  
  const renderResultsStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Analysis Results
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Pattern Identified
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip 
                label={analysisResults.patternIdentified} 
                color="primary" 
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {Math.round(analysisResults.confidence * 100)}% confidence
              </Typography>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={analysisResults.metrics.consistency * 100} 
                    size={40}
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <Typography variant="body2">Consistency</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {Math.round(analysisResults.metrics.consistency * 100)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={analysisResults.metrics.rhythm * 100} 
                    size={40}
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <Typography variant="body2">Rhythm</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {Math.round(analysisResults.metrics.rhythm * 100)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={analysisResults.metrics.height * 100} 
                    size={40}
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <Typography variant="body2">Height</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {Math.round(analysisResults.metrics.height * 100)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={(1 - analysisResults.metrics.dropRate) * 100} 
                    size={40}
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <Typography variant="body2">Drop Rate</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {Math.round(analysisResults.metrics.dropRate * 100)}%
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Feedback
            </Typography>
            <Box sx={{ mb: 2 }}>
              {analysisResults.feedback.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                  <CheckIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Suggested Improvements
            </Typography>
            {analysisResults.improvements.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                <Typography variant="body2" sx={{ ml: 3 }}>• {item}</Typography>
              </Box>
            ))}
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleReset}
            >
              Upload New Video
            </Button>
            <Button 
              variant="contained" 
              color="success"
              startIcon={<AnalyticsIcon />}
            >
              Save to Progress
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
  
  const renderCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return renderUploadStep();
      case 1:
        return renderPreviewStep();
      case 2:
        return renderAnalyzingStep();
      case 3:
        return renderResultsStep();
      default:
        return renderUploadStep();
    }
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Juggling Trainer
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Upload Video" icon={<UploadIcon />} iconPosition="start" />
          <Tab label="Record Video" icon={<RecordIcon />} iconPosition="start" />
          <Tab label="Practice History" icon={<AnalyticsIcon />} iconPosition="start" />
        </Tabs>
        
        {activeTab === 0 && (
          <Box>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Upload Video</StepLabel>
              </Step>
              <Step>
                <StepLabel>Preview</StepLabel>
              </Step>
              <Step>
                <StepLabel>Analysis</StepLabel>
              </Step>
              <Step>
                <StepLabel>Results</StepLabel>
              </Step>
            </Stepper>
            
            {renderCurrentStep()}
          </Box>
        )}
        
        {activeTab === 1 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Record Juggling Video
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This feature is coming soon!
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<RecordIcon />}
              sx={{ mt: 2 }}
              disabled
            >
              Start Recording
            </Button>
          </Box>
        )}
        
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Practice History
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Track your progress over time
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://source.unsplash.com/random/300x200?juggling&sig=${item}`}
                      alt="Practice session"
                    />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Practice Session #{item}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item === 1 ? '3-ring cascade' : item === 2 ? '3-ball cascade' : 'Flower stick basic spin'}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        {item === 1 ? '2 days ago' : item === 2 ? '1 week ago' : '2 weeks ago'}
                      </Typography>
                      <Button 
                        size="small" 
                        startIcon={<PlayIcon />}
                        sx={{ mt: 1 }}
                      >
                        View Analysis
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Module: {activeModule?.name || 'None'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Focus on these techniques for your current module:
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Technique #1
                </Typography>
                <Typography variant="body2">
                  {activeModule?.jugglingProp === 'rings' 
                    ? 'Maintain consistent ring orientation during flight'
                    : activeModule?.jugglingProp === 'balls'
                    ? 'Throw to consistent heights'
                    : 'Basic control and balance'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Technique #2
                </Typography>
                <Typography variant="body2">
                  {activeModule?.jugglingProp === 'rings' 
                    ? 'Keep elbows close to body'
                    : activeModule?.jugglingProp === 'balls'
                    ? 'Maintain a consistent rhythm'
                    : 'Smooth hand transitions'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Technique #3
                </Typography>
                <Typography variant="body2">
                  {activeModule?.jugglingProp === 'rings' 
                    ? 'Practice arm spins with one ring'
                    : activeModule?.jugglingProp === 'balls'
                    ? 'Focus on smooth scoop motion'
                    : 'Develop control with both hands'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
