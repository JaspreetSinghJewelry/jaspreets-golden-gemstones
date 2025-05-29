
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';

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

  return (
    <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#0D0C29] rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-bold">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
          {/* Credit/Debit Card */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </Label>
            </div>
            {selectedPayment === 'card' && (
              <div className="ml-6 space-y-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* UPI */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                UPI
              </Label>
            </div>
            {selectedPayment === 'upi' && (
              <div className="ml-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Label htmlFor="upiId" className="text-sm font-medium">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Net Banking */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                <Building2 className="h-4 w-4" />
                Net Banking
              </Label>
            </div>
            {selectedPayment === 'netbanking' && (
              <div className="ml-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600">
                  You will be redirected to your bank's website to complete the payment
                </p>
              </div>
            )}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
