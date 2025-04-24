import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Chip,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Person as PersonIcon,
  Group as TeamIcon,
  Chat as ChatIcon,
  Assignment as TaskIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Schedule as PendingIcon
} from '@mui/icons-material';

// Mock team data
const teamMembers = [
  {
    id: 'member-1',
    name: 'Alex Johnson',
    role: 'Team Lead',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['Python', 'AWS', 'Machine Learning'],
    module: 'Rings - MLOps Feedback Loops',
    progress: 65
  },
  {
    id: 'member-2',
    name: 'Jamie Smith',
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    skills: ['JavaScript', 'React', 'AWS Lambda'],
    module: 'Balls - AI Foundations',
    progress: 100
  },
  {
    id: 'member-3',
    name: 'Taylor Wilson',
    role: 'Data Scientist',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Python', 'TensorFlow', 'SageMaker'],
    module: 'Rings - MLOps Feedback Loops',
    progress: 30
  },
  {
    id: 'member-4',
    name: 'Morgan Lee',
    role: 'DevOps Engineer',
    avatar: 'https://i.pravatar.cc/150?img=4',
    skills: ['AWS', 'Terraform', 'Docker'],
    module: 'Balls - AI Foundations',
    progress: 85
  }
];

// Mock tasks data
const teamTasks = [
  {
    id: 'task-1',
    title: 'Complete Module 2 Reflection',
    assignedTo: 'member-1',
    dueDate: '2023-05-10',
    status: 'pending'
  },
  {
    id: 'task-2',
    title: 'Review Team Project Architecture',
    assignedTo: 'member-4',
    dueDate: '2023-05-08',
    status: 'completed'
  },
  {
    id: 'task-3',
    title: 'Prepare Demo for Weekly Meeting',
    assignedTo: 'member-2',
    dueDate: '2023-05-12',
    status: 'pending'
  },
  {
    id: 'task-4',
    title: 'Train ML Model for Ring Detection',
    assignedTo: 'member-3',
    dueDate: '2023-05-15',
    status: 'pending'
  }
];

// Mock messages data
const teamMessages = [
  {
    id: 'msg-1',
    sender: 'member-2',
    content: 'I just completed the AI Foundations module! The Bedrock integration was really interesting.',
    timestamp: '2023-05-05T10:30:00Z'
  },
  {
    id: 'msg-2',
    sender: 'member-1',
    content: 'Great job! I am still working on the MLOps module. Anyone have tips for the SageMaker Pipelines part?',
    timestamp: '2023-05-05T10:45:00Z'
  },
  {
    id: 'msg-3',
    sender: 'member-3',
    content: 'I can help with that. Lets schedule a pair programming session tomorrow.',
    timestamp: '2023-05-05T11:00:00Z'
  },
  {
    id: 'msg-4',
    sender: 'member-4',
    content: 'Dont forget we have our team demo on Friday. Everyone should prepare their part.',
    timestamp: '2023-05-05T14:20:00Z'
  }
];

export default function Team() {
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to an API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };
  
  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  const getMemberById = (id) => {
    return teamMembers.find(member => member.id === id) || { name: 'Unknown' };
  };
  
  const renderTeamMembers = () => (
    <Grid container spacing={3}>
      {teamMembers.map((member) => (
        <Grid item xs={12} sm={6} md={3} key={member.id}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={member.avatar} 
                alt={member.name} 
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                {member.role}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mb: 2 }}>
                {member.skills.map((skill, index) => (
                  <Chip key={index} label={skill} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
            <Divider />
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Current Module
              </Typography>
              <Typography variant="body2" paragraph>
                {member.module}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.progress}%
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  width: '100%', 
                  bgcolor: 'background.default', 
                  borderRadius: 5, 
                  height: 8,
                  mt: 0.5
                }}
              >
                <Box 
                  sx={{ 
                    width: `${member.progress}%`, 
                    bgcolor: 'primary.main', 
                    height: '100%',
                    borderRadius: 5
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sm={6} md={3}>
        <Card 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            bgcolor: 'background.default',
            border: '2px dashed',
            borderColor: 'divider'
          }}
        >
          <AddIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" align="center" gutterBottom>
            Invite Team Member
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" paragraph>
            Add more people to your learning team
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('invite')}
          >
            Invite
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
  
  const renderTeamTasks = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Team Tasks
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />}
          size="small"
          onClick={() => handleOpenDialog('task')}
        >
          New Task
        </Button>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <List>
          {teamTasks.map((task, index) => {
            const member = getMemberById(task.assignedTo);
            return (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={member.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={task.title}
                    secondary={`Assigned to: ${member.name} • Due: ${task.dueDate}`}
                    primaryTypographyProps={{
                      style: { 
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                      }
                    }}
                  />
                  <ListItemSecondaryAction>
                    <Chip 
                      icon={task.status === 'completed' ? <CheckIcon /> : <PendingIcon />}
                      label={task.status === 'completed' ? 'Completed' : 'Pending'}
                      color={task.status === 'completed' ? 'success' : 'default'}
                      variant={task.status === 'completed' ? 'filled' : 'outlined'}
                      size="small"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                {index < teamTasks.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Team Project
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random/800x400?code,team"
          alt="Team project"
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Juggling Pattern Recognition System
          </Typography>
          <Typography variant="body2" paragraph>
            A collaborative project to build an end-to-end system that analyzes juggling patterns using AWS services.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label="In Progress" color="primary" size="small" />
            <Chip label="Due: May 30" variant="outlined" size="small" />
          </Box>
          <Button variant="contained">View Project</Button>
        </CardContent>
      </Card>
    </Box>
  );
  
  const renderTeamChat = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '60vh' }}>
      <Paper sx={{ p: 2, mb: 2, flexGrow: 1, overflow: 'auto' }}>
        {teamMessages.map((message) => {
          const sender = getMemberById(message.sender);
          const messageDate = new Date(message.timestamp);
          const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <Box key={message.id} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
              <Avatar src={sender.avatar} sx={{ mr: 1.5 }}>
                <PersonIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="subtitle2">
                    {sender.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formattedTime}
                  </Typography>
                </Box>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2,
                    bgcolor: 'background.default'
                  }}
                >
                  <Typography variant="body2">
                    {message.content}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          );
        })}
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          variant="contained" 
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
  
  const renderDialog = () => (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogType === 'invite' ? 'Invite Team Member' : 'Create New Task'}
        <IconButton
          onClick={handleCloseDialog}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {dialogType === 'invite' ? (
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Name (Optional)"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Role (Optional)"
              variant="outlined"
              margin="normal"
            />
          </Box>
        ) : (
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Assigned To"
              select
              SelectProps={{ native: true }}
              variant="outlined"
              margin="normal"
            >
              <option value="">Select team member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleCloseDialog}
        >
          {dialogType === 'invite' ? 'Send Invitation' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Team
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab icon={<TeamIcon />} label="Members" />
          <Tab icon={<TaskIcon />} label="Tasks & Projects" />
          <Tab icon={<ChatIcon />} label="Team Chat" />
        </Tabs>
      </Paper>
      
      {activeTab === 0 && renderTeamMembers()}
      {activeTab === 1 && renderTeamTasks()}
      {activeTab === 2 && renderTeamChat()}
      
      {renderDialog()}
    </Box>
  );
}
