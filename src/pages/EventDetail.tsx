import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  IconButton,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Rule as RuleIcon,
} from '@mui/icons-material';
import { Event } from '../types';
import { mockEvents } from '../data/mockData';
import InterestModal from '../components/InterestModal';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isInterested, setIsInterested] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  useEffect(() => {
    if (id) {
      const foundEvent = mockEvents.find(e => e.id === id);
      setEvent(foundEvent || null);
    }
  }, [id]);

  const handleInterested = () => {
    if (!isInterested) {
      setShowInterestModal(true);
    } else {
      setIsInterested(false);
    }
  };

  const handleInterestModalClose = () => {
    setShowInterestModal(false);
    setIsInterested(true);
  };

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!event) {
    return (
      <Container>
        <Typography variant="h6">Event not found</Typography>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
        <Box>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip 
                label={event.type.name} 
                color="primary" 
                variant="filled"
                sx={{ backgroundColor: event.type.color }}
              />
              <Typography variant="caption" color="text.secondary">
                {event.location.city}, {event.location.state}
              </Typography>
            </Box>
            
            <Typography variant="h3" component="h1" gutterBottom>
              {event.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon color="primary" />
                <Typography>
                  {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon color="primary" />
                <Typography>{event.location.address}</Typography>
              </Box>
            </Box>

            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
          </Paper>

          {event.requirements.length > 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon color="primary" />
                Requirements
              </Typography>
              <List>
                {event.requirements.map((req, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {event.rules.length > 0 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RuleIcon color="primary" />
                Rules & Guidelines
              </Typography>
              <List>
                {event.rules.map((rule, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={rule} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        <Box>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {event.ticketType === 'free' ? 'FREE' : `$${event.price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.capacity ? `${event.interestedUsers.length}/${event.capacity} spots` : 'Unlimited spots'}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleInterested}
                startIcon={isInterested ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                sx={{ mb: 2 }}
              >
                {isInterested ? 'Interested!' : 'I\'m Interested'}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleShare}
                startIcon={<ShareIcon />}
              >
                Share Event
              </Button>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" gutterBottom>
                  Event Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Duration:</Typography>
                  <Typography variant="body2">{event.duration} hours</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Interested:</Typography>
                  <Typography variant="body2">{event.interestedUsers.length} people</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Checked In:</Typography>
                  <Typography variant="body2">{event.checkedInUsers.length} people</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      
      <InterestModal
        open={showInterestModal}
        onClose={handleInterestModalClose}
        eventName={event.name}
      />
    </Container>
  );
};

export default EventDetail;