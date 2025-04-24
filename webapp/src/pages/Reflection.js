import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  Card, 
  CardContent,
  // Divider, // Removed unused import
  // List, // Removed unused import
  // ListItem, // Removed unused import
  // ListItemIcon, // Removed unused import
  // ListItemText, // Removed unused import
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  // FormLabel, // Removed unused import
  Alert,
  CircularProgress,
  // Chip, // Removed unused import
  // Rating, // Removed unused import
  Slider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Psychology as ReflectionIcon,
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  // CheckCircle as CheckIcon, // Removed unused import
  ArrowForward as NextIcon,
  ArrowBack as PrevIcon,
  EmojiEvents as AchievementIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';

export default function Reflection() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { getModule, unlockAchievement } = useUserProgress();
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [reflectionData, setReflectionData] = useState({
    jugglingProgress: 3,
    techProgress: 3,
    jugglingChallenges: '',
    techChallenges: '',
    connections: '',
    nextSteps: '',
    quizAnswers: {}
  });
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // For debugging
        console.log("Loading module with ID:", moduleId);
        
        // If moduleId is 'latest', use module-1 as default
        const targetModuleId = moduleId === 'latest' ? 'module-1' : moduleId;
        console.log("Target module ID:", targetModuleId);
        
        // In a real app, this would fetch from an API
        const foundModule = getModule(targetModuleId);
        console.log("Found module:", foundModule);
        
        if (!foundModule) {
          console.error("Module not found");
          // Use a hardcoded module as fallback
          const fallbackModule = {
            id: 'module-1',
            name: 'Balls - AI Foundations',
            description: 'Learn the 3-ball cascade and AI basics with Amazon Bedrock',
            jugglingProp: 'balls',
            techTheme: 'AI Foundations',
            unlocked: true
          };
          setModule(fallbackModule);
          setLoading(false);
          return;
        }
        
        setModule(foundModule);
        setLoading(false);
      } catch (err) {
        console.error("Error loading module:", err);
        setError('Failed to load module data');
        setLoading(false);
      }
    };
    
    loadModule();
  }, [moduleId, getModule]);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReflectionData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSliderChange = (name) => (event, newValue) => {
    setReflectionData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleQuizAnswer = (questionId, answer) => {
    setReflectionData(prev => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: answer
      }
    }));
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would submit to an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Unlock achievement
      if (module) {
        const achievementId = `achievement-${module.id}-complete`;
        await unlockAchievement(achievementId);
      }
      
      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to submit reflection');
      setLoading(false);
    }
  };
  
  // Mock quiz questions based on module
  const getQuizQuestions = () => {
    if (!module) return [];
    
    if (module.jugglingProp === 'balls') {
      return [
        {
          id: 'q1',
          question: 'Which AWS service provides foundation models for generative AI?',
          options: ['Amazon SageMaker', 'Amazon Bedrock', 'Amazon Rekognition', 'Amazon Comprehend'],
          correctAnswer: 'Amazon Bedrock'
        },
        {
          id: 'q2',
          question: 'In a 3-ball cascade pattern, the balls follow what type of path?',
          options: ['Straight lines', 'Figure-eight pattern', 'Crossing arcs', 'Parallel arcs'],
          correctAnswer: 'Crossing arcs'
        },
        {
          id: 'q3',
          question: 'What is a key benefit of using managed AI services?',
          options: [
            'Lower cost than custom solutions', 
            'Reduced need for ML expertise', 
            'Faster time to production', 
            'All of the above'
          ],
          correctAnswer: 'All of the above'
        }
      ];
    } else if (module.jugglingProp === 'rings') {
      return [
        {
          id: 'q1',
          question: 'Which AWS service is used to build and manage ML pipelines?',
          options: ['AWS Lambda', 'Amazon SageMaker Pipelines', 'AWS Step Functions', 'Amazon EMR'],
          correctAnswer: 'Amazon SageMaker Pipelines'
        },
        {
          id: 'q2',
          question: 'What is a key technique for juggling rings?',
          options: ['Vertical throws', 'Flat spins', 'High arcs', 'Low passes'],
          correctAnswer: 'Flat spins'
        },
        {
          id: 'q3',
          question: 'What is the purpose of MLOps?',
          options: [
            'To automate ML model deployment', 
            'To monitor model performance', 
            'To streamline the ML lifecycle', 
            'All of the above'
          ],
          correctAnswer: 'All of the above'
        }
      ];
    } else {
      return [
        {
          id: 'q1',
          question: 'Which AWS service is commonly used for serverless computing?',
          options: ['Amazon EC2', 'AWS Lambda', 'Amazon RDS', 'Amazon ECS'],
          correctAnswer: 'AWS Lambda'
        },
        {
          id: 'q2',
          question: 'What is a key benefit of event-driven architecture?',
          options: [
            'Tight coupling between components', 
            'Synchronous processing', 
            'Loose coupling and scalability', 
            'Simplified monitoring'
          ],
          correctAnswer: 'Loose coupling and scalability'
        },
        {
          id: 'q3',
          question: 'Which service orchestrates workflows across multiple AWS services?',
          options: ['AWS AppSync', 'AWS Step Functions', 'AWS CloudFormation', 'AWS Batch'],
          correctAnswer: 'AWS Step Functions'
        }
      ];
    }
  };
  
  const renderReflectionForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Reflection Questions
      </Typography>
      <Typography variant="body2" paragraph>
        Take some time to reflect on your learning experience in this module.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <JugglingIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Juggling Reflection
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                How would you rate your progress with {module?.jugglingProp} juggling?
              </Typography>
              <Box sx={{ px: 2, mb: 3 }}>
                <Slider
                  value={reflectionData.jugglingProgress}
                  onChange={handleSliderChange('jugglingProgress')}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => 
                    value === 1 ? 'Just started' :
                    value === 2 ? 'Basic understanding' :
                    value === 3 ? 'Making progress' :
                    value === 4 ? 'Good progress' :
                    'Confident'
                  }
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                What challenges did you face while learning to juggle with {module?.jugglingProp}?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="jugglingChallenges"
                value={reflectionData.jugglingChallenges}
                onChange={handleInputChange}
                placeholder="Describe the challenges you faced..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Tech Reflection
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                How would you rate your understanding of {module?.techTheme}?
              </Typography>
              <Box sx={{ px: 2, mb: 3 }}>
                <Slider
                  value={reflectionData.techProgress}
                  onChange={handleSliderChange('techProgress')}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => 
                    value === 1 ? 'Just started' :
                    value === 2 ? 'Basic understanding' :
                    value === 3 ? 'Making progress' :
                    value === 4 ? 'Good understanding' :
                    'Confident'
                  }
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                What challenges did you face while learning about {module?.techTheme}?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="techChallenges"
                value={reflectionData.techChallenges}
                onChange={handleInputChange}
                placeholder="Describe the challenges you faced..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReflectionIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Connections & Next Steps
                </Typography>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                What connections do you see between {module?.jugglingProp} juggling and {module?.techTheme}?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="connections"
                value={reflectionData.connections}
                onChange={handleInputChange}
                placeholder="Describe any connections or parallels you noticed..."
                variant="outlined"
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle2" gutterBottom>
                What are your next steps for continuing to learn about these topics?
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="nextSteps"
                value={reflectionData.nextSteps}
                onChange={handleInputChange}
                placeholder="Describe your next learning goals..."
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
  
  const renderQuiz = () => {
    const questions = getQuizQuestions();
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Knowledge Check
        </Typography>
        <Typography variant="body2" paragraph>
          Test your understanding of the key concepts from this module.
        </Typography>
        
        {questions.map((question, index) => (
          <Card key={question.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {index + 1}. {question.question}
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  name={`quiz-${question.id}`}
                  value={reflectionData.quizAnswers[question.id] || ''}
                  onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                >
                  {question.options.map((option) => (
                    <FormControlLabel 
                      key={option} 
                      value={option} 
                      control={<Radio />} 
                      label={option} 
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              
              {submitted && (
                <Box sx={{ mt: 2 }}>
                  {reflectionData.quizAnswers[question.id] === question.correctAnswer ? (
                    <Alert severity="success">
                      Correct! {question.correctAnswer} is the right answer.
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      Incorrect. The correct answer is: {question.correctAnswer}
                    </Alert>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };
  
  const renderSummary = () => {
    // Calculate score
    const questions = getQuizQuestions();
    const correctAnswers = questions.filter(
      q => reflectionData.quizAnswers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Module Completion
        </Typography>
        
        {!submitted ? (
          <Box>
            <Typography variant="body1" paragraph>
              You've completed all the reflection questions and knowledge checks. Submit your responses to complete this module.
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Make sure you've answered all questions before submitting.
            </Alert>
            
            <Button 
              variant="contained" 
              color="primary"
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit & Complete Module'}
            </Button>
          </Box>
        ) : (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              Congratulations! You've completed the {module?.name} module.
            </Alert>
            
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Quiz Results
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    bgcolor: score >= 70 ? 'success.main' : 'warning.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <Typography variant="h5">
                    {score}%
                  </Typography>
                </Box>
                <Typography variant="body1">
                  You answered {correctAnswers} out of {questions.length} questions correctly.
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Self-Assessment
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Juggling Progress:</strong> {
                      reflectionData.jugglingProgress === 1 ? 'Just started' :
                      reflectionData.jugglingProgress === 2 ? 'Basic understanding' :
                      reflectionData.jugglingProgress === 3 ? 'Making progress' :
                      reflectionData.jugglingProgress === 4 ? 'Good progress' :
                      'Confident'
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Tech Understanding:</strong> {
                      reflectionData.techProgress === 1 ? 'Just started' :
                      reflectionData.techProgress === 2 ? 'Basic understanding' :
                      reflectionData.techProgress === 3 ? 'Making progress' :
                      reflectionData.techProgress === 4 ? 'Good understanding' :
                      'Confident'
                    }
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AchievementIcon sx={{ color: 'warning.main', fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">
                  Achievement Unlocked!
                </Typography>
                <Typography variant="body2">
                  {module?.name} Completion
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/learning-lab')}
              >
                Back to Learning Lab
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  };
  
  const steps = [
    {
      label: 'Reflection',
      content: renderReflectionForm()
    },
    {
      label: 'Knowledge Check',
      content: renderQuiz()
    },
    {
      label: 'Complete',
      content: renderSummary()
    }
  ];
  
  if (loading && !submitted) {
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
          Module Reflection: {module.name}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate(`/modules/${module.id}`)}
        >
          Back to Module
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {steps[activeStep].content}
        
        {!submitted && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<PrevIcon />}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NextIcon />}
              >
                Next
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
