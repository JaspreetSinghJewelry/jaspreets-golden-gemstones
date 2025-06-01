
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
            <p>
              We take online security seriously. Jaspreet Singh Jewelry is a legally registered business. Any purchases or communications should be done only through our official website or authorized store.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Beware of:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Third-party websites or social media accounts impersonating our brand</li>
                <li>Unsolicited messages offering discounts or gifts in our name</li>
                <li>Requests for payment on personal numbers or apps</li>
              </ol>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="font-semibold mb-2">Always verify contact and bank details before making payments.</p>
              <p>For security concerns, contact: 📧 i@jaspreetsinghjewelry.com</p>
              <p className="mt-2 text-sm">
                We are not liable for losses caused by unauthorized sellers, impersonators, or phishing attempts.
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
