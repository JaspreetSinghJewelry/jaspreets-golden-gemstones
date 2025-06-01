
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">JS</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black">Jewelry Store</h4>
                  <p className="text-sm text-gray-600">Premium Jewelry</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Crafting exquisite jewelry with passion and precision for over three generations.
              </p>
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
                {[
                  'Buying and Price Guide',
                  'Certification Guide',
                  'Diamond and Solitaire Guide',
                  'Gemstone Guide',
                  'Gifting Guide'
                ].map((guide) => (
                  <li key={guide}>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {guide}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Policies</h4>
              <ul className="space-y-3">
                {[
                  '30-Day Returns Policy',
                  'Lifetime Exchange & Buyback Policy',
                  'Privacy Policy',
                  'Terms & Conditions',
                  'Fraud Warning Disclaimer'
                ].map((policy) => (
                  <li key={policy}>
                    <a href="#" className="text-gray-600 hover:text-black transition-colors">
                      {policy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Location */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-black">Visit Our Store</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <span className="text-gray-600 block mb-2">Karol Bagh, New Delhi</span>
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
              © 2025 Jewelry Store. All rights reserved.
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
