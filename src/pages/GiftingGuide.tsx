
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GiftingGuide = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Gifting Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Gold jewelry is the perfect gift — luxurious, personal, and lasting forever. Whether it's for a birthday, engagement, anniversary, or festival, Jaspreet Singh Jewelry helps you make moments memorable.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Gifting by Relationship:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>For Her:</strong> Gold pendants, lightweight bangles, or diamond-studded earrings.</li>
                <li><strong>For Him:</strong> Bold gold rings, classic gold chains, or engraved bracelets.</li>
                <li><strong>For Kids:</strong> Minimal gold bracelets, birthstone lockets.</li>
                <li><strong>For Parents:</strong> Traditional gold necklaces, engraved gold coins.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Special Gifting Features:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Complimentary gift wrapping.</li>
                <li>Custom engraving (names, dates, initials).</li>
                <li>Personalized recommendations through our jewelry concierge.</li>
                <li>Gift cards for special occasions.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p>
                With Jaspreet Singh Jewelry, your gold gift will be as meaningful as the occasion itself.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GiftingGuide;
