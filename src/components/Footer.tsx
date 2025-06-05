
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      {/* Main Footer */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">

            {/* Jewellery Guide */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-black">Jewellery Guide</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link to="/buying-price-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Buying and Price Guide
                  </Link>
                </li>
                <li>
                  <Link to="/certification-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Certification Guide
                  </Link>
                </li>
                <li>
                  <Link to="/diamond-solitaire-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Diamond and Solitaire Guide
                  </Link>
                </li>
                <li>
                  <Link to="/gemstone-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Gemstone Guide
                  </Link>
                </li>
                <li>
                  <Link to="/gifting-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Gifting Guide
                  </Link>
                </li>
                <li>
                  <Link to="/jewelry-care-guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Jewelry Care Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/size-Guide" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-black">Policies</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link to="/defective-product-policy" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Refund & Replacement Policy
                  </Link>
                </li>
                <li>
                  <Link to="/exchange-buyback-policy" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Buyback Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/fraud-warning" className="text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                    Fraud Warning Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Visit Our Store */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-black">Visit Our Store</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-600 block mb-2 text-sm md:text-base">
                      103, Poonam chambers 2645 Bank Street,
                      <br />
                      Karol Bagh, New Delhi
                      <br />
                      Pincode- 110005
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black text-xs"
                      onClick={() => window.open('https://www.google.com/maps/place/Jaspreet+Singh+Jewelry/@28.6508732,77.1944579,17z/data=!3m1!4b1!4m6!3m5!1s0x390d0340ec032af1:0x308f4120a3d3baa5!8m2!3d28.6508732!4d77.1944579!16s%2Fg%2F11sy3t7knv?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
              © 2025 Jaspreet Singh Jewelry. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
