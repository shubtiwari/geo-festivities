import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  MyLocation as MyLocationIcon,
} from '@mui/icons-material';

interface LocationPermissionProps {
  onLocationResult: (location: {lat: number, lng: number} | null) => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onLocationResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualLocation, setManualLocation] = useState({
    city: '',
    state: '',
    country: 'USA'
  });

  const handleGetLocation = () => {
    setLoading(true);
    setError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          onLocationResult({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLoading(false);
          setError('Unable to get your location. Please enter manually.');
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleManualSubmit = () => {
    // In a real app, you would geocode the city/state to get coordinates
    // For demo purposes, we'll use approximate coordinates for major cities
    const cityCoordinates: {[key: string]: {lat: number, lng: number}} = {
      'new york': { lat: 40.7128, lng: -74.0060 },
      'los angeles': { lat: 34.0522, lng: -118.2437 },
      'chicago': { lat: 41.8781, lng: -87.6298 },
      'houston': { lat: 29.7604, lng: -95.3698 },
      'phoenix': { lat: 33.4484, lng: -112.0740 },
      'philadelphia': { lat: 39.9526, lng: -75.1652 },
      'san antonio': { lat: 29.4241, lng: -98.4936 },
      'san diego': { lat: 32.7157, lng: -117.1611 },
      'dallas': { lat: 32.7767, lng: -96.7970 },
      'san jose': { lat: 37.3382, lng: -121.8863 }
    };

    const cityKey = manualLocation.city.toLowerCase();
    const coordinates = cityCoordinates[cityKey] || { lat: 40.7128, lng: -74.0060 }; // Default to NYC
    
    onLocationResult(coordinates);
  };

  const handleSkip = () => {
    onLocationResult(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <LocationIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          Find Events Near You
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          To show you the most relevant local events, we need to know your location.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<MyLocationIcon />}
            onClick={handleGetLocation}
            disabled={loading}
            sx={{ mb: 2, width: '100%' }}
          >
            {loading ? 'Getting Location...' : 'Use My Current Location'}
          </Button>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            or enter manually
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="City"
              value={manualLocation.city}
              onChange={(e) => setManualLocation(prev => ({ ...prev, city: e.target.value }))}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="State"
              value={manualLocation.state}
              onChange={(e) => setManualLocation(prev => ({ ...prev, state: e.target.value }))}
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={manualLocation.country}
                onChange={(e) => setManualLocation(prev => ({ ...prev, country: e.target.value }))}
                label="Country"
              >
                <MenuItem value="USA">United States</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleManualSubmit}
              disabled={!manualLocation.city || !manualLocation.state}
            >
              Set Location
            </Button>
          </Box>

          <Button
            variant="text"
            onClick={handleSkip}
            sx={{ color: 'text.secondary' }}
          >
            Skip for now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LocationPermission;