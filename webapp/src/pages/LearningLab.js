import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Button,
  Avatar,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Lock as LockIcon,
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';

export default function LearningLab() {
  const navigate = useNavigate();
  const { modules } = useUserProgress();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleInfoOpen, setModuleInfoOpen] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleModuleClick = (module) => {
    if (module.unlocked) {
      navigate(`/modules/${module.id}`);
    }
  };
  
  const handleModuleInfo = (module, event) => {
    event.stopPropagation();
    setSelectedModule(module);
    setModuleInfoOpen(true);
  };
  
  const handleCloseModuleInfo = () => {
    setModuleInfoOpen(false);
  };
  
  const getModuleStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success.main';
      case 'in-progress':
        return 'primary.main';
      case 'locked':
        return 'text.disabled';
      default:
        return 'text.primary';
    }
  };
  
  const getModuleStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckIcon sx={{ color: 'success.main' }} />;
      case 'in-progress':
        return <PlayIcon sx={{ color: 'primary.main' }} />;
      case 'locked':
        return <LockIcon sx={{ color: 'text.disabled' }} />;
      default:
        return null;
    }
  };
  
  const renderModuleCard = (module) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        opacity: module.unlocked ? 1 : 0.7,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': module.unlocked ? {
          transform: 'translateY(-4px)',
          boxShadow: 4
        } : {}
      }}
    >
      <CardActionArea 
        onClick={() => handleModuleClick(module)}
        disabled={!module.unlocked}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="140"
            image={`https://source.unsplash.com/random/400x200?${module.jugglingProp},juggling&sig=${module.id}`}
            alt={module.name}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10,
              display: 'flex',
              gap: 1
            }}
          >
            <Chip 
              label={module.jugglingProp}
              size="small"
              color="primary"
              variant="filled"
            />
          </Box>
          {!module.unlocked && (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <LockIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="div" gutterBottom>
              {module.name}
            </Typography>
            <IconButton 
              size="small" 
              onClick={(e) => handleModuleInfo(module, e)}
              sx={{ mt: -1, mr: -1 }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
            {module.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {getModuleStatusIcon(module.status)}
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1,
                color: getModuleStatusColor(module.status)
              }}
            >
              {module.status === 'completed' ? 'Completed' : 
               module.status === 'in-progress' ? 'In Progress' : 'Locked'}
            </Typography>
          </Box>
          
          {module.status === 'in-progress' && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {module.progress}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={module.progress} 
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
  
  const renderModuleInfoDialog = () => {
    if (!selectedModule) return null;
    
    return (
      <Dialog 
        open={moduleInfoOpen} 
        onClose={handleCloseModuleInfo}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedModule.name}
          <IconButton onClick={handleCloseModuleInfo} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" paragraph>
            {selectedModule.description}
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom>
                Juggling Prop
              </Typography>
              <Chip 
                icon={<JugglingIcon />}
                label={selectedModule.jugglingProp}
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom>
                Tech Theme
              </Typography>
              <Chip 
                icon={<CodeIcon />}
                label={selectedModule.techTheme}
                color="secondary"
                variant="outlined"
              />
            </Grid>
          </Grid>
          
          <Typography variant="subtitle2" gutterBottom>
            AWS Services
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {selectedModule.awsServices.map((service, index) => (
              <Chip 
                key={index}
                label={service}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>
            OTTO Tie-In
          </Typography>
          <Typography variant="body2" paragraph>
            {selectedModule.ottoTieIn}
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Reflection Focus
          </Typography>
          <Typography variant="body2" paragraph>
            {selectedModule.reflection}
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Estimated Time
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Tech:</strong> {selectedModule.timeEstimate.tech}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <strong>Juggling:</strong> {selectedModule.timeEstimate.juggling}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {selectedModule.unlocked ? (
            <Button 
              variant="contained" 
              onClick={() => {
                handleCloseModuleInfo();
                navigate(`/modules/${selectedModule.id}`);
              }}
            >
              {selectedModule.status === 'in-progress' ? 'Continue Module' : 'Start Module'}
            </Button>
          ) : (
            <Button variant="outlined" disabled>
              Complete Previous Module to Unlock
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Learning Lab
        </Typography>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="Modules" />
          <Tab label="Learning Path" />
          <Tab label="Resources" />
        </Tabs>
      </Paper>
      
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              {renderModuleCard(module)}
            </Grid>
          ))}
        </Grid>
      )}
      
      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Learning Path
          </Typography>
          
          <Box sx={{ position: 'relative', py: 4 }}>
            {/* Vertical line */}
            <Box 
              sx={{ 
                position: 'absolute', 
                left: '15px', 
                top: 0, 
                bottom: 0, 
                width: '2px', 
                bgcolor: 'divider' 
              }} 
            />
            
            {modules.map((module, index) => (
              <Box 
                key={module.id} 
                sx={{ 
                  display: 'flex', 
                  mb: index === modules.length - 1 ? 0 : 4,
                  opacity: module.unlocked ? 1 : 0.7
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: getModuleStatusColor(module.status),
                    zIndex: 1
                  }}
                >
                  {index + 1}
                </Avatar>
                <Paper 
                  sx={{ 
                    ml: 2, 
                    p: 2, 
                    flexGrow: 1,
                    cursor: module.unlocked ? 'pointer' : 'default'
                  }}
                  onClick={() => module.unlocked && navigate(`/modules/${module.id}`)}
                >
                  <Typography variant="h6" gutterBottom>
                    {module.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {module.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={module.jugglingProp}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        label={module.techTheme}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>
                    {module.status === 'in-progress' && (
                      <Typography variant="body2">
                        {module.progress}% complete
                      </Typography>
                    )}
                    {module.status === 'completed' && (
                      <Chip 
                        icon={<CheckIcon />}
                        label="Completed"
                        color="success"
                        size="small"
                      />
                    )}
                    {module.status === 'locked' && (
                      <Chip 
                        icon={<LockIcon />}
                        label="Locked"
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
      
      {activeTab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Learning Resources
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/400x200?juggling"
                  alt="Juggling Resources"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Juggling Tutorials
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Step-by-step guides for all juggling props used in the modules.
                  </Typography>
                  <Button size="small" color="primary">
                    Browse Tutorials
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/400x200?aws,cloud"
                  alt="AWS Resources"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    AWS Documentation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Official documentation for all AWS services used in the modules.
                  </Typography>
                  <Button size="small" color="primary">
                    Browse Documentation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://source.unsplash.com/random/400x200?ai,robot"
                  alt="AI Resources"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    AI Learning Resources
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Guides and tutorials for AI concepts used in the modules.
                  </Typography>
                  <Button size="small" color="primary">
                    Browse Resources
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
      
      {renderModuleInfoDialog()}
    </Box>
  );
}
