import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Tune as FilterIcon,
  Add as AddIcon,
  AccountCircle as AccountIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockEvents, eventTypes } from '../data/mockData';
import { Event, EventFilters } from '../types';
import EventCard from '../components/EventCard';
import LocationPermission from '../components/LocationPermission';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showLocationPermission, setShowLocationPermission] = useState(true);
  const [filters, setFilters] = useState<EventFilters>({
    location: {
      radius: 2,
      city: '',
      state: '',
      country: 'USA'
    },
    eventTypes: [],
    ticketType: 'all'
  });

  useEffect(() => {
    // Filter events based on search and filters
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Event type filter
    if (filters.eventTypes.length > 0) {
      filtered = filtered.filter(event =>
        filters.eventTypes.includes(event.type.id)
      );
    }

    // Ticket type filter
    if (filters.ticketType !== 'all') {
      filtered = filtered.filter(event => event.ticketType === filters.ticketType);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filters, events]);

  const handleLocationPermission = (location: {lat: number, lng: number} | null) => {
    setUserLocation(location);
    setShowLocationPermission(false);
  };

  const handleEventTypeFilter = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(typeId)
        ? prev.eventTypes.filter(id => id !== typeId)
        : [...prev.eventTypes, typeId]
    }));
  };

  const handleRadiusChange = (event: any, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      location: { ...prev.location, radius: newValue as number }
    }));
  };

  if (showLocationPermission && !userLocation) {
    return <LocationPermission onLocationResult={handleLocationPermission} />;
  }

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
            🎪 Eventify
          </Typography>
          <IconButton onClick={() => navigate('/admin')}>
            <AdminIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Discover Amazing Community Events
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Find and join local events happening around you
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search events, locations, or activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Box>
        </Box>

        {/* Filters Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon /> Filters
          </Typography>
          
          {/* Event Type Chips */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Event Types
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {eventTypes.map((type) => (
                <Chip
                  key={type.id}
                  label={`${type.icon} ${type.name}`}
                  variant={filters.eventTypes.includes(type.id) ? "filled" : "outlined"}
                  onClick={() => handleEventTypeFilter(type.id)}
                  sx={{
                    backgroundColor: filters.eventTypes.includes(type.id) ? type.color : 'transparent',
                    color: filters.eventTypes.includes(type.id) ? 'white' : type.color,
                    borderColor: type.color,
                    '&:hover': {
                      backgroundColor: type.color,
                      color: 'white'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Distance Filter */}
          <Box sx={{ mb: 3, maxWidth: 400 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Search Radius: {filters.location.radius} km
            </Typography>
            <Slider
              value={filters.location.radius}
              onChange={handleRadiusChange}
              step={null}
              marks={[
                { value: 2, label: '2km' },
                { value: 10, label: '10km' },
                { value: 50, label: '50km' },
                { value: 100, label: 'State-wide' }
              ]}
              min={2}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Ticket Type Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Ticket Type</InputLabel>
            <Select
              value={filters.ticketType}
              onChange={(e) => setFilters(prev => ({ ...prev, ticketType: e.target.value as any }))}
              label="Ticket Type"
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="free">Free Events</MenuItem>
              <MenuItem value="paid">Paid Events</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Results Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            {filteredEvents.length} Events Found
          </Typography>
        </Box>

        {/* Events Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3 
        }}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              userLocation={userLocation}
              onClick={() => navigate(`/event/${event.id}`)}
            />
          ))}
        </Box>

        {filteredEvents.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No events found matching your criteria
            </Typography>
            <Button variant="outlined" onClick={() => {
              setSearchTerm('');
              setFilters({
                location: { radius: 2, city: '', state: '', country: 'USA' },
                eventTypes: [],
                ticketType: 'all'
              });
            }}>
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Index;