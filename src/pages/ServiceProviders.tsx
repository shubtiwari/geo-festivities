import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, UserPlus, Settings, Phone } from 'lucide-react';
import { mockServiceProviders, serviceCategories } from '../data/serviceProvidersData';
import { ServiceProvider } from '../types';
import ServiceProviderCard from '../components/ServiceProviderCard';
import LocationPermission from '../components/LocationPermission';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ServiceProviders: React.FC = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showLocationPermission, setShowLocationPermission] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [radius, setRadius] = useState([5]);
  const [availability, setAvailability] = useState<string>('all');

  // Filter providers based on search term, services, and location
  useEffect(() => {
    let filtered = providers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Service filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter(provider =>
        provider.services.some(service => selectedServices.includes(service))
      );
    }

    // Availability filter
    if (availability !== 'all') {
      filtered = filtered.filter(provider => provider.availability === availability);
    }

    // Location filter
    if (userLocation) {
      filtered = filtered.filter(provider => {
        if (provider.location?.coordinates) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            provider.location.coordinates.lat,
            provider.location.coordinates.lng
          );
          return distance <= radius[0];
        }
        return false;
      });
    }

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedServices, availability, userLocation, radius]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getProviderDistance = (provider: ServiceProvider): number | undefined => {
    if (userLocation && provider.location?.coordinates) {
      return calculateDistance(
        userLocation.lat,
        userLocation.lng,
        provider.location.coordinates.lat,
        provider.location.coordinates.lng
      );
    }
    return undefined;
  };

  const handleLocationPermission = (location: {lat: number, lng: number}) => {
    setUserLocation(location);
    setShowLocationPermission(false);
  };

  const handleServiceFilter = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleCall = (provider: ServiceProvider) => {
    window.open(`tel:${provider.phone}`, '_self');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedServices([]);
    setAvailability('all');
    setRadius([5]);
  };

  if (showLocationPermission && !userLocation) {
    return <LocationPermission onLocationResult={handleLocationPermission} />;
  }

  return (
    <div className="min-h-screen">
      {/* Modern Header */}
      <header className="glass-card border-0 border-b border-border/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SF</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ServiceFinder
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/signup')}
                className="gradient-button border-0"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Us
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/admin')}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Find Local Service Providers
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with trusted professionals in your area. From electricians to drivers, find the right service provider in seconds.
          </p>
          
          {/* Modern Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for services, providers, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="modern-input pl-12 h-14 text-lg rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="glass-card mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Categories */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Service Categories</h3>
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((category) => (
                  <Badge
                    key={category.name}
                    variant={selectedServices.includes(category.name) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedServices.includes(category.name) 
                        ? 'gradient-button' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => handleServiceFilter(category.name)}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distance Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Search Radius: {radius[0]}km
                </label>
                <Slider
                  value={radius}
                  onValueChange={setRadius}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                  disabled={!userLocation}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1km</span>
                  <span>20km</span>
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  Availability
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="modern-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="on-call">On Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {filteredProviders.length} Provider{filteredProviders.length !== 1 ? 's' : ''} Found
            </span>
          </div>
          {(selectedServices.length > 0 || searchTerm || availability !== 'all') && (
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          )}
        </div>

        {/* Service Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredProviders.map((provider, index) => (
              <div 
                key={provider.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                        {provider.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{provider.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <span>⭐ {provider.rating}</span>
                          <span>({provider.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {provider.services.slice(0, 2).map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {provider.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{provider.services.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {provider.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">{provider.experience}+ years</span>
                      <span className="font-semibold">₹{provider.hourlyRate}/hr</span>
                    </div>

                    {getProviderDistance(provider) && (
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {getProviderDistance(provider)! < 1 
                            ? `${Math.round(getProviderDistance(provider)! * 1000)}m away`
                            : `${getProviderDistance(provider)!.toFixed(1)}km away`
                          }
                        </span>
                      </div>
                    )}

                    <Button 
                      onClick={() => handleCall(provider)}
                      className="w-full gradient-button"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="glass-card text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No service providers found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search in a different area
              </p>
              <Button onClick={clearFilters} className="gradient-button">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ServiceProviders;