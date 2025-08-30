import { Event, EventType } from '../types';

export const eventTypes: EventType[] = [
  {
    id: '1',
    name: 'Cleanup Drive',
    color: '#27AE60',
    icon: '🌱',
    description: 'Community cleanup and environmental initiatives'
  },
  {
    id: '2',
    name: 'Running Competition',
    color: '#E74C3C',
    icon: '🏃',
    description: 'Running events and marathons'
  },
  {
    id: '3',
    name: 'Chess Tournament',
    color: '#8E44AD',
    icon: '♟️',
    description: 'Strategic chess competitions'
  },
  {
    id: '4',
    name: 'Cycling Event',
    color: '#2980B9',
    icon: '🚴',
    description: 'Cycling tours and competitions'
  },
  {
    id: '5',
    name: 'Music Jamming',
    color: '#F39C12',
    icon: '🎵',
    description: 'Music sessions and jam nights'
  },
  {
    id: '6',
    name: 'Dance Workshop',
    color: '#E91E63',
    icon: '💃',
    description: 'Dance learning and practice sessions'
  },
  {
    id: '7',
    name: 'Community Meetup',
    color: '#00BCD4',
    icon: '👥',
    description: 'General community gatherings'
  },
  {
    id: '8',
    name: 'Tech Workshop',
    color: '#607D8B',
    icon: '💻',
    description: 'Technology and coding workshops'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Central Park Cleanup Drive',
    type: eventTypes[0],
    description: 'Join us for a community-driven cleanup initiative at Central Park. We\'ll be focusing on removing litter, planting new trees, and creating awareness about environmental conservation. This is a great opportunity to meet like-minded people while making a positive impact on our community.',
    requirements: [
      'Bring your own water bottle',
      'Wear comfortable clothes and shoes',
      'Gloves will be provided',
      'Bring a hat for sun protection'
    ],
    date: new Date('2024-09-15T09:00:00'),
    duration: 4,
    rules: [
      'All participants must check in at the registration desk',
      'Children under 16 must be accompanied by an adult',
      'Follow all safety guidelines provided by organizers',
      'Respect the park environment and wildlife'
    ],
    location: {
      state: 'New York',
      country: 'USA',
      city: 'New York',
      address: '1 Central Park West, New York, NY 10023',
      coordinates: {
        lat: 40.7829,
        lng: -73.9654
      },
      pincode: '10023'
    },
    capacity: 100,
    ticketType: 'free',
    createdBy: 'admin',
    createdAt: new Date('2024-08-20'),
    interestedUsers: ['user1', 'user2', 'user3', 'user4', 'user5'],
    checkedInUsers: [],
    image: 'https://example.com/cleanup.jpg'
  },
  {
    id: '2',
    name: 'Brooklyn Bridge 5K Run',
    type: eventTypes[1],
    description: 'Experience the thrill of running across the iconic Brooklyn Bridge in this exciting 5K race. The route offers stunning views of Manhattan skyline and the East River. Perfect for runners of all levels!',
    requirements: [
      'Running shoes mandatory',
      'Carry ID for registration',
      'Hydration pack recommended',
      'Athletic wear required'
    ],
    date: new Date('2024-09-22T07:00:00'),
    duration: 2,
    rules: [
      'Registration closes 30 minutes before start time',
      'No pets allowed during the race',
      'Follow traffic guidelines on the bridge',
      'Medical clearance recommended for first-time participants'
    ],
    location: {
      state: 'New York',
      country: 'USA',
      city: 'Brooklyn',
      address: 'Brooklyn Bridge Promenade, Brooklyn, NY 11201',
      coordinates: {
        lat: 40.7061,
        lng: -73.9969
      },
      pincode: '11201'
    },
    capacity: 200,
    ticketType: 'paid',
    price: 25,
    createdBy: 'admin',
    createdAt: new Date('2024-08-18'),
    interestedUsers: ['user1', 'user6', 'user7'],
    checkedInUsers: []
  },
  {
    id: '3',
    name: 'Washington Square Chess Tournament',
    type: eventTypes[2],
    description: 'Annual chess tournament in the heart of Greenwich Village. Open to players of all skill levels with separate categories for beginners, intermediate, and advanced players.',
    requirements: [
      'Bring your own chess set if possible',
      'Registration fee includes light refreshments',
      'Arrive 30 minutes early for check-in'
    ],
    date: new Date('2024-09-28T14:00:00'),
    duration: 6,
    rules: [
      'Standard tournament rules apply',
      'Time control: 30 minutes per player',
      'No electronic devices during games',
      'Respectful conduct required at all times'
    ],
    location: {
      state: 'New York',
      country: 'USA',
      city: 'New York',
      address: 'Washington Square Park, New York, NY 10012',
      coordinates: {
        lat: 40.7308,
        lng: -73.9973
      },
      pincode: '10012'
    },
    capacity: 64,
    ticketType: 'paid',
    price: 15,
    createdBy: 'admin',
    createdAt: new Date('2024-08-25'),
    interestedUsers: ['user2', 'user8', 'user9', 'user10'],
    checkedInUsers: []
  },
  {
    id: '4',
    name: 'Hudson River Bike Tour',
    type: eventTypes[3],
    description: 'Scenic cycling tour along the Hudson River waterfront. We\'ll explore beautiful parks, historic sites, and enjoy breathtaking river views. Perfect for cycling enthusiasts and nature lovers!',
    requirements: [
      'Bring your own bicycle',
      'Helmet mandatory for all participants',
      'Water bottle and snacks recommended',
      'Basic bike maintenance knowledge helpful'
    ],
    date: new Date('2024-10-05T10:00:00'),
    duration: 3,
    rules: [
      'Stay with the group at all times',
      'Follow all traffic laws and signals',
      'Maintain safe distance between cyclists',
      'Group leaders\' instructions must be followed'
    ],
    location: {
      state: 'New York',
      country: 'USA',
      city: 'New York',
      address: 'Hudson River Park, Pier 40, New York, NY 10014',
      coordinates: {
        lat: 40.7282,
        lng: -74.0084
      },
      pincode: '10014'
    },
    ticketType: 'free',
    createdBy: 'admin',
    createdAt: new Date('2024-08-22'),
    interestedUsers: ['user3', 'user11', 'user12'],
    checkedInUsers: []
  },
  {
    id: '5',
    name: 'Sunset Jazz Session at Bryant Park',
    type: eventTypes[4],
    description: 'Acoustic jazz jam session in the beautiful Bryant Park. Bring your instruments and join local musicians for an evening of improvisation and musical collaboration.',
    requirements: [
      'Bring your own instrument',
      'Basic musical knowledge recommended',
      'Folding chair or blanket for seating',
      'Sheet music if you have specific pieces'
    ],
    date: new Date('2024-09-30T18:00:00'),
    duration: 2.5,
    rules: [
      'Acoustic instruments only',
      'Respect other musicians and take turns',
      'No amplified equipment allowed',
      'Clean up your space after the session'
    ],
    location: {
      state: 'New York',
      country: 'USA',
      city: 'New York',
      address: 'Bryant Park, New York, NY 10018',
      coordinates: {
        lat: 40.7536,
        lng: -73.9832
      },
      pincode: '10018'
    },
    ticketType: 'free',
    createdBy: 'admin',
    createdAt: new Date('2024-08-28'),
    interestedUsers: ['user4', 'user13', 'user14', 'user15'],
    checkedInUsers: []
  }
];