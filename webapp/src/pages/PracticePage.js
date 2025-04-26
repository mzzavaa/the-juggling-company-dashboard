import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { 
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { useUserProgress } from '../context/UserProgressContext';
import images from '../assets';

export default function PracticePage() {
  const { practiceSessions, loading } = useUserProgress();
  const [propFilter, setPropFilter] = useState('all');
  const [selectedSession, setSelectedSession] = useState(null);
  
  // Filter practice sessions based on prop type
  const filteredSessions = practiceSessions.filter(session => 
    propFilter === 'all' || session.propType === propFilter
  );
  
  // Calculate statistics
  const totalPracticeTime = filteredSessions.reduce((total, session) => total + session.duration, 0);
  const averageSessionLength = filteredSessions.length > 0 
    ? totalPracticeTime / filteredSessions.length 
    : 0;
  const longestStreak = filteredSessions.length > 0
    ? Math.max(...filteredSessions.map(session => session.metrics.longestStreak))
    : 0;
  const totalCatches = filteredSessions.reduce((total, session) => 
    total + (session.metrics.catches || 0), 0
  );
  
  // Handle opening the detail dialog
  const handleOpenSession = (session) => {
    setSelectedSession(session);
  };
  
  // Handle closing the detail dialog
  const handleCloseSession = () => {
    setSelectedSession(null);
  };
  
  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading practice data...</Typography></Box>;
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Practice Sessions</Typography>
      
      {/* Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Prop</InputLabel>
          <Select
            value={propFilter}
            label="Filter by Prop"
            onChange={(e) => setPropFilter(e.target.value)}
          >
            <MenuItem value="all">All Props</MenuItem>
            <MenuItem value="balls">Balls</MenuItem>
            <MenuItem value="rings">Rings</MenuItem>
            <MenuItem value="clubs">Clubs</MenuItem>
            <MenuItem value="flower-stick">Flower Stick</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Practice Time</Typography>
              <Typography variant="h3">{totalPracticeTime} min</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Average Session</Typography>
              <Typography variant="h3">{averageSessionLength.toFixed(1)} min</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Longest Streak</Typography>
              <Typography variant="h3">{longestStreak} sec</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Catches</Typography>
              <Typography variant="h3">{totalCatches}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Practice Sessions */}
      <Grid container spacing={3}>
        {filteredSessions.map(session => (
          <Grid item xs={12} md={6} lg={4} key={session.id}>
            <Card 
              sx={{ cursor: 'pointer' }} 
              onClick={() => handleOpenSession(session)}
            >
              <Box sx={{ height: 200, overflow: 'hidden' }}>
                <img 
                  src={images[session.imageKey]} 
                  alt={`${session.propType} practice session`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {session.propType.charAt(0).toUpperCase() + session.propType.slice(1)} Practice
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {session.date} • {session.duration} minutes
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Streak</Typography>
                      <Typography variant="h6">{session.metrics.longestStreak}s</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Catches</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                        <Typography variant="h6">{session.metrics.catches}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Drops</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                        <Typography variant="h6">{session.metrics.drops}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {filteredSessions.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No practice sessions found.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Session Detail Dialog */}
      <Dialog
        open={!!selectedSession}
        onClose={handleCloseSession}
        maxWidth="md"
        fullWidth
      >
        {selectedSession && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {selectedSession.propType.charAt(0).toUpperCase() + selectedSession.propType.slice(1)} Practice Session
              </Typography>
              <IconButton onClick={handleCloseSession}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={images[selectedSession.imageKey]} 
                  alt="Practice session" 
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Session Details</Typography>
                      <Typography variant="body1">
                        <strong>Date:</strong> {selectedSession.date}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Duration:</strong> {selectedSession.duration} minutes
                      </Typography>
                      <Typography variant="body1">
                        <strong>Prop Type:</strong> {selectedSession.propType}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Longest Streak</Typography>
                            <Typography variant="h5">{selectedSession.metrics.longestStreak}s</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Total Catches</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
                              <Typography variant="h5">{selectedSession.metrics.catches}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Total Drops</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
                              <Typography variant="h5">{selectedSession.metrics.drops}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
