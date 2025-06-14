
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log('Auth Page: Auth state changed', { isAuthenticated, loading });
    if (isAuthenticated && !loading) {
      console.log('Auth Page: User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        errors.fullName = 'Full name is required';
      }

      if (!phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (phone.trim().length < 10) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setFormErrors({});
    console.log(`Auth Page: Starting ${mode} process for:`, email);

    try {
      if (mode === 'signin') {
        console.log('Auth Page: Attempting signin...');
        const { error } = await signIn(email, password);
        
        if (error) {
          console.error('Auth Page: Signin failed:', error);
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          console.log('Auth Page: Signin successful');
          toast({
            title: "Welcome Back!",
            description: "You have been signed in successfully",
          });
        }
      } else {
        console.log('Auth Page: Attempting signup...');
        const { error } = await signUp(email, password, fullName, phone);
        
        if (error) {
          console.error('Auth Page: Signup failed:', error);
          toast({
            title: "Sign Up Failed", 
            description: error.message,
            variant: "destructive"
          });
        } else {
          console.log('Auth Page: Signup successful');
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account before signing in",
          });
          setMode('signin');
          setPassword('');
          setFullName('');
          setPhone('');
        }
      }
    } catch (error) {
      console.error('Auth Page: Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    console.log('Auth Page: Switching mode from', mode, 'to', mode === 'signin' ? 'signup' : 'signin');
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setPassword('');
    setFullName('');
    setPhone('');
    setFormErrors({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-black hover:text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="shadow-xl bg-white border border-gray-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              {mode === 'signin' ? (
                <Mail className="h-8 w-8 text-white" />
              ) : (
                <User className="h-8 w-8 text-white" />
              )}
            </div>
            <CardTitle>
              <FancyText variant="gradient" size="lg" className="text-2xl font-bold text-black">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </FancyText>
            </CardTitle>
            <CardDescription>
              {mode === 'signin' 
                ? 'Sign in to your account to continue shopping' 
                : 'Join Jaspreet Singh Jewelry for exclusive access'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`pl-10 ${formErrors.fullName ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      {formErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`pl-10 ${formErrors.phone ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete={mode === 'signin' ? 'email' : 'new-email'}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password (min 6 characters)'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white"
                size="lg"
              >
                {isLoading ? (
                  mode === 'signin' ? 'Signing In...' : 'Creating Account...'
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={toggleMode}
                className="text-sm"
                disabled={isLoading}
              >
                {mode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
