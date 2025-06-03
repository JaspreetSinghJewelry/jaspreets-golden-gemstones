
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: "Rings",
      path: "/rings",
      image: "/lovable-uploads/266b589d-2d61-4c55-8e5e-53c54e18c97f.png",
      description: "Elegant rings for every occasion"
    },
    {
      name: "Necklaces", 
      path: "/necklaces",
      image: "/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png",
      description: "Beautiful necklaces to complement your style"
    },
    {
      name: "Earrings",
      path: "/earrings", 
      image: "/lovable-uploads/266b589d-2d61-4c55-8e5e-53c54e18c97f.png",
      description: "Stunning earrings for any event"
    },
    {
      name: "Bracelets",
      path: "/bracelets",
      image: "/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png", 
      description: "Graceful bracelets to adorn your wrists"
    },
    {
      name: "Lab Grown Diamonds",
      path: "/lab-grown-diamonds",
      image: "/lovable-uploads/266b589d-2d61-4c55-8e5e-53c54e18c97f.png",
      description: "Sustainable and beautiful lab grown diamonds"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Discover our exquisite collection of handcrafted jewelry
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-center opacity-90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
