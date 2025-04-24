import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button 
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  // Determine the color based on category
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Juggling & Technology':
        return 'primary';
      case 'Juggling & Change':
        return 'secondary';
      case 'Juggling & Your Brain':
        return 'error';
      default:
        return 'default';
    }
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={news.category} 
            size="small" 
            color={getCategoryColor(news.category)}
            sx={{ 
              fontWeight: 'medium',
              color: 'white'
            }}
          />
        </Box>
        
        <Typography variant="h6" component="h2" gutterBottom>
          {news.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {news.summary}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            {news.date}
          </Typography>
          
          <Button 
            component={Link}
            to={`/news/${news.slug}`}
            size="small" 
            endIcon={<ArrowForwardIcon />}
          >
            Read More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
