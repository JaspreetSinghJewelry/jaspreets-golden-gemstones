import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import AdminAccess from '@/components/AdminAccess';

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <InstagramFeed />
      <Footer />
      <AdminAccess />
    </div>
  );
};

export default Index;
