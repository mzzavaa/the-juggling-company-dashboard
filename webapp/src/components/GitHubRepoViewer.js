import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Grid,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Code as CodeIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Link as LinkIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  AccountTree as BranchIcon
} from '@mui/icons-material';

// Mock GitHub API response for demo purposes
const mockRepoData = {
  name: "juggling-tech-project",
  full_name: "the-juggling-company/juggling-tech-project",
  description: "A tech project for analyzing juggling patterns using AWS services",
  html_url: "https://github.com/the-juggling-company/juggling-tech-project",
  stargazers_count: 12,
  forks_count: 5,
  default_branch: "main",
  owner: {
    login: "the-juggling-company",
    avatar_url: "https://avatars.githubusercontent.com/u/12345678"
  }
};

const mockFileStructure = [
  {
    type: "dir",
    name: "src",
    path: "src",
    children: [
      { type: "file", name: "index.js", path: "src/index.js" },
      { type: "file", name: "app.js", path: "src/app.js" },
      { 
        type: "dir", 
        name: "components", 
        path: "src/components",
        children: [
          { type: "file", name: "JugglingAnalyzer.js", path: "src/components/JugglingAnalyzer.js" },
          { type: "file", name: "VideoUploader.js", path: "src/components/VideoUploader.js" }
        ]
      }
    ]
  },
  { type: "file", name: "README.md", path: "README.md" },
  { type: "file", name: "package.json", path: "package.json" },
  { type: "file", name: "serverless.yml", path: "serverless.yml" }
];

const mockFileContent = {
  "README.md": `# Juggling Tech Project

This project uses AWS services to analyze juggling patterns in videos.

## Features

- Upload juggling videos for analysis
- Get feedback on your juggling technique
- Track your progress over time

## AWS Services Used

- Amazon Rekognition for video analysis
- AWS Lambda for serverless processing
- Amazon S3 for video storage
- Amazon DynamoDB for storing analysis results

## Getting Started

1. Clone this repository
2. Install dependencies with \`npm install\`
3. Configure your AWS credentials
4. Run \`npm start\` to start the development server`,

  "src/components/JugglingAnalyzer.js": `import React, { useState } from 'react';
import AWS from 'aws-sdk';

const JugglingAnalyzer = ({ videoUrl }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeVideo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Configure AWS SDK
      const rekognition = new AWS.Rekognition();
      
      // Call Rekognition API
      const params = {
        Video: {
          S3Object: {
            Bucket: 'juggling-videos',
            Name: videoUrl.split('/').pop()
          }
        }
      };
      
      // This is a mock - in a real app, we would call rekognition.startLabelDetection
      console.log('Analyzing video:', videoUrl);
      
      // Simulate API call
      setTimeout(() => {
        setAnalysis({
          pattern: '3-ball cascade',
          confidence: 0.92,
          feedback: [
            'Good height consistency',
            'Try to keep elbows closer to body',
            'Rhythm is slightly uneven'
          ]
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Juggling Video Analyzer</h2>
      <button onClick={analyzeVideo} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Video'}
      </button>
      
      {error && <p className="error">{error}</p>}
      
      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <p><strong>Pattern:</strong> {analysis.pattern}</p>
          <p><strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%</p>
          
          <h4>Feedback:</h4>
          <ul>
            {analysis.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JugglingAnalyzer;`,

  "serverless.yml": `service: juggling-analyzer

provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - rekognition:*
        - s3:GetObject
        - dynamodb:PutItem
      Resource: '*'

functions:
  analyzeVideo:
    handler: src/handlers/analyzeVideo.handler
    events:
      - s3:
          bucket: juggling-videos
          event: s3:ObjectCreated:*
          
  getAnalysisResults:
    handler: src/handlers/getAnalysisResults.handler
    events:
      - http:
          path: analysis/{videoId}
          method: get
          cors: true

resources:
  Resources:
    JugglingVideoBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: juggling-videos
        
    AnalysisResultsTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: juggling-analysis-results
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: videoId
            AttributeType: S
        KeySchema:
          - AttributeName: videoId
            KeyType: HASH`
};

