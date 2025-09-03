import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Briefcase, Plus, X, Phone, Mail, Lock, Clock, DollarSign } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    // Provider specific fields
    services: [] as string[],
    experience: '',
    description: '',
    availability: 'full-time',
    hourlyRate: '',
  });
  
  const [newService, setNewService] = useState('');

  const serviceCategories = [
    'Electrician',
    'Plumber', 
    'Driver',
    'Carpenter',
    'Painter',
    'Mechanic',
    'Cleaner',
    'Cook',
    'Gardener',
    'Security Guard',
    'Delivery Person',
    'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    alert('Account created successfully! (Frontend only - requires Supabase integration for actual signup)');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              {userType === 'customer' ? (
                <User className="w-10 h-10 text-primary" />
              ) : (
                <Briefcase className="w-10 h-10 text-primary" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold">Join Our Community</CardTitle>
            <CardDescription className="text-base">
              Create your account and start connecting with {userType === 'customer' ? 'service providers' : 'customers'} in your area
            </CardDescription>
            
            <div className="flex justify-center gap-3">
              <Button
                variant={userType === 'customer' ? 'default' : 'outline'}
                onClick={() => setUserType('customer')}
                className="px-6"
              >
                <User className="w-4 h-4 mr-2" />
                I'm a Customer
              </Button>
              <Button
                variant={userType === 'provider' ? 'default' : 'outline'}
                onClick={() => setUserType('provider')}
                className="px-6"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                I'm a Service Provider
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a strong password"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      required
                      className="h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Service Provider Details */}
              {userType === 'provider' && (
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Service Provider Details
                  </h3>

                  {/* Services */}
                  <div className="space-y-3">
                    <Label>Services Offered</Label>
                    {formData.services.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {service}
                            <button
                              type="button"
                              onClick={() => handleRemoveService(service)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Select value={newService} onValueChange={setNewService}>
                        <SelectTrigger className="flex-1 h-11">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddService}
                        disabled={!newService}
                        className="h-11 px-4"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="e.g., 5"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Availability
                      </Label>
                      <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="weekends">Weekends Only</SelectItem>
                          <SelectItem value="on-call">On Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Hourly Rate (₹)
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        placeholder="e.g., 500"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your experience, specialties, and what makes you stand out..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;