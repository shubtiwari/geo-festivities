import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { eventTypes } from '../../data/mockData';
import { countries, statesByCountry, citiesByCountryState, pincodeData } from '../../data/countriesData';
import CreateEventTypeModal from '../CreateEventTypeModal';

interface EventFormProps {
  event?: any;
  onClose: () => void;
  onEventTypeCreated?: (eventType: { name: string; icon: string; color: string }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onClose, onEventTypeCreated }) => {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    typeId: event?.type?.id || '',
    description: event?.description || '',
    date: event?.date ? event.date.toISOString().slice(0, 16) : '',
    duration: event?.duration || 1,
    location: {
      address: event?.location?.address || '',
      city: event?.location?.city || '',
      state: event?.location?.state || '',
      country: event?.location?.country || 'india',
      pincode: event?.location?.pincode || '',
    },
    capacity: event?.capacity || '',
    ticketType: event?.ticketType || 'free',
    price: event?.price || 0,
  });

  const [requirements, setRequirements] = useState<string[]>(event?.requirements || ['']);
  const [rules, setRules] = useState<string[]>(event?.rules || ['']);
  const [showCreateEventType, setShowCreateEventType] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayChange = (
    array: string[], 
    setArray: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number, 
    value: string
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const addArrayItem = (
    array: string[], 
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray([...array, '']);
  };

  const removeArrayItem = (
    array: string[], 
    setArray: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number
  ) => {
    if (array.length > 1) {
      setArray(array.filter((_, i) => i !== index));
    }
  };

  const handlePincodeChange = (pincode: string) => {
    handleInputChange('location.pincode', pincode);
    
    // Auto-fill location from pincode
    if (pincode.length === 6 && pincodeData[pincode]) {
      const locationData = pincodeData[pincode];
      handleInputChange('location.city', locationData.city);
      handleInputChange('location.state', locationData.state);
      handleInputChange('location.country', locationData.country.toLowerCase());
    }
  };

  const handleCountryChange = (country: string) => {
    handleInputChange('location.country', country);
    handleInputChange('location.state', '');
    handleInputChange('location.city', '');
  };

  const handleStateChange = (state: string) => {
    handleInputChange('location.state', state);
    handleInputChange('location.city', '');
  };

  const handleCreateEventType = (newEventType: { name: string; icon: string; color: string }) => {
    // In real app, save to database
    console.log('New event type created:', newEventType);
    onEventTypeCreated?.(newEventType);
    setShowCreateEventType(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log('Saving event:', formData, requirements, rules);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
        {/* Basic Info */}
        <TextField
          fullWidth
          label="Event Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box>
            <FormControl fullWidth required>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={formData.typeId}
                onChange={(e) => handleInputChange('typeId', e.target.value)}
                label="Event Type"
              >
                {eventTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowCreateEventType(true)}
              sx={{ mt: 1, width: '100%' }}
            >
              + Create New Event Type
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Date & Time"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            fullWidth
            label="Duration (hours)"
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', Number(e.target.value))}
            required
          />

          <TextField
            fullWidth
            label="Capacity (optional)"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', Number(e.target.value))}
          />
        </Box>

        <TextField
          fullWidth
          label="Address"
          value={formData.location.address}
          onChange={(e) => handleInputChange('location.address', e.target.value)}
          required
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Pincode (Auto-fill)"
            value={formData.location.pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            placeholder="Enter 6-digit pincode"
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          <FormControl fullWidth required>
            <InputLabel>Country</InputLabel>
            <Select
              value={formData.location.country}
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

          <FormControl fullWidth required disabled={!formData.location.country}>
            <InputLabel>State</InputLabel>
            <Select
              value={formData.location.state}
              onChange={(e) => handleStateChange(e.target.value)}
              label="State"
            >
              {formData.location.country && statesByCountry[formData.location.country]?.map((state) => (
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required disabled={!formData.location.state}>
            <InputLabel>City</InputLabel>
            <Select
              value={formData.location.city}
              onChange={(e) => handleInputChange('location.city', e.target.value)}
              label="City"
            >
              {formData.location.country && formData.location.state && 
               citiesByCountryState[formData.location.country]?.[formData.location.state.toLowerCase().replace(/\s+/g, '-')]?.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          {requirements.map((req, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Enter requirement"
                value={req}
                onChange={(e) => handleArrayChange(requirements, setRequirements, index, e.target.value)}
              />
              <IconButton onClick={() => removeArrayItem(requirements, setRequirements, index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={() => addArrayItem(requirements, setRequirements)}
          >
            Add Requirement
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Rules & Guidelines
          </Typography>
          {rules.map((rule, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Enter rule"
                value={rule}
                onChange={(e) => handleArrayChange(rules, setRules, index, e.target.value)}
              />
              <IconButton onClick={() => removeArrayItem(rules, setRules, index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={() => addArrayItem(rules, setRules)}
          >
            Add Rule
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </Box>
      </Box>
      
      <CreateEventTypeModal
        open={showCreateEventType}
        onClose={() => setShowCreateEventType(false)}
        onSave={handleCreateEventType}
      />
    </Box>
  );
};

export default EventForm;