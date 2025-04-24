import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Button, 
  TextField, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  // IconButton, // Removed unused import
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  EmojiEvents as AchievementIcon,
  SportsGymnastics as JugglingIcon,
  School as LearningIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useUserProgress } from '../context/UserProgressContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { achievements } = useUserProgress();
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    learningStyle: user?.learningStyle || 'Reflector'
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await updateProfile(formData);
    
    if (success) {
      setEditing(false);
      setSuccessMessage('Profile updated successfully!');
    }
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      learningStyle: user?.learningStyle || 'Reflector'
    });
    setEditing(false);
  };
  
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const learningStyles = ['Activist', 'Reflector', 'Theorist', 'Pragmatist'];
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccessMessage('')} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                src={user?.avatar} 
                alt={user?.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Level {user?.level} {user?.learningStyle}
              </Typography>
              
              <Button 
                variant="outlined" 
                startIcon={editing ? <CancelIcon /> : <EditIcon />}
                onClick={() => editing ? handleCancel() : setEditing(true)}
                sx={{ mt: 2 }}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {editing ? (
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Learning Style</InputLabel>
                  <Select
                    name="learningStyle"
                    value={formData.learningStyle}
                    onChange={handleChange}
                    label="Learning Style"
                  >
                    {learningStyles.map(style => (
                      <MenuItem key={style} value={style}>{style}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Save Changes
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.email}
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                  Learning Style
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.learningStyle}
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                  Member Since
                </Typography>
                <Typography variant="body1">
                  April 2023
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {unlockedAchievements.map((achievement) => (
                <Chip 
                  key={achievement.id}
                  icon={<AchievementIcon />}
                  label={achievement.name}
                  color={achievement.category === 'juggling' ? 'primary' : 'secondary'}
                  variant="outlined"
                />
              ))}
              
              {unlockedAchievements.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No achievements unlocked yet.
                </Typography>
              )}
            </Box>
            
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Progress
            </Typography>
            <Typography variant="body2" gutterBottom>
              {unlockedAchievements.length} of {achievements.length} achievements unlocked
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Learning Stats
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <JugglingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Juggling Practice" 
                  secondary="Total practice time: 50 minutes" 
                />
                <Typography variant="body2">
                  3 sessions
                </Typography>
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <LearningIcon color="secondary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Tech Projects" 
                  secondary="Completed projects: 1" 
                />
                <Typography variant="body2">
                  1 in progress
                </Typography>
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AchievementIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Modules" 
                  secondary="Completed modules: 1" 
                />
                <Typography variant="body2">
                  1 in progress
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
