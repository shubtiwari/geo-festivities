import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { eventTypes } from '../../data/mockData';

const EventTypeManagement: React.FC = () => {
  const [types, setTypes] = useState(eventTypes);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#FF6B6B',
    icon: '',
    description: ''
  });

  const handleAddType = () => {
    setSelectedType(null);
    setFormData({ name: '', color: '#FF6B6B', icon: '', description: '' });
    setOpenDialog(true);
  };

  const handleEditType = (type: any) => {
    setSelectedType(type);
    setFormData({
      name: type.name,
      color: type.color,
      icon: type.icon,
      description: type.description
    });
    setOpenDialog(true);
  };

  const handleDeleteType = (typeId: string) => {
    setTypes(types.filter(type => type.id !== typeId));
  };

  const handleSave = () => {
    if (selectedType) {
      // Update existing type
      setTypes(types.map(type => 
        type.id === selectedType.id 
          ? { ...type, ...formData }
          : type
      ));
    } else {
      // Add new type
      const newType = {
        id: Date.now().toString(),
        ...formData
      };
      setTypes([...types, newType]);
    }
    setOpenDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Event Type Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddType}
        >
          Add New Type
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell sx={{ fontSize: '1.5rem' }}>{type.icon}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell>{type.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: type.color,
                      borderRadius: 1,
                      display: 'inline-block'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditType(type)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteType(type.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedType ? 'Edit Event Type' : 'Add New Event Type'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Type Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                fullWidth
                label="Icon (Emoji)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🎵"
              />
              
              <TextField
                fullWidth
                label="Color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {selectedType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventTypeManagement;