import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Avatar,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import newsData from '../data/news';

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  
  useEffect(() => {
    // Find the news article by slug
    const foundNews = newsData.find(item => item.slug === slug);
    
    if (foundNews) {
      setNews(foundNews);
    }
    
    setLoading(false);
  }, [slug]);
  
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  
  if (!news) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Article not found</Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/news')}
          sx={{ mt: 2 }}
        >
          Back to News
        </Button>
      </Box>
    );
  }
  
  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Juggling & Technology':
        return 'var(--tj-blue)';
      case 'Juggling & Change':
        return 'var(--tj-green)';
      case 'Juggling & Your Brain':
        return 'var(--tj-red)';
      default:
        return '#888';
    }
  };
  
  // Mock article content
  const articleContent = `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
    
    <p>Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
    
    <h2>Key Insights</h2>
    
    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.</p>
    
    <p>Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.</p>
    
    <h2>Practical Applications</h2>
    
    <p>Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue.</p>
    
    <p>Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo.</p>
    
    <h2>Conclusion</h2>
    
    <p>Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet.</p>
  `;
  
  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/news')}
        sx={{ mb: 3 }}
      >
        Back to News
      </Button>
      
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={news.category} 
            size="small" 
            sx={{ 
              fontWeight: 'medium',
              color: 'white',
              bgcolor: getCategoryColor(news.category)
            }} 
          />
        </Box>
        
        <Typography variant="h4" component="h1" gutterBottom>
          {news.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              alt={news.author} 
              src={`https://i.pravatar.cc/40?u=${news.author}`} 
              sx={{ mr: 1 }}
            />
            <Box>
              <Typography variant="subtitle2">{news.author}</Typography>
              <Typography variant="caption" color="text.secondary">{news.date}</Typography>
            </Box>
          </Box>
          
          <Box>
            <IconButton onClick={() => setBookmarked(!bookmarked)}>
              {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box 
          sx={{ mb: 4 }}
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Published on {news.date}
          </Typography>
          
          <Box>
            <Button 
              startIcon={<ShareIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Share
            </Button>
            <Button 
              startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              variant="contained"
              onClick={() => setBookmarked(!bookmarked)}
              sx={{ bgcolor: getCategoryColor(news.category) }}
            >
              {bookmarked ? 'Saved' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
