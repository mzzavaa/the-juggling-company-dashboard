import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
  Badge,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  Psychology as ReflectionIcon,
  Lock as LockIcon,
  Share as ShareIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useUserProgress } from '../context/UserProgressContext';

export default function Achievements() {
  const { achievements, modules } = useUserProgress();
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Filter achievements by category
  const jugglingAchievements = achievements.filter(a => a.category === 'juggling');
  const techAchievements = achievements.filter(a => a.category === 'tech');
  
  // Calculate progress
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const progressPercentage = totalAchievements > 0 
    ? Math.round((unlockedAchievements / totalAchievements) * 100) 
    : 0;
  
  const getModuleName = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    return module ? module.name : 'Unknown Module';
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const renderAchievementCard = (achievement) => (
    <Grid item xs={12} sm={6} md={4} key={achievement.id}>
      <Card 
        sx={{ 
          height: '100%',
          position: 'relative',
          opacity: achievement.unlocked ? 1 : 0.7,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: achievement.unlocked ? 'translateY(-4px)' : 'none',
            boxShadow: achievement.unlocked ? 4 : 1
          }
        }}
      >
        {!achievement.unlocked && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              bgcolor: 'rgba(0, 0, 0, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
          </Box>
        )}
        
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: achievement.unlocked ? 'primary.main' : 'grey.300',
                fontSize: 36
              }}
            >
              {achievement.icon}
            </Avatar>
          </Box>
          
          <Typography variant="h6" align="center" gutterBottom>
            {achievement.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" paragraph>
            {achievement.description}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              <Chip 
                size="small" 
                label={getModuleName(achievement.moduleId)}
                color={achievement.unlocked ? 'primary' : 'default'}
                variant={achievement.unlocked ? 'filled' : 'outlined'}
              />
            </Box>
            
            {achievement.unlocked && (
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                Unlocked on {formatDate(achievement.unlockedAt)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
  
  const renderAllAchievements = () => (
    <Grid container spacing={3}>
      {achievements.map(renderAchievementCard)}
    </Grid>
  );
  
  const renderJugglingAchievements = () => (
    <Grid container spacing={3}>
      {jugglingAchievements.map(renderAchievementCard)}
    </Grid>
  );
  
  const renderTechAchievements = () => (
    <Grid container spacing={3}>
      {techAchievements.map(renderAchievementCard)}
    </Grid>
  );
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Achievements
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrophyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Your Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {unlockedAchievements} of {totalAchievements} achievements unlocked
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 10, borderRadius: 5, mt: 1 }} 
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
          <Chip 
            icon={<JugglingIcon />} 
            label={`${jugglingAchievements.filter(a => a.unlocked).length}/${jugglingAchievements.length} Juggling`}
            color="primary"
            variant="outlined"
          />
          <Chip 
            icon={<CodeIcon />} 
            label={`${techAchievements.filter(a => a.unlocked).length}/${techAchievements.length} Tech`}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Paper>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="All Achievements" />
          <Tab label="Juggling" icon={<JugglingIcon />} iconPosition="start" />
          <Tab label="Tech" icon={<CodeIcon />} iconPosition="start" />
        </Tabs>
      </Paper>
      
      {activeTab === 0 && renderAllAchievements()}
      {activeTab === 1 && renderJugglingAchievements()}
      {activeTab === 2 && renderTechAchievements()}
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Unlocks
        </Typography>
        
        <List>
          {achievements
            .filter(a => a.unlocked)
            .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
            .slice(0, 3)
            .map((achievement, index) => (
              <React.Fragment key={achievement.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {achievement.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={achievement.name}
                    secondary={`Unlocked on ${formatDate(achievement.unlockedAt)}`}
                  />
                  <Tooltip title="Share achievement">
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                {index < 2 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
        </List>
        
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
          <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
          <Typography variant="body2" color="text.secondary">
            Complete modules and challenges to unlock more achievements. Your progress is tracked automatically.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
