
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms & Conditions</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              By using our website or placing an order, you agree to our terms of service.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Terms:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>All jewelry descriptions, prices, and weights are accurate to the best of our knowledge. Minor variances may occur due to handcrafted nature.</li>
                <li>Prices may change based on gold market rates without prior notice.</li>
                <li>Orders may be canceled or delayed due to unforeseen stock or pricing issues (rare, but in such cases, customers will be fully informed).</li>
                <li>Jaspreet Singh Jewelry reserves the right to refuse service, cancel orders, or change policies as needed.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
