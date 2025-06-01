
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuyingPriceGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Buying & Price Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Purchasing gold jewelry is both a personal and financial investment. Our guide helps you understand the key factors that influence pricing, so you can make informed decisions and get the best value for your money.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">What Influences Gold Jewelry Prices?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Gold Purity (Karatage):</strong> Gold is priced based on its purity — 24K is pure gold, while 22K and 18K are most commonly used for jewelry.</li>
                <li><strong>Weight:</strong> The heavier the piece, the more gold it contains, directly affecting its price.</li>
                <li><strong>Design Complexity:</strong> Intricate designs involve more labor and skill, which can raise the making charges.</li>
                <li><strong>Making Charges:</strong> This includes craftsmanship, design time, and finish — typically charged as a percentage of the gold value or at a fixed rate per gram.</li>
                <li><strong>Taxes:</strong> Prices include applicable GST and hallmark certification fees.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Smart Buying Tips:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Always check the hallmark for purity assurance (e.g., BIS 22K).</li>
                <li>Request a breakdown of gold price and making charges.</li>
                <li>Shop with trusted, certified jewelers like Jaspreet Singh Jewelry for guaranteed quality.</li>
                <li>Consider our Lifetime Exchange Policy for long-term value.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyingPriceGuide;
