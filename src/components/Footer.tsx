
import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-rose-600 text-white">
      {/* Newsletter Section */}
      <div className="px-6 py-10 text-center border-b border-rose-500">
        <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
        <p className="mb-6">Sign up for exclusive offers and new arrivals</p>
        <div className="flex justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="px-4 py-2 rounded-l-full flex-1 text-gray-800"
          />
          <Button className="bg-white text-rose-600 px-6 py-2 rounded-r-full hover:bg-gray-100">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-bold text-lg">JS</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold">Jaspreet Singh</h4>
                  <p className="text-sm text-rose-200">Jewelry</p>
                </div>
              </div>
              <p className="text-rose-100 mb-6">
                Crafting exquisite jewelry with passion and precision for over three generations.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-rose-100 hover:text-white hover:bg-rose-700"
                  onClick={() => window.open('https://www.facebook.com/jaspreetsinghjewelry/?locale=es_ES', '_blank')}
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-rose-100 hover:text-white hover:bg-rose-700"
                  onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Collections', 'Custom Design', 'Size Guide', 'Care Instructions', 'Certificates'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-rose-100 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-bold mb-6">Categories</h4>
              <ul className="space-y-3">
                {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Lab Grown Diamonds'].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-rose-100 hover:text-white transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Location */}
            <div>
              <h4 className="text-lg font-bold mb-6">Visit Our Store</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-rose-200 mt-1" />
                  <div>
                    <span className="text-rose-100 block mb-2">Karol Bagh, New Delhi</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-rose-200 text-rose-200 hover:bg-rose-200 hover:text-rose-600 text-xs"
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
      <div className="border-t border-rose-500 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-rose-200">
              © 2025 Jaspreet Singh Jewelry. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-rose-200 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-rose-200 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-rose-200 hover:text-white transition-colors">
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
