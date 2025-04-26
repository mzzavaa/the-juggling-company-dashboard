import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Psychology as ReflectionIcon
} from '@mui/icons-material';
import { useUserProgress } from '../context/UserProgressContext';

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const { modules, achievements, loading, error } = useUserProgress();
  
  // Find the module with the matching ID
  const module = modules.find(m => m.id === moduleId);
  
  // Find achievements related to this module (in a real app, this would be filtered by moduleId)
  // For demo, we'll just show some achievements
  const moduleAchievements = achievements.slice(0, 2);
  
  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading module details...</Typography></Box>;
  }
  
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  
  if (!module) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Module not found.</Alert>
        <Button 
          component={Link} 
          to="/modules" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Modules
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="/modules" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Modules
      </Button>
      
      <Grid container spacing={3}>
        {/* Module header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <JugglingIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>{module.name}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={module.jugglingProp} color="primary" />
                  <Chip label={module.techTheme} color="secondary" />
                  <Chip 
                    label={module.status} 
                    color={
                      module.status === 'completed' ? 'success' : 
                      module.status === 'in-progress' ? 'warning' : 
                      'default'
                    } 
                  />
                </Box>
              </Box>
            </Box>
            
            <Typography variant="body1" paragraph>
              {module.description}
            </Typography>
            
            {module.status !== 'locked' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>Progress: {module.progress}%</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={module.progress} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Module details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Module Details</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ mb: 2, height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <JugglingIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Juggling Component</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      <strong>Prop:</strong> {module.jugglingProp}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Estimated Time:</strong> {module.timeEstimate.juggling}
                    </Typography>
                    <Typography variant="body2">
                      Practice with this prop to master the physical skills needed for this module.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card sx={{ mb: 2, height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CodeIcon sx={{ mr: 1, color: 'secondary.main' }} />
                      <Typography variant="h6">Technical Component</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      <strong>Theme:</strong> {module.techTheme}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Estimated Time:</strong> {module.timeEstimate.tech}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>AWS Services:</strong> {module.awsServices.join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      <strong>OTTO Tie-In:</strong> {module.ottoTieIn}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ReflectionIcon sx={{ mr: 1, color: 'info.main' }} />
                      <Typography variant="h6">Reflection Component</Typography>
                    </Box>
                    <Typography variant="body2">
                      {module.reflection}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Achievements */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>Module Achievements</Typography>
            
            {moduleAchievements.length > 0 ? (
              <List>
                {moduleAchievements.map((achievement) => (
                  <React.Fragment key={achievement.id}>
                    <ListItem>
                      <ListItemText
                        primary={achievement.title}
                        secondary={achievement.description}
                      />
                      {achievement.unlocked ? (
                        <Chip 
                          label="Unlocked" 
                          color="success" 
                          size="small" 
                        />
                      ) : (
                        <Chip 
                          label="Locked" 
                          variant="outlined" 
                          size="small" 
                        />
                      )}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2">No achievements available for this module.</Typography>
            )}
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Start Learning</Typography>
              
              {module.status === 'locked' ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                  This module is currently locked. Complete previous modules to unlock it.
                </Alert>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  disabled={module.status === 'locked'}
                >
                  {module.status === 'completed' ? 'Review Module' : 'Continue Learning'}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