const GitHubRepoViewer = ({ repoUrl, onCodeSelect }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const [repoData, setRepoData] = useState(null);
  const [fileStructure, setFileStructure] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputUrl, setInputUrl] = useState(repoUrl || '');

  useEffect(() => {
    if (repoUrl) {
      loadRepository(repoUrl);
    }
  }, [repoUrl]);

  const loadRepository = (url) => {
    setLoading(true);
    setError(null);
    
    // Extract owner and repo name from URL
    // In a real app, we would make actual GitHub API calls
    setTimeout(() => {
      try {
        setRepoData(mockRepoData);
        setFileStructure(mockFileStructure);
        setLoading(false);
      } catch (err) {
        setError('Failed to load repository data');
        setLoading(false);
      }
    }, 1000);
  };

  const handleFileClick = (file) => {
    if (file.type === 'file') {
      setLoading(true);
      
      // In a real app, we would fetch the file content from GitHub API
      setTimeout(() => {
        setSelectedFile(file);
        setFileContent(mockFileContent[file.path] || `// Content for ${file.path} not available in mock data`);
        setLoading(false);
        
        // If onCodeSelect callback is provided, call it with the file content
        if (onCodeSelect && file.name.endsWith('.js')) {
          onCodeSelect(mockFileContent[file.path] || '');
        }
      }, 500);
    }
  };

  const handleLinkRepo = () => {
    if (inputUrl) {
      loadRepository(inputUrl);
    }
  };

  const renderFileTree = (files, depth = 0) => {
    return (
      <List dense={depth > 0} sx={{ pl: depth > 0 ? 2 : 0 }}>
        {files.map((file) => (
          <React.Fragment key={file.path}>
            <ListItem 
              button 
              onClick={() => handleFileClick(file)}
              selected={selectedFile?.path === file.path}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: isDarkMode ? 'rgba(41, 182, 246, 0.15)' : 'rgba(47, 99, 152, 0.1)',
                }
              }}
            >
              <ListItemIcon>
                {file.type === 'dir' ? <FolderIcon color="primary" /> : 
                 file.name.endsWith('.md') ? <DescriptionIcon color="secondary" /> :
                 <FileIcon />}
              </ListItemIcon>
              <ListItemText primary={file.name} />
            </ListItem>
            {file.type === 'dir' && file.children && renderFileTree(file.children, depth + 1)}
          </React.Fragment>
        ))}
      </List>
    );
  };

  const getFileLanguage = (fileName) => {
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.py')) return 'python';
    if (fileName.endsWith('.yml') || fileName.endsWith('.yaml')) return 'yaml';
    if (fileName.endsWith('.md')) return 'markdown';
    return 'text';
  };

  if (!repoUrl && !repoData) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Link GitHub Repository
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label="GitHub Repository URL"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            startIcon={<LinkIcon />}
            onClick={handleLinkRepo}
          >
            Link
          </Button>
        </Box>
        <Alert severity="info">
          Link a GitHub repository to view its files and integrate with your project.
        </Alert>
      </Paper>
    );
  }

  if (loading && !repoData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {repoData && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <GitHubIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {repoData.full_name}
            </Typography>
            <Tooltip title="Refresh repository data">
              <IconButton onClick={() => loadRepository(repoUrl)}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip 
              icon={<StarIcon />} 
              label={`${repoData.stargazers_count} stars`} 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              icon={<BranchIcon />} 
              label={repoData.default_branch} 
              size="small" 
              variant="outlined"
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<GitHubIcon />}
              href={repoData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </Box>
          
          {repoData.description && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {repoData.description}
            </Typography>
          )}
        </Paper>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Repository Files
            </Typography>
            {fileStructure.length > 0 ? (
              renderFileTree(fileStructure)
            ) : (
              <Typography variant="body2" color="text.secondary">
                No files found in repository
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            {selectedFile ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    {selectedFile.path}
                  </Typography>
                  {selectedFile.name.endsWith('.js') && (
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => onCodeSelect && onCodeSelect(fileContent)}
                    >
                      Use This Code
                    </Button>
                  )}
                </Box>
                
                {selectedFile.name.endsWith('.md') ? (
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 1, 
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    overflow: 'auto'
                  }}>
                    <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                      {fileContent}
                    </Typography>
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    multiline
                    rows={20}
                    value={fileContent}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      style: { 
                        fontFamily: 'monospace', 
                        fontSize: '0.9rem',
                        backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5'
                      }
                    }}
                  />
                )}
              </>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                p: 4
              }}>
                <CodeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Select a file from the repository to view its content
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GitHubRepoViewer;
