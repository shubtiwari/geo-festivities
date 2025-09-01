import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Rating,
  IconButton,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { ServiceProvider } from '../types';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  distance?: number;
  onCall: () => void;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
  distance,
  onCall,
}) => {
  const getServiceColor = (service: string) => {
    const colors = {
      'Electrician': '#FFB74D',
      'Plumber': '#64B5F6', 
      'Driver': '#81C784',
      'Carpenter': '#A1887F',
      'Painter': '#F06292',
      'Mechanic': '#9575CD',
      'Cleaner': '#4FC3F7',
      'Cook': '#FF8A65',
      'Gardener': '#AED581',
      'Security Guard': '#78909C',
      'Delivery Person': '#FFD54F',
      'Other': '#BCAAA4'
    };
    return colors[service as keyof typeof colors] || '#BCAAA4';
  };

  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={provider.profileImage}
            alt={provider.name}
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            {provider.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" component="h3" fontWeight="bold">
                {provider.name}
              </Typography>
              {provider.isVerified && (
                <VerifiedIcon color="primary" fontSize="small" />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={provider.rating} size="small" readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({provider.totalReviews} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Services:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {provider.services.slice(0, 3).map((service, index) => (
              <Chip
                key={index}
                label={service}
                size="small"
                sx={{ 
                  backgroundColor: getServiceColor(service),
                  color: 'white',
                  fontWeight: 'medium'
                }}
              />
            ))}
            {provider.services.length > 3 && (
              <Chip
                label={`+${provider.services.length - 3} more`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Box>

        {provider.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {provider.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {provider.experience}+ years
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            ₹{provider.hourlyRate}/hr
          </Typography>
          <Typography 
            variant="body2" 
            color="primary" 
            fontWeight="medium"
            sx={{ textTransform: 'capitalize' }}
          >
            {provider.availability.replace('-', ' ')}
          </Typography>
        </Box>

        {distance !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            <LocationIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`} away
            </Typography>
          </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          startIcon={<PhoneIcon />}
          onClick={onCall}
          sx={{ 
            mt: 'auto',
            backgroundColor: '#4CAF50',
            '&:hover': {
              backgroundColor: '#45a049',
            }
          }}
        >
          Call Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderCard;