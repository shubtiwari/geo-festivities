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
import { countries, statesByCountry, citiesByCountryState, pincodeData } from '../data/countriesData';

interface LocationPermissionProps {
  onLocationResult: (location: {lat: number, lng: number} | null) => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onLocationResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualLocation, setManualLocation] = useState({
    city: '',
    state: '',
    country: 'india',
    pincode: ''
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

  const handlePincodeChange = (pincode: string) => {
    setManualLocation(prev => ({ ...prev, pincode }));
    
    // Auto-fill location from pincode
    if (pincode.length === 6 && pincodeData[pincode]) {
      const locationData = pincodeData[pincode];
      setManualLocation(prev => ({
        ...prev,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country.toLowerCase()
      }));
    }
  };

  const handleCountryChange = (country: string) => {
    setManualLocation(prev => ({
      ...prev,
      country,
      state: '',
      city: '',
      pincode: ''
    }));
  };

  const handleStateChange = (state: string) => {
    setManualLocation(prev => ({
      ...prev,
      state,
      city: ''
    }));
  };

  const handleManualSubmit = () => {
    // In a real app, you would geocode the city/state to get coordinates
    // For demo purposes, we'll use approximate coordinates for major Indian cities
    const cityCoordinates: {[key: string]: {lat: number, lng: number}} = {
      'mumbai': { lat: 19.0760, lng: 72.8777 },
      'delhi': { lat: 28.7041, lng: 77.1025 },
      'new delhi': { lat: 28.6139, lng: 77.2090 },
      'bangalore': { lat: 12.9716, lng: 77.5946 },
      'chennai': { lat: 13.0827, lng: 80.2707 },
      'kolkata': { lat: 22.5726, lng: 88.3639 },
      'pune': { lat: 18.5204, lng: 73.8567 },
      'hyderabad': { lat: 17.3850, lng: 78.4867 },
      'jaipur': { lat: 26.9124, lng: 75.7873 },
      'ahmedabad': { lat: 23.0225, lng: 72.5714 }
    };

    const cityKey = manualLocation.city.toLowerCase();
    const coordinates = cityCoordinates[cityKey] || { lat: 28.7041, lng: 77.1025 }; // Default to Delhi
    
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
              label="Pincode (Auto-fill)"
              value={manualLocation.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="Enter 6-digit pincode"
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={manualLocation.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                label="Country"
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }} disabled={!manualLocation.country}>
              <InputLabel>State</InputLabel>
              <Select
                value={manualLocation.state}
                onChange={(e) => handleStateChange(e.target.value)}
                label="State"
              >
                {manualLocation.country && statesByCountry[manualLocation.country]?.map((state) => (
                  <MenuItem key={state.id} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }} disabled={!manualLocation.state}>
              <InputLabel>City</InputLabel>
              <Select
                value={manualLocation.city}
                onChange={(e) => setManualLocation(prev => ({ ...prev, city: e.target.value }))}
                label="City"
              >
                {manualLocation.country && manualLocation.state && 
                 citiesByCountryState[manualLocation.country]?.[manualLocation.state.toLowerCase().replace(/\s+/g, '-')]?.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
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