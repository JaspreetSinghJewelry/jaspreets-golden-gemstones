
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about-us" className="text-gray-600 hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </li>
                {['Certificates'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Categories</h4>
              <ul className="space-y-3">
                {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Lab Grown Diamonds'].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Jewellery Guide */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Jewellery Guide</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/buying-price-guide" className="text-gray-600 hover:text-black transition-colors">
                    Buying and Price Guide
                  </Link>
                </li>
                <li>
                  <Link to="/certification-guide" className="text-gray-600 hover:text-black transition-colors">
                    Certification Guide
                  </Link>
                </li>
                <li>
                  <Link to="/diamond-solitaire-guide" className="text-gray-600 hover:text-black transition-colors">
                    Diamond and Solitaire Guide
                  </Link>
                </li>
                <li>
                  <Link to="/gemstone-guide" className="text-gray-600 hover:text-black transition-colors">
                    Gemstone Guide
                  </Link>
                </li>
                <li>
                  <Link to="/gifting-guide" className="text-gray-600 hover:text-black transition-colors">
                    Gifting Guide
                  </Link>
                </li>
                <li>
                  <Link to="/jewelry-care-guide" className="text-gray-600 hover:text-black transition-colors">
                    Jewelry Care Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/size-Guide" className="text-gray-600 hover:text-black transition-colors">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Policies</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/policies/defective-product" className="text-gray-600 hover:text-black transition-colors">
                    Refund & Replacement Policy
                  </Link>
                </li>
                <li>
                  <Link to="/exchange-buyback-policy" className="text-gray-600 hover:text-black transition-colors">
                    Buyback Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-600 hover:text-black transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/fraud-warning" className="text-gray-600 hover:text-black transition-colors">
                    Fraud Warning Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Visit Our Store */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Visit Our Store</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <span className="text-gray-600 block mb-2">
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
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              © 2025 Jaspreet Singh Jewelry. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-600 hover:text-black transition-colors">
                Terms of Service
              </Link>
              <Link to="/policies/defective-product" className="text-gray-600 hover:text-black transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
