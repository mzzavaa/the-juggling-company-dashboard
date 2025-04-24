import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Architecture as ArchitectureIcon,
  Storage as StorageIcon,
  CloudQueue as CloudIcon,
  Check as CheckIcon,
  PlayArrow as RunIcon,
  Save as SaveIcon,
  ContentCopy as CopyIcon,
  ArrowBack as BackIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';

// Mock code snippets for different modules
const codeSnippets = {
  'module-1': {
    python: `import boto3
import json

# This is a placeholder for Amazon Bedrock API calls
# In a real app, this would use the actual AWS SDK

def analyze_juggling_video(video_url):
    """
    Use AI to analyze a juggling video
    """
    print(f"Analyzing video: {video_url}")
    
    # Mock response - in a real app, this would call Amazon Bedrock
    analysis = {
        "pattern": "3-ball cascade",
        "confidence": 0.92,
        "catches": 24,
        "drops": 2,
        "feedback": [
            "Good height consistency",
            "Try to keep elbows closer to body",
            "Rhythm is slightly uneven"
        ]
    }
    
    return analysis

# Example usage
if __name__ == "__main__":
    video_url = "https://example.com/juggling-video.mp4"
    analysis = analyze_juggling_video(video_url)
    print(json.dumps(analysis, indent=2))`,
    
    javascript: `// This is a placeholder for AWS SDK calls
// In a real app, this would use the actual AWS SDK

async function analyzeJugglingVideo(videoUrl = "https://example.com/juggling-video.mp4") {
  console.log(\`Analyzing video: \${videoUrl}\`);
  
  // Mock response - in a real app, this would call Amazon Bedrock
  const analysis = {
    pattern: "3-ball cascade",
    confidence: 0.92,
    catches: 24,
    drops: 2,
    feedback: [
      "Good height consistency",
      "Try to keep elbows closer to body",
      "Rhythm is slightly uneven"
    ]
  };
  
  return analysis;
}

// Example usage
analyzeJugglingVideo("https://example.com/juggling-video.mp4")
  .then(analysis => console.log(JSON.stringify(analysis, null, 2)))
  .catch(err => console.error(err));`
  },
  
  'module-2': {
    python: `import boto3
import sagemaker
from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.steps import ProcessingStep, TrainingStep

# This is a placeholder for SageMaker MLOps pipeline
# In a real app, this would use the actual AWS SDK

def create_juggling_mlops_pipeline():
    """
    Create an MLOps pipeline for juggling pattern recognition
    """
    print("Creating MLOps pipeline for juggling pattern recognition")
    
    # Mock pipeline definition
    pipeline_steps = [
        "Data preparation",
        "Feature engineering",
        "Model training",
        "Model evaluation",
        "Model deployment"
    ]
    
    for step in pipeline_steps:
        print(f"- {step}")
    
    return "pipeline-1234"

# Example usage
if __name__ == "__main__":
    pipeline_id = create_juggling_mlops_pipeline()
    print(f"Pipeline created with ID: {pipeline_id}")`,
    
    yaml: `# This is a placeholder for CloudFormation template
# In a real app, this would be a valid CloudFormation template

Description: 'MLOps Pipeline for Juggling Pattern Recognition'

Resources:
  ModelMonitoringSchedule:
    Type: 'AWS::SageMaker::MonitoringSchedule'
    Properties:
      MonitoringScheduleName: 'juggling-model-monitoring'
      MonitoringScheduleConfig:
        ScheduleConfig:
          ScheduleExpression: 'cron(0 * ? * * *)'
        MonitoringJobDefinition:
          MonitoringType: DataQuality
          Environment:
            DATASET_FORMAT: '{"csv": {"header": true}}'
          MonitoringResources:
            ClusterConfig:
              InstanceCount: 1
              InstanceType: ml.m5.large
              VolumeSizeInGB: 50`
  },
  
  'module-3': {
    yaml: `# This is a placeholder for CloudFormation template
# In a real app, this would be a valid CloudFormation template

Description: 'Serverless Flower Stick Analysis Application'

Resources:
  VideoUploadBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'flower-stick-videos'

  VideoProcessorFunction:
    Type: 'AWS::Lambda::Function'
    Properties:
      FunctionName: FlowerStickVideoProcessor
      Handler: index.handler
      Runtime: nodejs14.x
      Timeout: 60
      MemorySize: 256
      Code:
        ZipFile: |
          // Lambda function code would go here`,
    
    javascript: `// This is a placeholder for Lambda function
// In a real app, this would use the actual AWS SDK

// Lambda function for flower stick video analysis
exports.handler = async (event) => {
  // Get the S3 bucket and key from the event
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  
  console.log(\`Processing video from \${bucket}/\${key}\`);
  
  try {
    // Mock video analysis process
    console.log("Starting video analysis...");
    console.log("Detecting objects and movements...");
    console.log("Analyzing flower stick technique...");
    
    // Mock analysis results
    const analysis = {
      technique: {
        stickControl: 0.75,
        handPosition: 0.82,
        balance: 0.68,
        rhythm: 0.79
      },
      feedback: [
        "Good hand position and control",
        "Work on maintaining consistent rhythm",
        "Practice balance transitions between hands"
      ]
    };
    
    console.log("Analysis complete:", JSON.stringify(analysis, null, 2));
    
    return {
      statusCode: 200,
      body: JSON.stringify('Video analysis complete')
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify(\`Error processing video: \${error.message}\`)
    };
  }
};`
  }
};

