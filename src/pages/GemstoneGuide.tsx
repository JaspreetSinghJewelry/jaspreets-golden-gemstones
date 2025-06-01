
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GemstoneGuide = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Gemstone Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Gemstones add meaning and personality to your gold jewelry. From birthstones to spiritual stones, each one carries unique energy and elegance.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Popular Gemstones in Gold Jewelry:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Ruby:</strong> Symbol of love and passion.</li>
                <li><strong>Emerald:</strong> Represents growth and prosperity.</li>
                <li><strong>Sapphire:</strong> Known for wisdom and royalty.</li>
                <li><strong>Amethyst, Garnet, Citrine:</strong> Popular for their aesthetic and healing properties.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Choosing the Right Gemstone:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Check for clarity, cut, and color intensity.</li>
                <li>Set in 22K or 18K gold to preserve durability and value.</li>
                <li>Always ask for a stone certification when purchasing precious gemstones.</li>
              </ul>
            </div>

            <p>
              At Jaspreet Singh Jewelry, all gemstone gold pieces are made using authentic, natural stones certified by reputable gemological labs.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GemstoneGuide;
