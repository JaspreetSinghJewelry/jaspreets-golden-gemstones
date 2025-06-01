
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="px-6 py-10 text-center border-b border-gray-200">
        <h4 className="text-xl font-semibold mb-4 text-black">Stay Connected</h4>
        <p className="mb-6 text-gray-600">Sign up for exclusive offers and new arrivals</p>
        <div className="flex justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 rounded-l-full flex-1 text-gray-800 border border-gray-300"
          />
          <Button className="bg-black text-white px-6 py-2 rounded-r-full hover:bg-gray-800">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:text-black hover:bg-gray-100"
                  onClick={() => window.open('https://www.facebook.com/jaspreetsinghjewelry/?locale=es_ES', '_blank')}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:text-black hover:bg-gray-100"
                  onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Collections', 'Custom Design', 'Size Guide', 'Care Instructions', 'Certificates'].map((link) => (
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
                  <Link to="/guides/buying-price" className="text-gray-600 hover:text-black transition-colors">
                    Buying and Price Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/certification" className="text-gray-600 hover:text-black transition-colors">
                    Certification Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/diamond-solitaire" className="text-gray-600 hover:text-black transition-colors">
                    Diamond and Solitaire Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/gemstone" className="text-gray-600 hover:text-black transition-colors">
                    Gemstone Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/gifting" className="text-gray-600 hover:text-black transition-colors">
                    Gifting Guide
                  </Link>
                </li>
                <li>
                  <Link to="/guides/jewelry-care" className="text-gray-600 hover:text-black transition-colors">
                    Jewelry Care Guide
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
                  <Link to="/policies/exchange-buyback" className="text-gray-600 hover:text-black transition-colors">
                    Buyback Policy
                  </Link>
                </li>
                <li>
                  <Link to="/policies/privacy" className="text-gray-600 hover:text-black transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/policies/terms-conditions" className="text-gray-600 hover:text-black transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/policies/fraud-warning" className="text-gray-600 hover:text-black transition-colors">
                    Fraud Warning Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info & Location */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Visit Our Store</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <span className="text-gray-600 block mb-2">103, poonam chambers 2645 bank street karol bagh,New delhi 110005</span>
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
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
