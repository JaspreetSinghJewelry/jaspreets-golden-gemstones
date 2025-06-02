
import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h1>
              <div className="w-24 h-1 bg-rose-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're here to help you with any questions about our jewelry collections, 
                custom designs, or services. Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
                    <a 
                      href="mailto:i@jaspreetsinghjewelry.com" 
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      📧 i@jaspreetsinghjewelry.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
                    <a 
                      href="https://wa.me/919289061999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black transition-colors block mb-1"
                    >
                      📞 +91-9289061999 (WhatsApp)
                    </a>
                    <p className="text-gray-600">
                      LANDLINE: +91-40452999
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-rose-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Our Store</h3>
                    <address className="text-gray-600 not-italic mb-4">
                      103, Poonam chambers 2645 Bank Street,<br />
                      Karol Bagh, New Delhi<br />
                      Pincode- 110005
                    </address>
                    <Button
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-white"
                      onClick={() => window.open('https://www.google.com/maps/place/Jaspreet+Singh+Jewelry/@28.6508732,77.1944579,17z/data=!3m1!4b1!4m6!3m5!1s0x390d0340ec032af1:0x308f4120a3d3baa5!8m2!3d28.6508732!4d77.1944579!16s%2Fg%2F11sy3t7knv?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>

              {/* Store Hours & Additional Info */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Store Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Store Hours</h4>
                    <p className="text-gray-600">
                      Monday - Sunday: 10:00 AM - 7:00 PM<br />
          
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Services</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Custom Jewelry Design</li>
                      <li>• Jewelry Repair & Maintenance</li>
                      <li>• Certification & Appraisal</li>
                      <li>• Consultation Services</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Specialties</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Polki & Jadau Jewelry</li>
                      <li>• Solitaire Diamonds</li>
                      <li>• Natural Diamond Jewelry</li>
                      <li>• Lab Grown Diamonds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
