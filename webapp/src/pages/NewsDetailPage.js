import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Button,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import newsData from '../data/news.json';
import images from '../assets';

export default function NewsDetailPage() {
  const { newsId } = useParams();
  
  // Find the news article with the matching ID
  const article = newsData.find(item => item.id === newsId);
  
  // Find related articles (excluding the current one)
  const relatedArticles = newsData
    .filter(item => item.id !== newsId)
    .slice(0, 2);
  
  if (!article) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Article not found.</Alert>
        <Button 
          component={Link} 
          to="/news" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to News
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="/news" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to News
      </Button>
      
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <img 
            src={images[article.imageKey]} 
            alt={article.title}
            style={{ 
              width: '100%', 
              height: '400px', 
              objectFit: 'cover' 
            }}
          />
        </Box>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Chip label={article.category} color="primary" />
            <Typography variant="body2" color="text.secondary">
              {article.date}
            </Typography>
          </Box>
          
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {article.summary}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body1" paragraph>
            {article.content}
          </Typography>
        </CardContent>
      </Paper>
      
      {relatedArticles.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>Related Articles</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {relatedArticles.map(item => (
              <Card key={item.id} sx={{ maxWidth: 345, flex: '1 1 300px' }}>
                <Box sx={{ position: 'relative', height: 140, overflow: 'hidden' }}>
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
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip label={item.category} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.summary}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={`/news/${item.id}`} 
                    sx={{ mt: 2 }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
