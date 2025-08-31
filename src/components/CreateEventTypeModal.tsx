import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface CreateEventTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (eventType: { name: string; icon: string; color: string }) => void;
}

const CreateEventTypeModal: React.FC<CreateEventTypeModalProps> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#1976d2'
  });

  const availableIcons = [
    { value: '🎵', label: '🎵 Music' },
    { value: '🏃', label: '🏃 Sports' },
    { value: '🎨', label: '🎨 Art' },
    { value: '💻', label: '💻 Tech' },
    { value: '📚', label: '📚 Education' },
    { value: '🍳', label: '🍳 Cooking' },
    { value: '🌱', label: '🌱 Environment' },
    { value: '🎭', label: '🎭 Theater' },
    { value: '📸', label: '📸 Photography' },
    { value: '🎯', label: '🎯 Gaming' },
    { value: '🧘', label: '🧘 Wellness' },
    { value: '🏛️', label: '🏛️ Cultural' }
  ];

  const availableColors = [
    '#1976d2', '#dc004e', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03dac6', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
    '#ff9800', '#ff5722', '#795548', '#607d8b'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.icon) {
      onSave(formData);
      setFormData({ name: '', icon: '', color: '#1976d2' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Event Type</DialogTitle>
      
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
          <TextField
            fullWidth
            label="Event Type Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 3 }}
            required
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Icon</InputLabel>
            <Select
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              label="Icon"
              required
            >
              {availableIcons.map((icon) => (
                <MenuItem key={icon.value} value={icon.value}>
                  {icon.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography variant="subtitle2" gutterBottom>
            Color
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {availableColors.map((color) => (
              <Box
                key={color}
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: formData.color === color ? '3px solid #000' : '1px solid #ccc',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create Event Type
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventTypeModal;