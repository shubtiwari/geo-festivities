import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
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
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  PersonAdd as SignupIcon,
  AccountCircle as AccountIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockServiceProviders, serviceCategories } from '../data/serviceProvidersData';
import { ServiceProvider } from '../types';
import ServiceProviderCard from '../components/ServiceProviderCard';
import LocationPermission from '../components/LocationPermission';

const ServiceProviders: React.FC = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showLocationPermission, setShowLocationPermission] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [radius, setRadius] = useState(5);
  const [availability, setAvailability] = useState<string>('all');

  // Filter providers based on search term, services, and location
  useEffect(() => {
    let filtered = providers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Service filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter(provider =>
        provider.services.some(service => selectedServices.includes(service))
      );
    }

    // Availability filter
    if (availability !== 'all') {
      filtered = filtered.filter(provider => provider.availability === availability);
    }

    // Location filter
    if (userLocation) {
      filtered = filtered.filter(provider => {
        if (provider.location?.coordinates) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            provider.location.coordinates.lat,
            provider.location.coordinates.lng
          );
          return distance <= radius;
        }
        return false;
      });
    }

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedServices, availability, userLocation, radius]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getProviderDistance = (provider: ServiceProvider): number | undefined => {
    if (userLocation && provider.location?.coordinates) {
      return calculateDistance(
        userLocation.lat,
        userLocation.lng,
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      );
    }
    return undefined;
  };

  const handleLocationPermission = (location: {lat: number, lng: number}) => {
    setUserLocation(location);
    setShowLocationPermission(false);
  };

  const handleServiceFilter = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleCall = (provider: ServiceProvider) => {
    // In a real app, this would open the phone dialer
    window.open(`tel:${provider.phone}`, '_self');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedServices([]);
    setAvailability('all');
    setRadius(5);
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
            🔧 ServiceFinder
          </Typography>
          <Button
            startIcon={<SignupIcon />}
            onClick={() => navigate('/signup')}
            sx={{ mr: 1 }}
          >
            Join Us
          </Button>
          <IconButton onClick={() => navigate('/admin')}>
            <AdminIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Find Local Service Providers
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Connect with trusted electricians, plumbers, drivers, and more in your area
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search for services, providers, or skills..."
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

        {/* Filters */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Filter by Services
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {serviceCategories.map((category) => (
              <Chip
                key={category.name}
                label={`${category.icon} ${category.name}`}
                onClick={() => handleServiceFilter(category.name)}
                color={selectedServices.includes(category.name) ? "primary" : "default"}
                variant={selectedServices.includes(category.name) ? "filled" : "outlined"}
                sx={{ 
                  backgroundColor: selectedServices.includes(category.name) ? category.color : undefined,
                  '&:hover': {
                    backgroundColor: selectedServices.includes(category.name) ? category.color : undefined,
                    opacity: 0.8
                  }
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="body2" gutterBottom>
                Search Radius: {radius}km
              </Typography>
              <Slider
                value={radius}
                onChange={(_, newValue) => setRadius(newValue as number)}
                min={1}
                max={20}
                step={1}
                marks={[
                  { value: 1, label: '1km' },
                  { value: 5, label: '5km' },
                  { value: 10, label: '10km' },
                  { value: 20, label: '20km' }
                ]}
                valueLabelDisplay="auto"
                disabled={!userLocation}
              />
            </Box>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Availability</InputLabel>
              <Select
                value={availability}
                label="Availability"
                onChange={(e) => setAvailability(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="part-time">Part Time</MenuItem>
                <MenuItem value="weekends">Weekends</MenuItem>
                <MenuItem value="on-call">On Call</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Results */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            {filteredProviders.length} Service Provider{filteredProviders.length !== 1 ? 's' : ''} Found
          </Typography>
          {(selectedServices.length > 0 || searchTerm || availability !== 'all') && (
            <Button onClick={clearFilters} variant="outlined">
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Service Providers Grid */}
        {filteredProviders.length > 0 ? (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {filteredProviders.map((provider) => (
              <ServiceProviderCard
                key={provider.id}
                provider={provider}
                distance={getProviderDistance(provider)}
                onCall={() => handleCall(provider)}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No service providers found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or search in a different area
            </Typography>
            <Button onClick={clearFilters} variant="contained">
              Clear Filters
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServiceProviders;