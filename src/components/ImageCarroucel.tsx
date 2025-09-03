'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
    title: 'Descubre tiendas locales',
    description: 'Encuentra los mejores comercios en tu zona'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    title: 'Productos frescos',
    description: 'De productores locales directo a tu mesa'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    title: 'Apoya el comercio local',
    description: 'Tu compra hace la diferencia en tu comunidad'
  },
];

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section className="relative w-full h-96 overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${image.url})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{image.title}</h2>
                <p className="text-lg md:text-xl opacity-90">{image.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}