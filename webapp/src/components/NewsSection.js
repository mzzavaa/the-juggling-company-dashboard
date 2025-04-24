import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button 
} from '@mui/material';
import { 
  Article as NewsIcon,
  ArrowForward as ArrowForwardIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import newsData from '../data/news';

export default function NewsSection() {
  const navigate = useNavigate();
  // Get the latest 3 news items
  const latestNews = newsData.slice(0, 3);
  
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          <NewsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          News & Updates
        </Typography>
        
        <Button 
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/news')}
          sx={{ 
            fontWeight: 'medium',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          View all
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {latestNews.map((news) => (
          <Grid item xs={12} sm={6} md={4} key={news.id}>
            <NewsCard news={news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
