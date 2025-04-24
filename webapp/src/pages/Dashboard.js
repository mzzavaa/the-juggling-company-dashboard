import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardActionArea,
  Button,
  Avatar,
  LinearProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Psychology as ReflectionIcon,
  EmojiEvents as AchievementsIcon,
  ArrowForward as ArrowIcon,
  AccessTime as TimeIcon,
  Article as NewsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';
import NewsSection from '../components/NewsSection';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { modules, achievements, practiceSessions, loading, error } = useUserProgress();
  
  console.log('Dashboard rendering:', { user, modules, achievements, practiceSessions, loading, error });
  
  // Get active module
  const activeModule = modules?.find(module => module.status === 'in-progress');
  
  // Get recent achievements
  const recentAchievements = achievements
    .filter(achievement => achievement.unlocked)
    .sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned))
    .slice(0, 3);
  
  // Get recent practice sessions
  const recentPracticeSessions = practiceSessions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  
  // Calculate overall progress
  const completedModules = modules.filter(module => module.status === 'completed').length;
  const totalModules = modules.length;
  const overallProgress = Math.round((completedModules / totalModules) * 100);
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Welcome back, {user?.name.split(' ')[0]}!
        </Typography>
        <Button 
          variant="contained" 
          endIcon={<ArrowIcon />}
          onClick={() => navigate('/learning-lab')}
          sx={{ bgcolor: 'primary.main' }}
        >
          Enter Learning Lab
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Current Module */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Current Module
            </Typography>
            
            {activeModule ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 56, 
                      height: 56,
                      mr: 2
                    }}
                  >
                    {activeModule.jugglingProp === 'balls' && <JugglingIcon />}
                    {activeModule.jugglingProp === 'rings' && <JugglingIcon />}
                    {activeModule.jugglingProp === 'flower-stick' && <JugglingIcon />}
                    {activeModule.jugglingProp === 'clubs' && <JugglingIcon />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {activeModule.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={activeModule.progress} 
                        sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {activeModule.progress}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="body1" paragraph>
                  {activeModule.description}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <JugglingIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Juggling Prop:</strong> {activeModule.jugglingProp}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CodeIcon sx={{ mr: 1, color: 'secondary.main' }} />
                      <Typography variant="body2">
                        <strong>Tech Theme:</strong> {activeModule.techTheme}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ mr: 1, color: 'info.main' }} />
                      <Typography variant="body2">
                        <strong>Est. Time:</strong> Tech: {activeModule.timeEstimate.tech}, Juggling: {activeModule.timeEstimate.juggling}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate(`/modules/${activeModule.id}`)}
                  >
                    Continue Module
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate('/juggling-trainer')}
                  >
                    Practice Juggling
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" gutterBottom>
                  No active module. Start a new one!
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/learning-lab')}
                  sx={{ mt: 2 }}
                >
                  Choose Module
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Overall Progress */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  height: 120
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    bgcolor: 'background.default'
                  }}
                />
                <svg width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - overallProgress / 100)}
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4A2FBD" />
                      <stop offset="100%" stopColor="#2EC4B6" />
                    </linearGradient>
                  </defs>
                </svg>
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {overallProgress}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Complete
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Level:</strong> {user?.level || 1}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Modules Completed:</strong> {completedModules}/{totalModules}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Learning Style:</strong> {user?.learningStyle || "Reflector"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Achievements:</strong> {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </Typography>
            </Box>
            
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/profile')}
            >
              View Full Profile
            </Button>
          </Paper>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea onClick={() => navigate('/juggling-trainer')}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <JugglingIcon sx={{ fontSize: 40, color: 'var(--tj-blue)', mb: 1 }} />
                    <Typography variant="subtitle1">
                      Juggling Trainer
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea onClick={() => navigate('/tech-project/latest')}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <CodeIcon sx={{ fontSize: 40, color: 'var(--tj-green)', mb: 1 }} />
                    <Typography variant="subtitle1">
                      Tech Project
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea onClick={() => navigate('/reflection/latest')}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <ReflectionIcon sx={{ fontSize: 40, color: 'var(--tj-red)', mb: 1 }} />
                    <Typography variant="subtitle1">
                      Reflection
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardActionArea onClick={() => navigate('/achievements')}>
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <AchievementsIcon sx={{ fontSize: 40, color: 'var(--tj-sand)', mb: 1 }} />
                    <Typography variant="subtitle1">
                      Achievements
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Recent Achievements */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Achievements
            </Typography>
            
            {recentAchievements.length > 0 ? (
              <List>
                {recentAchievements.map((achievement) => (
                  <React.Fragment key={achievement.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ 
                          bgcolor: achievement.category === 'juggling' ? 'var(--tj-blue)' : 
                                  achievement.category === 'technical' ? 'var(--tj-green)' : 
                                  'var(--tj-red)' 
                        }}>
                          {achievement.category === 'juggling' ? <JugglingIcon /> : 
                           achievement.category === 'technical' ? <CodeIcon /> : 
                           <ReflectionIcon />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={achievement.title}
                        secondary={achievement.description}
                      />
                      <Chip 
                        label={achievement.dateEarned} 
                        size="small" 
                        variant="outlined"
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                No achievements yet. Start completing modules to earn them!
              </Typography>
            )}
            
            <Button 
              variant="text" 
              endIcon={<ArrowIcon />}
              onClick={() => navigate('/achievements')}
              sx={{ mt: 1 }}
            >
              View All Achievements
            </Button>
          </Paper>
        </Grid>
        
        {/* Recent Practice Sessions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Practice
            </Typography>
            
            {recentPracticeSessions.length > 0 ? (
              <List>
                {recentPracticeSessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <JugglingIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${session.propType} - ${session.duration} minutes`}
                        secondary={new Date(session.date).toLocaleDateString()}
                      />
                      <Box>
                        <Typography variant="caption" display="block">
                          Longest streak: {session.metrics.longestStreak}s
                        </Typography>
                        <Typography variant="caption" display="block">
                          Drops: {session.metrics.drops}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                No practice sessions recorded yet. Use the Juggling Trainer to track your practice!
              </Typography>
            )}
            
            <Button 
              variant="text" 
              endIcon={<ArrowIcon />}
              onClick={() => navigate('/juggling-trainer')}
              sx={{ mt: 1 }}
            >
              View All Practice Sessions
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* News & Updates Section */}
      <NewsSection />
    </Box>
  );
}
