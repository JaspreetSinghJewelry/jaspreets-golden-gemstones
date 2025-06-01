
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Collections = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-white py-8 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4 text-gray-800 hover:text-yellow-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-gray-800">
              Special Collections
            </FancyText>
            <p className="text-gray-600 mt-2">Curated collections coming soon...</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
