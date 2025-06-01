
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              At Jaspreet Singh Jewelry, your privacy is important to us. We are fully committed to safeguarding your personal and financial information.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">What We Collect:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Name, address, contact number, email</li>
                <li>Payment and billing information</li>
                <li>Purchase history and preferences</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">How We Use It:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>To process orders, deliveries, and customer support</li>
                <li>To personalize your shopping experience</li>
                <li>To send order updates, promotions, and offers (only with your consent)</li>
              </ol>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p>
                We do not sell, trade, or rent your information to any third parties. All transactions are processed through secure, encrypted payment gateways.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
