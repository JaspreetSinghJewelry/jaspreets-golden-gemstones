
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DefectiveProductPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">7-Day Defective Product Replace Policy</h1>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              At Jaspreet Singh Jewelry, we ensure the highest quality standards in craftsmanship and materials. However, if your product arrives damaged or has a manufacturing defect, you may request a return or exchange within 7 days of receiving the product.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Conditions for Replace:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Replace are only accepted for defective or damaged items.</li>
                <li>You must report the defect within 7 calendar days of delivery.</li>
                <li>Product must be unused, in original condition, and with all tags, certificates, and packaging intact.</li>
                <li>A replace will be accepted only after inspection and approval by our Quality Control team.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Please Note:</h3>
              <ol className="list-decimal list-inside space-y-2" start={5}>
                <li>We do not accept replace for reasons such as change of mind, size issues, or personal preferences.</li>
                <li>Customized, engraved, or made-to-order items are non-replacable unless defective.</li>
              </ol>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold mb-2">To initiate a return, please contact our support team at:</p>
              <p>📧 i@jaspreetsinghjewelry.com | 📞 +91-9289061999</p>
              <p>LANDLINE: +91-40452999</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefectiveProductPolicy;
