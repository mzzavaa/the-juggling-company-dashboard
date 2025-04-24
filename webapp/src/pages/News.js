import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Tabs,
  Tab,
  InputBase,
  IconButton,
  Paper,
  Divider
} from '@mui/material';
import { 
  Article as NewsIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import NewsCard from '../components/NewsCard';
import newsData from '../data/news';

export default function News() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Filter news based on active tab and search query
  const getFilteredNews = () => {
    let filtered = [...newsData];
    
    // Filter by category
    if (activeTab === 1) {
      filtered = filtered.filter(news => news.category === 'Juggling & Technology');
    } else if (activeTab === 2) {
      filtered = filtered.filter(news => news.category === 'Juggling & Change');
    } else if (activeTab === 3) {
      filtered = filtered.filter(news => news.category === 'Juggling & Your Brain');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(query) || 
        news.excerpt.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredNews = getFilteredNews();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <NewsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        News & Updates
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab 
            label="Juggling & Technology" 
            sx={{ 
              '&.Mui-selected': { color: 'var(--tj-blue)' },
              '& .MuiTouchRipple-root': { color: 'var(--tj-blue)' }
            }} 
          />
          <Tab 
            label="Juggling & Change" 
            sx={{ 
              '&.Mui-selected': { color: 'var(--tj-green)' },
              '& .MuiTouchRipple-root': { color: 'var(--tj-green)' }
            }} 
          />
          <Tab 
            label="Juggling & Your Brain" 
            sx={{ 
              '&.Mui-selected': { color: 'var(--tj-red)' },
              '& .MuiTouchRipple-root': { color: 'var(--tj-red)' }
            }} 
          />
        </Tabs>
        
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search news"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton sx={{ p: '10px' }} aria-label="filter">
            <FilterIcon />
          </IconButton>
        </Paper>
      </Box>
      
      {filteredNews.length > 0 ? (
        <Grid container spacing={3}>
          {filteredNews.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <NewsCard news={news} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No news found matching your search criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
}
