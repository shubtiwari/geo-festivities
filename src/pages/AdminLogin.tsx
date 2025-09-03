import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (email === 'admin@eventify.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@eventify.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Demo credentials: admin@eventify.com / admin123
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@eventify.com"
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-11"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-11 font-medium"
                size="lg"
              >
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;