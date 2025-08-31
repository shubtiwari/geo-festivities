import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert
} from '@mui/material';

interface InterestModalProps {
  open: boolean;
  onClose: () => void;
  eventName: string;
}

const InterestModal: React.FC<InterestModalProps> = ({ open, onClose, eventName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In real app, save to database via Supabase
    console.log('User interest data:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    onClose();
    
    // Reset form
    setFormData({ name: '', email: '', mobile: '', gender: '' });
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Show Your Interest</Typography>
        <Typography variant="body2" color="text.secondary">
          Event: {eventName}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please fill in your details to register your interest in this event.
        </Alert>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Mobile Number"
            value={formData.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{ mb: 2 }}
            required
          />
          
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {errors.gender}
              </Typography>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit Interest
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterestModal;