
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiamondSolitaireGuide = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Diamond & Solitaire Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Diamonds set in gold elevate every occasion. Our guide helps you understand what makes a quality diamond and how it pairs beautifully with gold.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">The 4Cs of Diamonds:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Carat</strong> – Measures weight. Higher carat = larger diamond.</li>
                <li><strong>Cut</strong> – The most important factor affecting sparkle.</li>
                <li><strong>Color</strong> – Graded from D (colorless) to Z (light yellow); D–H is ideal.</li>
                <li><strong>Clarity</strong> – Fewer inclusions = more brilliance.</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Diamonds in Gold Jewelry:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>18K gold is commonly used for diamond settings due to its strength and luster.</li>
                <li>Choose white, yellow, or rose gold finishes based on style.</li>
                <li>Every diamond-studded gold piece from Jaspreet Singh Jewelry comes with an IGI or SGL diamond certificate.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiamondSolitaireGuide;