export default function TechProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const userProgress = useUserProgress();
  
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState('python');
  const [projectCode, setProjectCode] = useState('');
  const [runOutput, setRunOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [saved, setSaved] = useState(true);
  
  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let moduleId = projectId;
        
        // If projectId is 'latest', find the in-progress module
        if (projectId === 'latest') {
          const allModules = userProgress.modules;
          const inProgressModule = allModules.find(m => m.status === 'in-progress');
          if (inProgressModule) {
            moduleId = inProgressModule.id;
          } else {
            // If no in-progress module, use the first unlocked module
            const unlockedModule = allModules.find(m => m.unlocked);
            if (unlockedModule) {
              moduleId = unlockedModule.id;
            } else {
              throw new Error('No available modules found');
            }
          }
        }
        
        const foundModule = userProgress.modules.find(m => m.id === moduleId);
        
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
        
        // Set initial code based on module
        const snippets = codeSnippets[moduleId];
        if (snippets) {
          const languages = Object.keys(snippets);
          setActiveLanguage(languages[0]);
          setProjectCode(snippets[languages[0]]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading project:", err);
        setError('Failed to load project data');
        setLoading(false);
      }
    };
    
    loadProject();
  }, [projectId, userProgress.modules]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleLanguageChange = (language) => {
    if (!saved) {
      if (window.confirm('You have unsaved changes. Switch language anyway?')) {
        setActiveLanguage(language);
        setProjectCode(codeSnippets[module.id][language] || '');
        setSaved(true);
      }
    } else {
      setActiveLanguage(language);
      setProjectCode(codeSnippets[module.id][language] || '');
    }
  };
  
  const handleCodeChange = (e) => {
    setProjectCode(e.target.value);
    setSaved(false);
  };
  
  const handleSaveCode = () => {
    // In a real app, this would save to a backend
    setSaved(true);
    setRunOutput('Code saved successfully.');
  };
  
  const handleRunCode = () => {
    setIsRunning(true);
    setRunOutput('Running code...');
    
    // Define videoUrl to fix the reference error
    const videoUrl = "https://example.com/juggling-video.mp4";
    
    // Simulate code execution
    setTimeout(() => {
      setRunOutput(`
> Executing ${activeLanguage} code...
> Setting up environment...
> Processing data...
> Analyzing video: ${videoUrl}
> Analysis complete!

Results:
- Pattern identified: ${module?.jugglingProp === 'balls' ? '3-ball cascade' : 
                      module?.jugglingProp === 'rings' ? '3-ring cascade' : 
                      'Basic pattern'}
- Technique score: 78/100
- Areas for improvement: Timing consistency, height control

Resources used:
- ${module?.awsServices[0]} 
- ${module?.awsServices[1]}
${module?.awsServices[2] ? `- ${module?.awsServices[2]}` : ''}

Execution completed successfully in 3.2s
      `);
      setIsRunning(false);
    }, 3000);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(projectCode);
    setRunOutput('Code copied to clipboard.');
  };
  
  const renderArchitectureDiagram = () => (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Architecture Diagram
      </Typography>
      <Box 
        sx={{ 
          width: '100%', 
          height: 400, 
          bgcolor: 'background.default',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Architecture diagram placeholder - In a real app, this would show the AWS architecture
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {module?.jugglingProp === 'balls' ? 'AI-powered juggling analysis with Amazon Bedrock' : 
         module?.jugglingProp === 'rings' ? 'MLOps pipeline for ring juggling pattern recognition' :
         module?.jugglingProp === 'flower-stick' ? 'Serverless architecture for flower stick analysis' :
         'AWS architecture for juggling analysis'}
      </Typography>
    </Box>
  );
  
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
          Project not found
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">
            Tech Project: {module.name}
          </Typography>
          <Tooltip title="This is a simulated project environment. In a real app, you would be able to deploy to AWS.">
            <IconButton sx={{ ml: 1 }}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<BackIcon />}
          onClick={() => navigate(`/modules/${module.id}`)}
        >
          Back to Module
        </Button>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab icon={<CodeIcon />} label="Code" />
          <Tab icon={<ArchitectureIcon />} label="Architecture" />
          <Tab icon={<CloudIcon />} label="Resources" />
        </Tabs>
      </Paper>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: { xs: 3, md: 0 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {Object.keys(codeSnippets[module.id] || {}).map((lang) => (
                    <Chip 
                      key={lang}
                      label={lang === 'python' ? 'Python' : 
                             lang === 'javascript' ? 'JavaScript' : 
                             lang === 'yaml' ? 'YAML' : lang}
                      onClick={() => handleLanguageChange(lang)}
                      color={activeLanguage === lang ? 'primary' : 'default'}
                      variant={activeLanguage === lang ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
                <Box>
                  <Tooltip title="Copy code">
                    <IconButton onClick={handleCopyCode} size="small">
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                multiline
                rows={20}
                value={projectCode}
                onChange={handleCodeChange}
                variant="outlined"
                InputProps={{
                  style: { 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveCode}
                  disabled={saved}
                >
                  Save
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={isRunning ? <CircularProgress size={20} /> : <RunIcon />}
                  onClick={handleRunCode}
                  disabled={isRunning || !saved}
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TerminalIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Output
                </Typography>
              </Box>
              
              <TextField
                fullWidth
                multiline
                rows={15}
                value={runOutput}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem',
                    backgroundColor: '#000',
                    color: '#00ff00'
                  }
                }}
                sx={{ flexGrow: 1 }}
              />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Project Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    icon={<CheckIcon />} 
                    label="Code Ready" 
                    color="success" 
                    size="small"
                  />
                  <Chip 
                    label="Not Deployed" 
                    variant="outlined" 
                    size="small"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          {renderArchitectureDiagram()}
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Architecture Components
          </Typography>
          
          <Grid container spacing={3}>
            {module.awsServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
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
        </Paper>
      )}
      
      {activeTab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AWS Resources
          </Typography>
          <Typography variant="body2" paragraph>
            This project uses the following AWS resources:
          </Typography>
          
          <List>
            {module.awsServices.map((service, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CloudIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={service} 
                    secondary={
                      service.includes('Bedrock') ? 'Used for AI-powered analysis of juggling patterns' :
                      service.includes('SageMaker') ? 'Used for training and deploying ML models' :
                      service.includes('Lambda') ? 'Serverless functions for video processing' :
                      service.includes('Step Functions') ? 'Orchestrates the analysis workflow' :
                      service.includes('DynamoDB') ? 'Stores user progress and analysis results' :
                      service.includes('SQS') ? 'Handles message queuing for video processing' :
                      service.includes('SNS') ? 'Sends notifications when analysis is complete' :
                      service.includes('Rekognition') ? 'Analyzes video frames for juggling patterns' :
                      service.includes('EventBridge') ? 'Triggers workflows based on events' :
                      service.includes('CodePipeline') ? 'Automates the deployment process' :
                      'AWS service used in this project'
                    } 
                  />
                  <Chip 
                    label="Simulated" 
                    size="small" 
                    variant="outlined"
                  />
                </ListItem>
                {index < module.awsServices.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
          
          <Box sx={{ mt: 3 }}>
            <Alert severity="info">
              This is a simulated environment. In a real application, you would be able to deploy these resources to your AWS account.
            </Alert>
          </Box>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined"
              startIcon={<StorageIcon />}
            >
              View Resources
            </Button>
            <Button 
              variant="contained"
              startIcon={<CloudIcon />}
              disabled
            >
              Deploy to AWS
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
