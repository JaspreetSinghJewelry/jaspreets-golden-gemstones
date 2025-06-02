
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Smartphone, Building2, Shield, Info } from 'lucide-react';

interface PaymentOptionsProps {
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
}

const PaymentOptions = ({ selectedPayment, onPaymentChange }: PaymentOptionsProps) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IDBI Bank',
    'Yes Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank'
  ];

  return (
    <Card className="border-2 border-cream-200 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-cream-900 text-cream-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-bold">
          <CreditCard className="h-5 w-5" />
          Choose Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
          {/* Credit/Debit Card */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer font-semibold">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </Label>
            </div>
            {selectedPayment === 'card' && (
              <div className="ml-6 space-y-4 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 mb-4">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Accepted Cards: Visa, Mastercard, RuPay, American Express</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="text-sm font-semibold text-cream-700">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      placeholder="Enter name as on card"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value.toUpperCase()})}
                      className="mt-1 border-cream-300 focus:border-cream-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-semibold text-cream-700">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                      maxLength={19}
                      className="mt-1 border-cream-300 focus:border-cream-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-sm font-semibold text-cream-700">Expiry Date *</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                        maxLength={5}
                        className="mt-1 border-cream-300 focus:border-cream-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-sm font-semibold text-cream-700">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                        maxLength={4}
                        type="password"
                        className="mt-1 border-cream-300 focus:border-cream-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-xs text-cream-600 bg-cream-50 p-3 rounded">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>Your card details are encrypted and secure. We don't store your card information.</span>
                </div>
              </div>
            )}
          </div>

          {/* UPI */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer font-semibold">
                <Smartphone className="h-4 w-4" />
                UPI (Unified Payments Interface)
              </Label>
            </div>
            {selectedPayment === 'upi' && (
              <div className="ml-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-2 text-green-700 mb-4">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Supported: PhonePe, Paytm, Google Pay, BHIM, Amazon Pay</span>
                </div>
                
                <div>
                  <Label htmlFor="upiId" className="text-sm font-semibold text-cream-700">UPI ID *</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm / yourname@phonepe"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                    className="mt-1 border-cream-300 focus:border-cream-500"
                    required
                  />
                </div>
                
                <div className="flex items-start gap-2 text-xs text-cream-600 bg-cream-50 p-3 rounded mt-4">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>Enter your UPI ID to proceed. You'll receive a payment request on your UPI app.</span>
                </div>
              </div>
            )}
          </div>

          {/* Net Banking */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer font-semibold">
                <Building2 className="h-4 w-4" />
                Net Banking
              </Label>
            </div>
            {selectedPayment === 'netbanking' && (
              <div className="ml-6 p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-2 text-orange-700 mb-4">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure banking with 80+ supported banks</span>
                </div>
                
                <div>
                  <Label htmlFor="bank" className="text-sm font-semibold text-cream-700">Select Your Bank *</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank} required>
                    <SelectTrigger className="mt-1 border-cream-300 focus:border-cream-500">
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-start gap-2 text-xs text-cream-600 bg-cream-50 p-3 rounded mt-4">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>You'll be redirected to your bank's secure website to complete the payment. Please keep your login credentials ready.</span>
                </div>
              </div>
            )}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
