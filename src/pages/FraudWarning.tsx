
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FraudWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Fraud Warning Disclaimer</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold mb-4 text-red-800">⚠️ Important Fraud Warning</h3>
              <p className="text-red-700">
                Please be aware of fraudulent activities and protect yourself from scams when purchasing jewelry online.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">How to Identify Legitimate Sellers:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Always verify the seller's physical address and contact information</li>
                <li>Look for proper business registration and certifications</li>
                <li>Check for authentic hallmarks and certifications on jewelry</li>
                <li>Read reviews and testimonials from verified customers</li>
                <li>Ensure secure payment gateways and SSL certificates</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Red Flags to Watch Out For:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Unusually low prices for precious metals and stones</li>
                <li>Pressure to make immediate payments</li>
                <li>Requests for payment through untraceable methods</li>
                <li>No return or exchange policy</li>
                <li>Poor quality images or vague product descriptions</li>
                <li>No proper certification or documentation</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold mb-2">At Jaspreet Singh Jewelry:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>All our jewelry comes with proper certification</li>
                <li>We provide detailed product descriptions and authentic images</li>
                <li>Secure payment options with buyer protection</li>
                <li>Clear return and exchange policies</li>
                <li>Verified business address and contact information</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <p>
                If you encounter any suspicious activity or have concerns about authenticity, 
                please contact us immediately at <strong>i@jaspreetsinghjewelry.com</strong> or 
                call <strong>+91-9289061999</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FraudWarning;
