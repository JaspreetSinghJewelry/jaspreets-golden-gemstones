import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (activeTab === 'signup') {
      if (!fullName.trim()) {
        errors.fullName = 'Full name is required';
      } else if (fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters long';
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

    try {
      if (activeTab === 'signin') {
        const { error } = await signIn(email.trim(), password);
        if (error) {
          if (error.message.includes('confirmation')) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your email and click the confirmation link before signing in.",
              variant: "destructive"
            });
            setPendingConfirmation(true);
          } else {
            toast({
              title: "Sign In Failed",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in."
          });
          onClose();
        }
      } else {
        const { error } = await signUp(email.trim(), password, fullName.trim(), phone.trim());
        if (error) {
          if (error.message.includes('already exists') || error.message.includes('already registered')) {
            toast({
              title: "Account Already Exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive"
            });
            setActiveTab('signin');
            setPassword('');
            setFullName('');
            setPhone('');
          } else {
            toast({
              title: "Sign Up Failed", 
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email and click the confirmation link to activate your account."
          });
          setPendingConfirmation(true);
          setActiveTab('signin');
          setPassword('');
          setFullName('');
          setPhone('');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToAuthPage = () => {
    onClose();
    navigate('/auth');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-xs w-[92vw] max-w-[380px] sm:p-4 p-2 rounded-lg"
        style={{ maxWidth: '380px', width: '92vw', minWidth: 0, padding: '0.5rem 1rem' }} // Tighter max-width & padding for all screens
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Welcome to Jaspreet Singh Jewelry</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Sign in to access exclusive collections and features
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="text-xs sm:text-base py-2 sm:py-3">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-xs sm:text-base py-2 sm:py-3">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="signin-email" className="text-xs sm:text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="signin-password" className="text-xs sm:text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-xs sm:text-base py-3"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {(pendingConfirmation || activeTab === 'signin') && (
                <div className="mt-4 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-xs text-blue-700">
                        {pendingConfirmation 
                          ? "Please check your email and click the confirmation link to activate your account."
                          : "New user? Please check your email and click the confirmation link after signing up."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="signup-name" className="text-xs sm:text-sm">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.fullName ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="signup-phone" className="text-xs sm:text-sm">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.phone ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="signup-email" className="text-xs sm:text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="signup-password" className="text-xs sm:text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 text-sm sm:text-base ${formErrors.password ? 'border-red-500' : ''}`}
                    minLength={6}
                    disabled={isLoading}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-xs sm:text-base py-3"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-4">
          <Button variant="ghost" onClick={goToAuthPage} className="text-xs sm:text-sm">
            Need more options? Go to full sign in page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
