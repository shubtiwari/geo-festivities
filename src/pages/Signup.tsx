import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { ArrowBack, Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    // Provider specific fields
    services: [] as string[],
    experience: '',
    description: '',
    availability: 'full-time',
    hourlyRate: '',
  });
  
  const [newService, setNewService] = useState('');

  const serviceCategories = [
    'Electrician',
    'Plumber', 
    'Driver',
    'Carpenter',
    'Painter',
    'Mechanic',
    'Cleaner',
    'Cook',
    'Gardener',
    'Security Guard',
    'Delivery Person',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    alert('Account created successfully! (Frontend only - requires Supabase integration for actual signup)');
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create Account
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Join Our Community
            </Typography>
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant={userType === 'customer' ? 'contained' : 'outlined'}
                onClick={() => setUserType('customer')}
              >
                I'm a Customer
              </Button>
              <Button
                variant={userType === 'provider' ? 'contained' : 'outlined'}
                onClick={() => setUserType('provider')}
              >
                I'm a Service Provider
              </Button>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 3,
                mb: 3
              }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </Box>

              {userType === 'provider' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Service Provider Details
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Services Offered
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {formData.services.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
                          onDelete={() => handleRemoveService(service)}
                          deleteIcon={<Delete />}
                          color="primary"
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Select Service</InputLabel>
                        <Select
                          value={newService}
                          label="Select Service"
                          onChange={(e) => setNewService(e.target.value)}
                        >
                          {serviceCategories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        onClick={handleAddService}
                        startIcon={<Add />}
                        disabled={!newService}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                    mb: 3
                  }}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />

                    <FormControl fullWidth>
                      <InputLabel>Availability</InputLabel>
                      <Select
                        value={formData.availability}
                        label="Availability"
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                      >
                        <MenuItem value="full-time">Full Time</MenuItem>
                        <MenuItem value="part-time">Part Time</MenuItem>
                        <MenuItem value="weekends">Weekends Only</MenuItem>
                        <MenuItem value="on-call">On Call</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Hourly Rate (₹)"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your experience and services..."
                    sx={{ mb: 3 }}
                  />
                </Box>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Signup;