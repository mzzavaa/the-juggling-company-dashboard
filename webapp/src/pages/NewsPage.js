import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Chip,
  Divider,
  Button,
  CardActionArea,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import newsData from '../data/news.json';
import images from '../assets';

export default function NewsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>News & Insights</Typography>
      
      <Grid container spacing={3}>
        {/* Featured news item */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardActionArea component={Link} to={`/news/${newsData[0].id}`}>
              <Box sx={{ position: 'relative' }}>
                <img 
                  src={images[newsData[0].imageKey]} 
                  alt={newsData[0].title}
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover' 
                  }}
                />
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip label={newsData[0].category} color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {newsData[0].date}
                  </Typography>
                </Box>
                <Typography variant="h5" gutterBottom>
                  {newsData[0].title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {newsData[0].summary}
                </Typography>
                <Button variant="contained" color="primary">
                  Read More
                </Button>
              </CardContent>
            </CardActionArea>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>Recent Articles</Typography>
        </Grid>
        
        {/* Other news items */}
        {newsData.slice(1).map(item => (
          <Grid item xs={12} md={6} key={item.id}>
            <Paper elevation={2} sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
              <CardActionArea 
                component={Link} 
                to={`/news/${item.id}`}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%' 
                }}
              >
                <Box sx={{ width: '100%', height: 200, overflow: 'hidden' }}>
                  <img 
                    src={images[item.imageKey]} 
                    alt={item.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip label={item.category} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {item.summary}
                  </Typography>
                  <Button variant="contained" color="primary" size="small">
                    Read More
                  </Button>
                </CardContent>
              </CardActionArea>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
