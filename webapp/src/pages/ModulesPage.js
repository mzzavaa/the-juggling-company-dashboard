import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useUserProgress } from '../context/UserProgressContext';

export default function ModulesPage() {
  const { modules, loading } = useUserProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProp, setFilterProp] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter modules based on search and filters
  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.techTheme.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProp = filterProp === 'all' || module.jugglingProp === filterProp;
    const matchesStatus = filterStatus === 'all' || module.status === filterStatus;
    
    return matchesSearch && matchesProp && matchesStatus;
  });

  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading modules...</Typography></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Juggling Modules</Typography>
      
      {/* Search and filters */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Search Modules"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Prop Type</InputLabel>
          <Select
            value={filterProp}
            label="Prop Type"
            onChange={(e) => setFilterProp(e.target.value)}
          >
            <MenuItem value="all">All Props</MenuItem>
            <MenuItem value="balls">Balls</MenuItem>
            <MenuItem value="rings">Rings</MenuItem>
            <MenuItem value="clubs">Clubs</MenuItem>
            <MenuItem value="flower-stick">Flower Stick</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="locked">Locked</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Modules grid */}
      <Grid container spacing={3}>
        {filteredModules.map(module => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to={`/module/${module.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/400x200/?${module.jugglingProp},juggling`}
                  alt={module.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {module.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {module.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                      label={module.jugglingProp} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={module.status} 
                      size="small" 
                      color={
                        module.status === 'completed' ? 'success' : 
                        module.status === 'in-progress' ? 'warning' : 
                        'default'
                      } 
                    />
                  </Box>
                  
                  <Typography variant="body2">
                    <strong>Tech Theme:</strong> {module.techTheme}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Time:</strong> {module.timeEstimate.juggling} (juggling), {module.timeEstimate.tech} (tech)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        
        {filteredModules.length === 0 && (
          <Box sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <Typography>No modules match your search criteria.</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}
