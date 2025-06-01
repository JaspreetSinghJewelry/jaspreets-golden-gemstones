
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CertificationGuide = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Certification Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Certification is your assurance of purity, quality, and trust. At Jaspreet Singh Jewelry, we provide full transparency with certified documentation for every gold piece.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Gold Jewelry Certification:</h3>
              <p className="mb-3"><strong>BIS Hallmark (India):</strong> Confirms the purity of the gold, such as 22K or 18K, under government standards.</p>
              <p className="mb-2"><strong>Certificate includes:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Karat value (e.g., 22K = 91.6% pure gold)</li>
                <li>BIS Hallmark logo and license number</li>
                <li>Jeweler's identification</li>
                <li>Year of marking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Why Certification Matters:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Verifies you're getting the purity you're paying for.</li>
                <li>Makes resale and exchange easier.</li>
                <li>Ensures legal protection under gold purity standards.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p>
                All gold jewelry at Jaspreet Singh Jewelry is BIS hallmarked and comes with an official certification for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CertificationGuide;
