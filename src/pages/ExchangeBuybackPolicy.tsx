
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExchangeBuybackPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Lifetime Exchange & Buyback Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              We believe in lasting relationships. Jaspreet Singh Jewelry offers a Lifetime Exchange and Buyback Policy for your gold jewelry.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Exchange Policy:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Exchange your gold jewelry at any time for another product from our collection.</li>
                <li>The gold value will be calculated at the current prevailing rate, with applicable deductions (e.g., for making charges or damage).</li>
                <li>Diamonds and gemstones will be evaluated and valued separately.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Buyback Policy:</h3>
              <p>If you choose to sell your jewelry back to us, we offer a buyback based on:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Current gold rate (as per purity and weight)</li>
                <li>Deduction of making charges, gemstone, taxes, and wear & tear (if any).</li>
              </ul>
              <p className="mt-2">Buyback value will be transferred via NEFT or store credit upon successful inspection.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold">Note:</p>
              <p>Product must be accompanied by the original invoice and certificate for exchange or buyback to be valid.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExchangeBuybackPolicy;
