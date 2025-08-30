import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  People as PeopleIcon,
  Event as EventIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { mockEvents } from '../../data/mockData';

const Analytics: React.FC = () => {
  const totalEvents = mockEvents.length;
  const totalInterested = mockEvents.reduce((sum, event) => sum + event.interestedUsers.length, 0);
  const avgInterested = Math.round(totalInterested / totalEvents);
  const upcomingEvents = mockEvents.filter(event => event.date > new Date()).length;

  const statCards = [
    {
      title: 'Total Events',
      value: totalEvents,
      icon: <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.light'
    },
    {
      title: 'Total Interested Users',
      value: totalInterested,
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'secondary.light'
    },
    {
      title: 'Avg. Interest per Event',
      value: avgInterested,
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.light'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: <LocationIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.light'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: 3,
        mb: 4 
      }}>
        {statCards.map((stat, index) => (
          <Card key={index} sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: stat.color, p: 1, borderRadius: 2 }}>
                {stat.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Event Performance
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Interested Users</TableCell>
                <TableCell>Checked In</TableCell>
                <TableCell>Attendance Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockEvents.map((event) => {
                const attendanceRate = event.interestedUsers.length > 0 
                  ? Math.round((event.checkedInUsers.length / event.interestedUsers.length) * 100)
                  : 0;
                
                return (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date.toLocaleDateString()}</TableCell>
                    <TableCell>{event.interestedUsers.length}</TableCell>
                    <TableCell>{event.checkedInUsers.length}</TableCell>
                    <TableCell>{attendanceRate}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Analytics;