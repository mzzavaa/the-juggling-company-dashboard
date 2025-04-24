import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  TextField,
  Alert
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  SportsGymnastics as JugglingIcon,
  Code as CodeIcon,
  School as LearningIcon,
  LiveHelp as FAQIcon,
  ContactSupport as ContactIcon,
  VideoLibrary as VideoIcon
} from '@mui/icons-material';

export default function Help() {
  const [contactMessage, setContactMessage] = React.useState('');
  const [messageSent, setMessageSent] = React.useState(false);
  
  const handleSendMessage = () => {
    if (contactMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log('Sending message:', contactMessage);
      setContactMessage('');
      setMessageSent(true);
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 5000);
    }
  };
  
  const faqs = [
    {
      question: "How do I track my juggling progress?",
      answer: "You can track your juggling progress by using the Juggling Trainer feature. Upload videos of your practice sessions, and our AI will analyze your technique and provide feedback. Your progress is automatically saved and can be viewed in your profile."
    },
    {
      question: "How do modules work?",
      answer: "Each module combines juggling skills with tech concepts. Complete the learning materials, practice the juggling techniques, work on the tech project, and submit your reflection to complete a module. New modules unlock as you progress."
    },
    {
      question: "Can I reset my progress?",
      answer: "Yes, you can reset your progress for individual modules from your profile settings. Note that this will remove all achievements and records associated with that module."
    },
    {
      question: "How do I deploy my tech projects to AWS?",
      answer: "In the Tech Projects section, after you've completed your code, you can use the 'Deploy to AWS' button. You'll need to have valid AWS credentials configured. For educational purposes, some projects may use simulated deployments."
    },
    {
      question: "How do teams work?",
      answer: "Teams allow you to collaborate with other learners. You can share progress, work on projects together, and communicate through the team chat. Team members can see each other's progress and help each other with challenges."
    }
  ];
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Help Center
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Frequently Asked Questions
            </Typography>
            
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Video Tutorials
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <VideoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Getting Started Guide
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Learn the basics of navigating the platform and tracking your progress.
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <VideoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Juggling Trainer Tutorial
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      How to use the AI-powered juggling trainer for feedback on your technique.
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <VideoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Tech Projects Walkthrough
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Step-by-step guide to completing and deploying your tech projects.
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      bgcolor: 'grey.200', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <VideoIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Team Collaboration Features
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      How to effectively use team features for collaborative learning.
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small" 
                      sx={{ mt: 1 }}
                    >
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            
            <List>
              <ListItem button>
                <ListItemIcon>
                  <JugglingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Juggling Techniques" 
                  secondary="Basic to advanced juggling tutorials" 
                />
              </ListItem>
              
              <Divider component="li" />
              
              <ListItem button>
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="AWS Documentation" 
                  secondary="Official AWS service documentation" 
                />
              </ListItem>
              
              <Divider component="li" />
              
              <ListItem button>
                <ListItemIcon>
                  <LearningIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Learning Resources" 
                  secondary="Additional learning materials" 
                />
              </ListItem>
              
              <Divider component="li" />
              
              <ListItem button>
                <ListItemIcon>
                  <FAQIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Full FAQ" 
                  secondary="Complete list of frequently asked questions" 
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Support
            </Typography>
            
            {messageSent ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Your message has been sent! We'll respond shortly.
              </Alert>
            ) : (
              <Typography variant="body2" color="text.secondary" paragraph>
                Need help with something specific? Send us a message and we'll get back to you as soon as possible.
              </Typography>
            )}
            
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            
            <Button 
              variant="contained" 
              fullWidth
              startIcon={<ContactIcon />}
              onClick={handleSendMessage}
              disabled={!contactMessage.trim()}
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
