import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  MapPin, 
  Filter, 
  Plus, 
  User, 
  Settings, 
  ArrowRight,
  Star,
  Calendar,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';
import { mockEvents, eventTypes } from '../data/mockData';
import { Event, EventFilters } from '../types';
import EventCard from '../components/EventCard';
import LocationPermission from '../components/LocationPermission';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showLocationPermission, setShowLocationPermission] = useState(true);
  const [filters, setFilters] = useState<EventFilters>({
    location: {
      radius: 2,
      city: '',
      state: '',
      country: 'India'
    },
    eventTypes: [],
    ticketType: 'all'
  });

  useEffect(() => {
    // Filter events based on search and filters
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.eventTypes.length > 0) {
      filtered = filtered.filter(event =>
        filters.eventTypes.includes(event.type.id)
      );
    }

    if (filters.ticketType !== 'all') {
      filtered = filtered.filter(event => event.ticketType === filters.ticketType);
    }

    if (userLocation && filters.location.radius) {
      filtered = filtered.filter(event => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          event.location.coordinates.lat,
          event.location.coordinates.lng
        );
        return distance <= filters.location.radius;
      });
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filters, events]);

  const handleLocationPermission = (location: {lat: number, lng: number} | null) => {
    setUserLocation(location);
    setShowLocationPermission(false);
  };

  const handleEventTypeFilter = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(typeId)
        ? prev.eventTypes.filter(id => id !== typeId)
        : [...prev.eventTypes, typeId]
    }));
  };

  const handleRadiusChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      location: { ...prev.location, radius: value[0] }
    }));
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  if (showLocationPermission && !userLocation) {
    return <LocationPermission onLocationResult={handleLocationPermission} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/5">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Eventify
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
              Services
            </Button>
            <Button variant="ghost" onClick={() => navigate('/signup')} className="text-muted-foreground hover:text-foreground">
              Join Us
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </nav>

          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => navigate('/admin')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-6">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Discover amazing local events</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-6">
              Connect with Your 
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"> Community</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Find amazing events, connect with service providers, and discover what's happening around you
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search events, locations, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-base border-border/50 shadow-lg backdrop-blur-sm bg-background/80"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="h-12 px-8" onClick={() => navigate('/signup')}>
                <Plus className="w-4 h-4 mr-2" />
                Join as Provider
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8">
                <Calendar className="w-4 h-4 mr-2" />
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        {/* Filters Section */}
        <Card className="mb-8 border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            
            {/* Event Type Chips */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Event Types</h3>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <Badge
                    key={type.id}
                    variant={filters.eventTypes.includes(type.id) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 hover-scale"
                    onClick={() => handleEventTypeFilter(type.id)}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Distance Filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Search Radius: {filters.location.radius} km
                </h3>
                <Slider
                  value={[filters.location.radius]}
                  onValueChange={handleRadiusChange}
                  max={100}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>2km</span>
                  <span>50km</span>
                  <span>100km</span>
                </div>
              </div>

              {/* Ticket Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Ticket Type</h3>
                <Select value={filters.ticketType} onValueChange={(value) => setFilters(prev => ({ ...prev, ticketType: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="free">Free Events</SelectItem>
                    <SelectItem value="paid">Paid Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Counter */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Found Events</h3>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{filteredEvents.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredEvents.map((event) => (
              <div key={event.id} className="hover-scale">
                <EventCard
                  event={event}
                  userLocation={userLocation}
                  onClick={() => navigate(`/event/${event.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 border-dashed border-border/50">
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or explore different categories
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    location: { radius: 2, city: '', state: '', country: 'India' },
                    eventTypes: [],
                    ticketType: 'all'
                  });
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;