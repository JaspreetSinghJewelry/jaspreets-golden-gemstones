
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JewelryCareGuide = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Jewelry Care Guide</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Gold jewelry is timeless — but it needs gentle care to preserve its beauty. Follow these tips to ensure your pieces shine for generations.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Daily Care:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Avoid contact with perfumes, deodorants, and lotions.</li>
                <li>Remove gold jewelry during workouts, swimming, or heavy cleaning.</li>
                <li>After wearing, wipe gently with a soft, lint-free cloth.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Storage:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Store each gold piece separately in soft pouches or fabric-lined boxes.</li>
                <li>Use airtight containers to avoid oxidation.</li>
                <li>Keep away from direct sunlight and humid environments.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Maintenance:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Get your jewelry professionally cleaned and polished once a year.</li>
                <li>Check clasps, settings, and hinges for wear or loosening.</li>
                <li>Re-polish to restore shine if it begins to look dull (especially with 18K gold).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JewelryCareGuide;
