import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const SignIn = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const sanitizeName = (input: string) => {
    return input.trim().replace(/[<>\"'&]/g, '').substring(0, 50);
  };

  const sanitizePhone = (input: string) => {
    return input.replace(/\D/g, '').slice(0, 10);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeName(e.target.value);
    setName(sanitized);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhone(e.target.value);
    setPhoneNumber(sanitized);
  };

  const validateInputs = () => {
    if (!name.trim() || name.length < 2) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name (at least 2 characters)",
        variant: "destructive"
      });
      return false;
    }

    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: `Verification code sent to +91${phoneNumber}`,
      });
      setStep('otp');
      setIsLoading(false);
      setOtpAttempts(0);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    if (otpAttempts >= 3) {
      toast({
        title: "Too Many Attempts",
        description: "Please try again after some time",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setOtpAttempts(prev => prev + 1);

    setTimeout(() => {
      try {
        login(phoneNumber, name);
        toast({
          title: "Welcome!",
          description: `Successfully signed in, ${name}!`,
        });
        setIsLoading(false);
        navigate('/');
      } catch (error) {
        toast({
          title: "Login Failed",
          description: "An error occurred during login. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (otpAttempts >= 3) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before requesting another OTP",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "OTP Resent",
      description: `New verification code sent to +91${phoneNumber}`,
    });
    setOtpAttempts(0);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => step === 'otp' ? setStep('phone') : navigate('/')}
            className="mb-4 text-black hover:text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="shadow-xl bg-white border border-gray-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <CardTitle>
              <FancyText variant="gradient" size="lg" className="text-2xl font-bold text-black">
                {step === 'phone' ? 'Sign In' : 'Verify OTP'}
              </FancyText>
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {step === 'phone' 
                ? 'Enter your details to continue' 
                : `Enter the 6-digit code sent to +91${phoneNumber}`
              }
            </p>
          </CardHeader>
          <CardContent>
            {step === 'phone' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={handleNameChange}
                    className="mt-1"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex mt-1">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                      <span className="text-gray-600">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="rounded-l-none"
                      maxLength={10}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOTP}
                  disabled={isLoading || phoneNumber.length !== 10 || !name.trim()}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  size="lg"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value.replace(/\D/g, ''))}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {otpAttempts > 0 && (
                  <p className="text-sm text-amber-600 text-center">
                    Attempts remaining: {3 - otpAttempts}
                  </p>
                )}
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6 || otpAttempts >= 3}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  size="lg"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                </Button>
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={handleResendOTP}
                    className="text-sm"
                    disabled={otpAttempts >= 3}
                  >
                    Didn't receive code? Resend OTP
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
