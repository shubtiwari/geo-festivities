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
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { mockEvents } from '../../data/mockData';
import EventForm from './EventForm';

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setOpenDialog(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Event Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          Add New Event
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Interested</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={event.type.name} 
                    size="small"
                    sx={{ backgroundColor: event.type.color, color: 'white' }}
                  />
                </TableCell>
                <TableCell>{event.date.toLocaleDateString()}</TableCell>
                <TableCell>{event.location.city}</TableCell>
                <TableCell>{event.interestedUsers.length}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => {}}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEditEvent(event)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteEvent(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
        </DialogTitle>
        <DialogContent>
          <EventForm event={selectedEvent} onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventManagement;