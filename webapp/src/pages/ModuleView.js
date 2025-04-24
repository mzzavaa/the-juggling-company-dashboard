import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Psychology as ReflectionIcon,
  CheckCircle as CheckIcon,
  ArrowForward as NextIcon,
  ArrowBack as PrevIcon,
  // PlayArrow as StartIcon, // Removed unused import
  Flag as CompleteIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';

export default function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { getModule, updateModuleProgress } = useUserProgress(); // Removed unused modules
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  
  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would fetch from an API
        const foundModule = getModule(moduleId);
        
        if (!foundModule) {
          setError('Module not found');
          setLoading(false);
          return;
        }
        
        if (!foundModule.unlocked) {
          setError('This module is locked. Complete previous modules to unlock it.');
          setLoading(false);
          return;
        }
        
        setModule(foundModule);
        
        // Calculate active step based on progress
        if (foundModule.progress > 0) {
          const stepProgress = Math.floor(foundModule.progress / 20); // 5 steps, each 20%
          setActiveStep(stepProgress);
          
          // Mark previous steps as completed
          const completedSteps = {};
          for (let i = 0; i < stepProgress; i++) {
            completedSteps[i] = true;
          }
          setCompleted(completedSteps);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load module data');
        setLoading(false);
      }
    };
    
    loadModule();
  }, [moduleId, getModule]);
  
  const handleNext = async () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    
    // Calculate progress percentage (5 steps, each 20%)
    const progress = Math.min(100, (newActiveStep) * 20);
    
    // Update module progress
    if (module) {
      await updateModuleProgress(module.id, progress);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleComplete = async () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    
    // Update module progress to 100%
    if (module) {
      await updateModuleProgress(module.id, 100);
      
      // Navigate to reflection page
      navigate(`/reflection/${module.id}`);
    }
  };
  
  // Mock steps for the module
  const steps = [
    {
      label: 'Introduction',
      description: `Learn about ${module?.jugglingProp || 'juggling props'} and ${module?.techTheme || 'AWS technologies'} in this module.`,
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Welcome to the {module?.name} module! In this module, you'll learn about {module?.jugglingProp} juggling techniques and {module?.techTheme} using AWS services.
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/random/600x400?${module?.jugglingProp},juggling`}
                  alt={module?.jugglingProp}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Juggling Component
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You'll learn how to juggle with {module?.jugglingProp}, focusing on proper technique and control.
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Basic grip and hand position" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Proper throwing technique" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Maintaining rhythm and pattern" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/random/600x400?aws,cloud,technology`}
                  alt={module?.techTheme}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tech Component
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You'll learn about {module?.techTheme} using these AWS services:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {module?.awsServices.map((service, index) => (
                      <Chip 
                        key={index}
                        label={service}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    OTTO Tie-In: {module?.ottoTieIn}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      label: 'Juggling Techniques',
      description: `Learn the fundamental techniques for ${module?.jugglingProp || 'juggling'}.`,
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            In this section, you'll learn the basic techniques for juggling with {module?.jugglingProp}.
          </Typography>
          
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
            <Typography variant="subtitle1" gutterBottom>
              Video Tutorial
            </Typography>
            <Box 
              sx={{ 
                width: '100%', 
                height: 0, 
                paddingBottom: '56.25%', 
                position: 'relative',
                bgcolor: 'grey.800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" color="white">
                Video placeholder - In the real app, a tutorial video would be embedded here
              </Typography>
            </Box>
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            Key Techniques
          </Typography>
          
          <List>
            {module?.jugglingProp === 'balls' && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="The Scoop Throw" 
                    secondary="Use your hand like a scoop, throwing from the center of your body to the opposite side" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="The Cascade Pattern" 
                    secondary="Balls cross from one hand to the other in an arc pattern" 
                  />
                </ListItem>
              </>
            )}
            
            {module?.jugglingProp === 'rings' && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="The Flat Spin" 
                    secondary="Keep rings flat during their flight for better control" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="The Thumb Grip" 
                    secondary="Hold rings with your thumb on top for better release" 
                  />
                </ListItem>
              </>
            )}
            
            {module?.jugglingProp === 'flower-stick' && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="The Basic Tick-Tock" 
                    secondary="Keep the flower stick balanced while tapping it back and forth" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <JugglingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Hand Rolls" 
                    secondary="Roll the flower stick across your hand for transitions" 
                  />
                </ListItem>
              </>
            )}
            
            {!['balls', 'rings', 'flower-stick'].includes(module?.jugglingProp || '') && (
              <ListItem>
                <ListItemIcon>
                  <JugglingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Basic Techniques" 
                  secondary="Learn the fundamental techniques for this prop" 
                />
              </ListItem>
            )}
          </List>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/juggling-trainer')}
            >
              Practice in Juggling Trainer
            </Button>
          </Box>
        </Box>
      )
    },
    {
      label: 'AWS Technology Concepts',
      description: `Learn about ${module?.techTheme || 'AWS technologies'} and related services.`,
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            In this section, you'll learn about {module?.techTheme} and how to implement it using AWS services.
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {module?.awsServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {service}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {service.includes('Bedrock') && 'Foundation models for generative AI applications'}
                      {service.includes('SageMaker') && 'Build, train, and deploy machine learning models'}
                      {service.includes('Lambda') && 'Run code without provisioning servers'}
                      {service.includes('Step Functions') && 'Coordinate distributed applications'}
                      {service.includes('DynamoDB') && 'Fast and flexible NoSQL database service'}
                      {service.includes('SQS') && 'Fully managed message queuing service'}
                      {service.includes('SNS') && 'Fully managed pub/sub messaging service'}
                      {service.includes('Rekognition') && 'Add image and video analysis to applications'}
                      {service.includes('EventBridge') && 'Serverless event bus for SaaS apps and AWS services'}
                      {service.includes('CodePipeline') && 'Continuous delivery service for fast updates'}
                    </Typography>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h6" gutterBottom>
            OTTO Architecture Connection
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="body2">
              {module?.ottoTieIn}
            </Typography>
          </Paper>
        </Box>
      )
    },
    {
      label: 'Hands-on Project',
      description: 'Apply what you\'ve learned in a practical project.',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Now it's time to apply what you've learned in a hands-on project that combines {module?.jugglingProp} juggling analysis with {module?.techTheme} on AWS.
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            This project will take approximately {module?.timeEstimate?.tech} to complete.
          </Alert>
          
          <Typography variant="h6" gutterBottom>
            Project Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {module?.jugglingProp === 'balls' && 'Build an AI-powered juggling assistant that can analyze 3-ball cascade technique using Amazon Bedrock and SageMaker Canvas.'}
            {module?.jugglingProp === 'rings' && 'Create an MLOps pipeline for ring juggling pattern recognition with automated feedback loops.'}
            {module?.jugglingProp === 'flower-stick' && 'Develop a serverless application that uses managed AI services to analyze flower stick movements.'}
            {module?.jugglingProp === 'clubs' && 'Build a distributed system for club juggling pattern analysis using event-driven architecture.'}
            {module?.jugglingProp === 'devil-stick' && 'Create autonomous agents that can provide real-time feedback on devil stick technique.'}
            {module?.jugglingProp === 'cigar-boxes' && 'Develop an orchestrated workflow for cigar box manipulation analysis and feedback.'}
            {!['balls', 'rings', 'flower-stick', 'clubs', 'devil-stick', 'cigar-boxes'].includes(module?.jugglingProp || '') && 'Build a project that combines juggling analysis with AWS technologies.'}
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate(`/tech-project/${moduleId}`)}
            sx={{ mt: 2 }}
          >
            Start Project
          </Button>
        </Box>
      )
    },
    {
      label: 'Reflection & Assessment',
      description: 'Reflect on what you\'ve learned and assess your progress.',
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Congratulations on completing the learning content for this module! Now it's time to reflect on what you've learned and assess your progress.
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Reflection Framework
          </Typography>
          <Typography variant="body2" paragraph>
            {module?.reflection}
          </Typography>
          
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.default' }}>
            <Typography variant="subtitle1" gutterBottom>
              Key Questions to Consider
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <ReflectionIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="What parallels do you see between juggling with this prop and the AWS technologies you learned?" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ReflectionIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="How might the concepts from this module apply to real-world problems?" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ReflectionIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="What was most challenging about this module, and how did you overcome it?" />
              </ListItem>
            </List>
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            Complete the Module
          </Typography>
          <Typography variant="body2" paragraph>
            To complete this module, submit your reflection and take a brief assessment to demonstrate your understanding.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate(`/reflection/${moduleId}`)}
            sx={{ mt: 2 }}
          >
            Complete Reflection
          </Button>
        </Box>
      )
    }
  ];
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/learning-lab')}
        >
          Back to Learning Lab
        </Button>
      </Box>
    );
  }
  
  if (!module) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Module not found
        </Alert>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/learning-lab')}
        >
          Back to Learning Lab
        </Button>
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {module.name}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/learning-lab')}
        >
          Back to Learning Lab
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} completed={completed[index]}>
                  <StepLabel>
                    <Typography variant="subtitle1">{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {step.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {step.content}
                    <Box sx={{ mb: 2, mt: 3 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleComplete : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          startIcon={index === steps.length - 1 ? <CompleteIcon /> : <NextIcon />}
                        >
                          {index === steps.length - 1 ? 'Complete Module' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                          startIcon={<PrevIcon />}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Module Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={module.progress} 
                  size={60}
                  thickness={5}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(module.progress)}%`}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2">
                  Step {activeStep + 1} of {steps.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {module.status === 'completed' ? 'Completed' : 'In Progress'}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Estimated Time
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Tech:</strong> {module.timeEstimate.tech}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Juggling:</strong> {module.timeEstimate.juggling}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense>
              <ListItem button onClick={() => navigate('/juggling-trainer')}>
                <ListItemIcon>
                  <JugglingIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Juggling Trainer" />
              </ListItem>
              <ListItem button onClick={() => navigate(`/tech-project/${moduleId}`)}>
                <ListItemIcon>
                  <CodeIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Tech Project" />
              </ListItem>
              <ListItem button onClick={() => navigate(`/reflection/${moduleId}`)}>
                <ListItemIcon>
                  <ReflectionIcon color="info" />
                </ListItemIcon>
                <ListItemText primary="Reflection" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
